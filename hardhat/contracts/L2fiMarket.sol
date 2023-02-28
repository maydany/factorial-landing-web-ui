// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol";

import "./libraries/Tick.sol";
import "./libraries/TickBitmap.sol";
import "./libraries/SafeCastInt256.sol";
import "./libraries/SafeCastUint256.sol";

import "./interfaces/IFeeCollectorCallback.sol";
import "./interfaces/IFeeCollector.sol";
import "./interfaces/ITIckPriceModel.sol";
import "./interfaces/IMarketRouter.sol";
import "./interfaces/IMarket.sol";

contract L2fiMarket is IMarket, IFeeCollectorCallback, OwnableUpgradeable, UUPSUpgradeable, ERC1155HolderUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeCastUint256 for uint256;
    using SafeCastInt256 for int256;
    using MathUpgradeable for uint256;

    using TickBitmap for mapping(uint8 => uint256);
    using Tick for uint16;

    // 10000 => 1%
    uint256 public constant FEE_ONE_PERCENT_PRECISION = 10000;

    struct Order {
        address owner;
        uint96 downsizedOptionAmount;
    }

    struct TickInfo {
        uint64 first;
        uint64 last;
        uint96 totalDownsizedOptionAmount;
    }

    struct VariableSlot {
        /// Order caller to router. This value is set by the router.
        address caller;
        /// Maximum tick of buy orders / Minimum tick of sell orders.
        uint16 maxBuyTick;
        uint16 minSellTick;
        /// Amount to be settled at the end of the operation. If positive, the user gets paid.
        int256 optionTokenDebt;
        int256 quoteTokenDebt;
        uint256 feePayable;
    }

    /// ----- INIT STATES -----
    uint256 public optionTokenId;
    IERC1155Upgradeable public optionTokens;
    IERC20Upgradeable public quoteToken;
    ITickPriceModel public tickPriceModel;
    address public router;
    address public feeCollector;
    /// Downsizing scale to reduce order struct bit size.
    uint256 public downsizingScale;

    /// ----- SETTING STATES -----
    int256 public makerFee;
    int256 public takerFee;
    uint256 public openTime;
    uint256 public closeTime;
    uint256 public minimumOrderAmount;

    /// ----- VARIABLE STATES -----
    VariableSlot public slot;
    mapping(uint8 => uint256) public tickBitMaps;
    mapping(uint16 => TickInfo) public tickInfos;
    mapping(uint256 => Order) public orders;
    /// For skip cancelled orders;
    mapping(uint256 => uint256) public nextOrderIds;

    /// @dev Throws if called by not router.
    modifier onlyRouter() {
        require(msg.sender == router);
        _;
    }

    /// @dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /// @dev Initialize the orderbook contract, using msg.sender as the first governor.
    /// @param _optionTokens The ERC1155 option address.
    /// @param _optionTokenId The ERC1155 option token id.
    /// @param _quoteToken The ERC20 quote token.
    /// @param _router The router of l2fi market.
    /// @param _feeCollector The fee collector of l2fi market.
    /// @param _tickPriceModel The tick price model for calculation.
    /// @param _downsizingScale The downsized scale for storage.
    function initialize(
        address _optionTokens,
        uint256 _optionTokenId,
        address _quoteToken,
        address _router,
        address _feeCollector,
        address _tickPriceModel,
        uint256 _downsizingScale,
        uint256 _openTime,
        uint256 _closeTime,
        uint256 _minimumOrderAmount
    ) public initializer {
        __Ownable_init();
        optionTokens = IERC1155Upgradeable(_optionTokens);
        optionTokenId = _optionTokenId;
        quoteToken = IERC20Upgradeable(_quoteToken);
        router = _router;
        feeCollector = _feeCollector;
        tickPriceModel = ITickPriceModel(_tickPriceModel);
        downsizingScale = _downsizingScale;
        openTime = _openTime;
        closeTime = _closeTime;
        minimumOrderAmount = _minimumOrderAmount;
        slot.maxBuyTick = 0;
        slot.minSellTick = type(uint16).max;
    }

    /// ----- OWNER FUNCTIONS -----
    /// @dev Set maker fee.
    /// @param _makerFee The maker fee
    function setMakerFee(int256 _makerFee) external onlyOwner {
        require(
            _makerFee <= (FEE_ONE_PERCENT_PRECISION * 100).toInt256() &&
            _makerFee * (- 1) <= (FEE_ONE_PERCENT_PRECISION * 100).toInt256(),
            'Over 100%'
        );
        require(openTime > block.timestamp || closeTime < block.timestamp, 'Opened market');
        require(_makerFee + takerFee >= 0, 'No deficit');
        makerFee = _makerFee;
    }

    /// @dev Set taker fee.
    /// @param _takerFee The taker fee
    function setTakerFee(int256 _takerFee) external onlyOwner {
        require(
            _takerFee <= (FEE_ONE_PERCENT_PRECISION * 100).toInt256() &&
            _takerFee * (- 1) <= (FEE_ONE_PERCENT_PRECISION * 100).toInt256(),
            'Over 100%'
        );
        require(openTime > block.timestamp || closeTime < block.timestamp, 'Opened market');
        require(makerFee + _takerFee >= 0, 'No deficit');
        takerFee = _takerFee;
    }

    /// @dev Set open time.
    /// @param _openTime The market open time
    function setOpenTime(uint256 _openTime) external onlyOwner {
        openTime = _openTime;
    }

    /// @dev Set close time.
    /// @param _closeTime The market close time
    function setCloseTime(uint256 _closeTime) external onlyOwner {
        closeTime = _closeTime;
    }

    /// @dev Set minimum Order Amount
    /// @param _minimumOrderAmount Minimum amount of option
    function setMinimumOrderAmount(uint256 _minimumOrderAmount) external onlyOwner {
        minimumOrderAmount = _minimumOrderAmount;
    }

    /// ----- CALLBACK FUNCTIONS -----
    /// @dev In the implementation you must pay the fee tokens
    /// @param _amount The amount of token to be transferred
    function feeCallback(uint256 _amount) external {
        require(msg.sender == address(feeCollector), 'Only FC');
        doERC20TransferOut(msg.sender, _amount);
    }

    /// ----- ROUTER CALL FUNCTIONS -----
    /// @dev Set the caller of this tx
    /// @param _caller The caller address from router
    function setCaller(address _caller) external onlyRouter {
        require(slot.caller == address(0), 'Reentrancy lock');
        slot.caller = _caller;
    }

    /// @dev Settle debt of caller
    function settleDebt() external onlyRouter {
        // 0. Settle fee payable
        {
            if (slot.feePayable > 0) {
                IFeeCollector(feeCollector).depositFee(slot.caller, slot.feePayable);
                slot.feePayable = 0;
            }
        }
        // 1. Settle option token
        {
            if (slot.optionTokenDebt >= 0) {
                doERC1155TransferOut(slot.caller, slot.optionTokenDebt.toUint256());
            } else {
                IMarketRouter(router).doERC1155TransferIn(
                    optionTokenId,
                    slot.caller,
                    (slot.optionTokenDebt * (- 1)).toUint256()
                );
            }
            slot.optionTokenDebt = 0;
        }

        // 2. Settle quote token
        {
            if (slot.quoteTokenDebt >= 0) {
                doERC20TransferOut(slot.caller, slot.quoteTokenDebt.toUint256());
            } else {
                IMarketRouter(router).doERC20TransferIn(
                    address(quoteToken),
                    slot.caller,
                    (slot.quoteTokenDebt * (- 1)).toUint256()
                );
            }
            slot.quoteTokenDebt = 0;
        }

        // 2. Reset caller
        {
            slot.caller = address(0);
        }
    }

    /// @dev placeBuyOrder new order for trade and bid.
    /// @param _orderParam New buy order include tick & amount.
    function placeBuyOrder(OrderParam memory _orderParam) external onlyRouter {
        // 0. Validate params & states
        {
            require(_orderParam.isBuy == true, 'Not buy order');
            require(_orderParam.optionAmount >= minimumOrderAmount, 'Under minimum amount');
            require(openTime <= block.timestamp && closeTime > block.timestamp, 'Closed market');
        }

        // 1. If quote token balance is insufficient, take token first.
        {
            uint256 maximumQuoteAmountRequired = calculateQuoteTokenAmountWithFee(
                _orderParam.optionAmount,
                _orderParam.tick,
                takerFee
            );
            if (quoteToken.balanceOf(address(this)) < maximumQuoteAmountRequired) {
                IMarketRouter(router).doERC20TransferIn(address(quoteToken), slot.caller, maximumQuoteAmountRequired);
                slot.quoteTokenDebt += maximumQuoteAmountRequired.toInt256();
            }
        }

        // 2. Take orders
        {
            while (_orderParam.tick >= slot.minSellTick && _orderParam.optionAmount > 0) {
                uint256 makerOrderId = slot.minSellTick.getOrderId(tickInfos[slot.minSellTick].first);
                matchOrder(_orderParam, makerOrderId);
            }
        }

        // 3. Make order
        {
            if (_orderParam.optionAmount > 0) {
                makeOrder(_orderParam);
            }
        }
    }

    /// @dev placeSellOrder new order for trade and ask.
    /// @param _orderParam New sell order include tick & amount.
    function placeSellOrder(OrderParam memory _orderParam) external onlyRouter {
        // 0. Validate params & states
        {
            require(_orderParam.isBuy == false, 'Not sell order');
            require(_orderParam.optionAmount >= minimumOrderAmount, 'Under minimum amount');
            require(openTime <= block.timestamp && closeTime > block.timestamp, 'Closed market');
        }


        // 1. If option token balance is insufficient, take token first.
        {
            if (optionTokens.balanceOf(address(this), optionTokenId) < _orderParam.optionAmount) {
                IMarketRouter(router).doERC1155TransferIn(optionTokenId, slot.caller, _orderParam.optionAmount);
                slot.optionTokenDebt += _orderParam.optionAmount.toInt256();
            }
        }

        // 2.Take orders
        {
            while (_orderParam.tick <= slot.maxBuyTick && _orderParam.optionAmount > 0) {
                uint256 makerOrderId = slot.maxBuyTick.getOrderId(tickInfos[slot.maxBuyTick].first);
                matchOrder(_orderParam, makerOrderId);
            }
        }

        // 3. Make order
        {
            if (_orderParam.optionAmount > 0) {
                makeOrder(_orderParam);
            }
        }
    }

    /// @dev Cancel order and subtract amount from tick.
    /// @param _orderId Target index of order to cancel.
    function cancelOrder(uint256 _orderId) external onlyRouter {
        // 0. Declare local variable using in function
        Order memory targetOrder = orders[_orderId];
        uint16 tick = uint16(_orderId >> 240);
        uint256 orderAmount = uint256(targetOrder.downsizedOptionAmount) * downsizingScale;

        // 1. Validate parameters & states
        {
            require(openTime <= block.timestamp, 'Not opened market');
            require(targetOrder.owner == slot.caller, 'Not owner');
            require(orderAmount > 0, 'Invalid order');
        }

        // 2. Take token to debt.
        {
            if (tick >= slot.minSellTick) {
                slot.optionTokenDebt += orderAmount.toInt256();
            } else if (tick <= slot.maxBuyTick) {
                slot.quoteTokenDebt += calculateQuoteTokenAmountWithFee(orderAmount, tick, makerFee).toInt256();
            } else {
                revert('Invalid order');
            }
        }

        // 3. Store tick states & close tick if necessary
        {
            TickInfo storage curTickInfo = tickInfos[tick];
            curTickInfo.totalDownsizedOptionAmount -= targetOrder.downsizedOptionAmount;

            // Close tick if zero amount
            if (curTickInfo.totalDownsizedOptionAmount == 0) {
                tickBitMaps.closeTick(tick);
                curTickInfo.first = curTickInfo.last;
                if (tick == slot.maxBuyTick) {
                    slot.maxBuyTick = tickBitMaps.findNextBuyTick(tick);
                } else if (tick == slot.minSellTick) {
                    slot.minSellTick = tickBitMaps.findNextSellTick(tick);
                }
            }
        }

        // 4. Delete order state
        delete orders[_orderId];

        // 4. Emit event
        {
            emit CancelOrder(_orderId);
        }
    }

    /// ----- PUBLIC FUNCTIONS -----
    /// @dev openShortcut orders for skip cancelled orders
    function openShortcut(uint256 _fromOrderId, uint256 _toOrderId) external {
        // 0. Declare local variable using in function
        uint16 tick = uint16(_fromOrderId >> 240);
        uint256 orderId = _fromOrderId;

        // 1. Validate parameters & states
        {
            require(tick == uint16(_toOrderId >> 240), 'Not same tick orders');
            require(_fromOrderId < _toOrderId, 'To is upper than from');
            require(nextOrderIds[_fromOrderId] < _toOrderId, 'To is upper than original');
            require(tick.getOrderId(tickInfos[tick].first) <= _fromOrderId &&
                tick.getOrderId(tickInfos[tick].last) > _toOrderId, 'Invalid order id');
        }

        // 2. Iterate fromOrderId to toOrderId.
        {
            while (orderId < _toOrderId) {
                if (nextOrderIds[orderId] != 0) {
                    orderId = nextOrderIds[orderId];
                } else if (orders[orderId].downsizedOptionAmount != 0) {
                    revert('Uncancelled order');
                } else {
                    orderId ++;
                }
            }
        }

        // 3. Store state
        {
            nextOrderIds[_fromOrderId] = orderId;
        }

        // 4. Emit event
        {
            emit OpenShortcut(_fromOrderId, orderId);
        }
    }

    /// ----- INTERNAL FUNCTIONS -----
    /// @dev Make new order and add amount to tick.
    /// @param _orderParam New order include tick & amount.
    function makeOrder(OrderParam memory _orderParam) internal {
        // 0. Declare local variable using in function
        TickInfo storage tickInfo = tickInfos[_orderParam.tick];
        uint256 orderId = _orderParam.tick.getOrderId(tickInfo.last);

        // 1. Store order states
        {
            Order storage targetOrder = orders[orderId];
            targetOrder.owner = slot.caller;
            targetOrder.downsizedOptionAmount = (_orderParam.optionAmount / downsizingScale).toUint96();
        }

        // 2. Apply debt
        {
            if (_orderParam.isBuy) {
                uint256 quoteAmount = calculateQuoteTokenAmountWithFee(_orderParam.optionAmount, _orderParam.tick, makerFee);
                slot.quoteTokenDebt -= quoteAmount.toInt256();
            } else {
                slot.optionTokenDebt -= _orderParam.optionAmount.toInt256();
            }
        }

        // 3. Store tick states
        {
            // Open tick if original amount zero
            if (tickInfo.totalDownsizedOptionAmount == 0) {
                tickBitMaps.openTick(_orderParam.tick);
                if (_orderParam.isBuy && _orderParam.tick > slot.maxBuyTick) {
                    slot.maxBuyTick = _orderParam.tick;
                } else if (!_orderParam.isBuy && _orderParam.tick < slot.minSellTick) {
                    slot.minSellTick = _orderParam.tick;
                }
            }
            tickInfo.totalDownsizedOptionAmount += (_orderParam.optionAmount / downsizingScale).toUint96();
            tickInfo.last ++;
        }

        // 4. Emit event
        {
            emit MakeOrder(orderId, slot.caller, _orderParam.optionAmount, _orderParam.isBuy);
        }
    }

    /// @dev Trade matched orders.
    /// @param _takerOrder The taker order parameter
    /// @param _makerOrderId The making order id.
    function matchOrder(OrderParam memory _takerOrder, uint256 _makerOrderId) internal {
        // 0. Declare local variable using in function
        uint16 currentTick = uint16(_makerOrderId >> 240);
        Order memory makerOrder = orders[_makerOrderId];
        TickInfo storage curTickInfo = tickInfos[currentTick];
        uint256 makerOrderAmount = uint256(makerOrder.downsizedOptionAmount) * downsizingScale;
        uint256 tradedAmount;

        // 1. Skip cancelled orders
        if (makerOrderAmount == 0) {
            if (nextOrderIds[_makerOrderId] == 0) {
                curTickInfo.first ++;
            } else {
                curTickInfo.first += (nextOrderIds[_makerOrderId] - _makerOrderId).toUint64();
            }
            return;
        }

        // 2. Trade & store tick/order states
        {
            if (makerOrderAmount > _takerOrder.optionAmount) {
                tradedAmount = _takerOrder.optionAmount;
                orders[_makerOrderId].downsizedOptionAmount -= (tradedAmount / downsizingScale).toUint96();
            } else {
                tradedAmount = makerOrderAmount;
                curTickInfo.first ++;
                delete orders[_makerOrderId];
            }
            _takerOrder.optionAmount -= tradedAmount;
            curTickInfo.totalDownsizedOptionAmount -= (tradedAmount / downsizingScale).toUint96();
        }

        // 3. Transfer token in debt.
        {
            if (_takerOrder.isBuy) {
                slot.optionTokenDebt += tradedAmount.toInt256();
                slot.quoteTokenDebt -= calculateQuoteTokenAmountWithFee(tradedAmount, currentTick, takerFee).toInt256();
                doERC20TransferOut(
                    makerOrder.owner,
                    calculateQuoteTokenAmountWithFee(tradedAmount, currentTick, makerFee * (- 1))
                );
            } else {
                slot.optionTokenDebt -= tradedAmount.toInt256();
                slot.quoteTokenDebt += calculateQuoteTokenAmountWithFee(
                    tradedAmount,
                    currentTick,
                    takerFee * (- 1)
                ).toInt256();
                doERC1155TransferOut(makerOrder.owner, tradedAmount);
            }
            slot.feePayable += calculateQuoteTokenAmountWithFee(tradedAmount, currentTick, 0)
            .mulDiv(
                (makerFee + takerFee).toUint256(),
                (100 * FEE_ONE_PERCENT_PRECISION)
            );
        }

        // 4. Close tick if necessary
        {
            if (curTickInfo.totalDownsizedOptionAmount == 0) {
                tickBitMaps.closeTick(currentTick);
                curTickInfo.first = curTickInfo.last;
                if (_takerOrder.isBuy) {
                    slot.minSellTick = tickBitMaps.findNextSellTick(slot.minSellTick);
                } else {
                    slot.maxBuyTick = tickBitMaps.findNextBuyTick(slot.maxBuyTick);
                }
            }
        }

        // 4. Emit event
        {
            emit MatchOrder(_makerOrderId, slot.caller, tradedAmount);
        }
    }

    /// @dev Calculate quote token amount with fee.
    /// @param _optionTokenAmount The option token amount.
    /// @param _tick tick to calculate price
    /// @param _fee fee
    function calculateQuoteTokenAmountWithFee(
        uint256 _optionTokenAmount,
        uint16 _tick,
        int256 _fee
    ) internal view returns (uint256) {
        uint256 quoteTokenAmount = _optionTokenAmount
        .mulDiv(tickPriceModel.tickToPrice(_tick), (10 ** 18))
        .mulDiv(((100 * FEE_ONE_PERCENT_PRECISION).toInt256() + _fee).toUint256(), (100 * FEE_ONE_PERCENT_PRECISION));
        return quoteTokenAmount;
    }

    /// @dev Transfer out erc1155 token
    /// @param _to The receiver address.
    /// @param _amount The amount of transfer out
    function doERC1155TransferOut(address _to, uint256 _amount) internal {
        if (_amount == 0) return;
        optionTokens.safeTransferFrom(address(this), _to, optionTokenId, _amount, '');
    }

    /// @dev Transfer out erc20 token
    /// @param _to The receiver address.
    /// @param _amount The amount of transfer out
    function doERC20TransferOut(address _to, uint256 _amount) internal {
        if (_amount == 0) return;
        quoteToken.safeTransfer(_to, _amount);
    }

    /// ----- VIEW FUNCTIONS -----
    struct TickView {
        uint16 tick;
        uint256 amount;
    }

    /// @dev Get order-book view
    function getOrderbook(
        uint256 maxCount
    ) external view returns (TickView[] memory buyTicks, TickView[] memory sellTicks){
        // 0. Declare return values
        buyTicks = new TickView[](maxCount);
        sellTicks = new TickView[](maxCount);

        // 1. Declare local variable using in function
        uint16 curBuyTick = slot.maxBuyTick;
        uint16 curSellTick = slot.minSellTick;

        // 2. Iterate valid buy/sell ticks to fill
        {
            for (uint256 i = 0; i < maxCount; i++) {
                if (i != 0) {
                    curBuyTick = tickBitMaps.findNextBuyTick(curBuyTick);
                }
                if (curBuyTick == 0) {
                    break;
                }
                buyTicks[i] = TickView(
                    curBuyTick,
                    uint256(tickInfos[curBuyTick].totalDownsizedOptionAmount) * downsizingScale
                );
            }

            for (uint256 i = 0; i < maxCount; i++) {
                if (i != 0) {
                    curSellTick = tickBitMaps.findNextSellTick(curSellTick);
                }
                if (curSellTick == type(uint16).max) {
                    break;
                }
                sellTicks[i] = TickView(
                    curSellTick,
                    uint256(tickInfos[curSellTick].totalDownsizedOptionAmount) * downsizingScale
                );
            }
        }

        return (buyTicks, sellTicks);
    }
}