// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./interfaces/IMarketRouter.sol";
import "./interfaces/IMarket.sol";

contract L2fiMarketRouter is IMarketRouter, UUPSUpgradeable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IERC1155Upgradeable public optionTokens;
    mapping(address => bool) public whitelistedMarkets;
    mapping(uint256 => address) public optionIdToMarket;

    /// @dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /// @dev Initialize the L2Fi market router contract, using msg.sender as the first owner.
    /// @param _optionTokens ERC1155 option tokens address.
    function initialize(
        address _optionTokens
    ) public initializer {
        __Ownable_init();
        optionTokens = IERC1155Upgradeable(_optionTokens);
    }

    /// @dev Register whitelisted market.
    /// @param _optionId Option token id to trade.
    /// @param _market L2Fi option market pair address.
    function registerMarket(uint256 _optionId, address _market) external onlyOwner {
        whitelistedMarkets[_market] = true;
        optionIdToMarket[_optionId] = _market;
    }

    /// @dev Transfer in erc1155 token
    /// @param _optionTokenId The option token id.
    /// @param _from Approved address.
    /// @param _amount The amount of transfer in.
    function doERC1155TransferIn(uint256 _optionTokenId, address _from, uint256 _amount) external {
        require(msg.sender == optionIdToMarket[_optionTokenId], "Only market");
        optionTokens.safeTransferFrom(_from, msg.sender, _optionTokenId, _amount, '');
    }

    /// @dev Transfer in erc20 token
    /// @param _quoteToken The quote token address.
    /// @param _from Approved address.
    /// @param _amount The amount of transfer in.
    function doERC20TransferIn(address _quoteToken, address _from, uint256 _amount) external {
        require(whitelistedMarkets[msg.sender], "Only market");
        IERC20Upgradeable(_quoteToken).safeTransferFrom(_from, msg.sender, _amount);
    }

    /// @dev Call to the target using the given data.
    /// @param _optionId The option token id to call.
    /// @param _data The data used in the call.
    function execute(uint256 _optionId, bytes calldata _data) external {
        address market = optionIdToMarket[_optionId];
        IMarket(market).setCaller(msg.sender);
        executeInternal(market, _data);
        IMarket(market).settleDebt();
    }

    /// @dev Call batch to the target using the given data array.
    /// @param _optionId The option token id to call.
    /// @param _dataArray The data array used in the call.
    function executeBatch(uint256 _optionId, bytes[] calldata _dataArray) external {
        address market = optionIdToMarket[_optionId];
        IMarket(market).setCaller(msg.sender);
        for (uint256 idx = 0; idx < _dataArray.length; idx ++) {
            executeInternal(market, _dataArray[idx]);
        }
        IMarket(market).settleDebt();
    }

    /// @dev Internal function call to the target using the given data.
    /// @param _target The target contract address to call.
    /// @param _data The data used in the call.
    function executeInternal(address _target, bytes calldata _data) internal {
        (bool ok, bytes memory returndata) = _target.call(_data);
        if (!ok) {
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly
                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert('bad execute call');
            }
        }
    }
}

