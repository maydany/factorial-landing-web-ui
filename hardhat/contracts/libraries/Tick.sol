// SPDX-License-Identifier: UNLICENSED

pragma solidity >= 0.8.0;

library Tick {
    function getOrderId(uint16 tick, uint64 idx) internal pure returns (uint orderId) {
        orderId = (uint(tick) << 240) + idx;
    }
}