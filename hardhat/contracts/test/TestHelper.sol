// SPDX-License-Identifier: UNLICENSED

pragma solidity >= 0.8.0;

import '../libraries/Tick.sol';

contract TestHelper {
    function getOrderId(uint16 tick, uint64 idx) external pure returns (uint256) {
        return Tick.getOrderId(tick, idx);
    }
}