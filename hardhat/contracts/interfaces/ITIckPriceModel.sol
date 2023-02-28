// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface ITickPriceModel {
    function tickToPrice(uint16 tick) external view returns (uint price);
    function priceToTick(uint price) external view returns (uint16, uint16);
}