// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface IMarket {
    /// Place order parameter
    struct OrderParam {
        uint256 optionAmount;
        uint16 tick;
        bool isBuy;
    }

    /// @dev Emitted when order is placed in orderbook.
    /// @param orderId The ID of new order
    /// @param owner The owner of new order
    /// @param optionAmount The option amount of new order
    /// @param isBuy The flag whether the order is buy.
    event MakeOrder(uint256 indexed orderId, address owner, uint256 optionAmount, bool isBuy);

    /// @dev Emitted when order is matched with maker order.
    /// @param makerOrderId The ID of maker order
    /// @param taker The owner of new order
    /// @param optionAmount Traded option amount
    event MatchOrder(uint256 indexed makerOrderId, address taker, uint256 optionAmount);

    /// @dev Emitted when order is removed in orderbook.
    /// @param orderId The ID of cancelled order
    event CancelOrder(uint256 indexed orderId);

    /// @dev Emitted when order is placed in orderbook.
    /// @param fromOrderId The from order ID of shortcut
    /// @param toOrderId The to order ID of shortcut
    event OpenShortcut(uint256 fromOrderId, uint256 toOrderId);

    /// @dev Set the caller of this tx
    /// @param _caller The caller address from router
    function setCaller(address _caller) external;

    /// @dev Settle debt of caller
    function settleDebt() external;

    /// @dev placeBuyOrder new order for trade and bid.
    /// @param _orderParam New buy order include tick & amount.
    function placeBuyOrder(OrderParam memory _orderParam) external;

    /// @dev placeSellOrder new order for trade and ask.
    /// @param _orderParam New sell order include tick & amount.
    function placeSellOrder(OrderParam memory _orderParam) external;

    /// @dev Cancel order and subtract amount from tick.
    /// @param _orderId Target index of order to cancel.
    function cancelOrder(uint256 _orderId) external;
}
