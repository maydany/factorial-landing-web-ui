// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

import "../interfaces/ITIckPriceModel.sol";

/// tick range 0.1% ~ 1%
contract SingleTickPriceModel is ITickPriceModel {
    uint16 public tickDegree;

    constructor(uint16 _tickDegree) {
        tickDegree = _tickDegree;
    }

    function tickToPrice(uint16 tick) external view override returns (uint256 price){
        if (tick <= tickDegree) {
            return tick;
        }
        uint256 l = ((tick - tickDegree) / (9 * tickDegree));
        return ((10 ** (l + 2))) + (((tick - tickDegree) % (9 * tickDegree)) * (10 ** l));
    }

    function priceToTick(uint256 price) external view override returns (uint16, uint16){
        if (price <= 1e3) {
            return (uint16(price), uint16(price));
        }

        uint16 lowerTick = 0;
        if (price > 1e19) {
            price /= 1e17;
            lowerTick += 9 * tickDegree * 17;
        }

        if (price > 1e11) {
            price /= 1e9;
            lowerTick += 9 * tickDegree * 9;
        }

        if (price > 1e7) {
            price /= 1e5;
            lowerTick += 9 * tickDegree * 5;
        }

        if (price > 1e5) {
            price /= 1e3;
            lowerTick += 9 * tickDegree * 3;
        }

        if (price > 1e4) {
            price /= 1e2;
            lowerTick += 9 * tickDegree * 2;
        }

        if (price > 1e3) {
            price /= 10;
            lowerTick += 9 * tickDegree;
        }

        lowerTick += uint16(price);
        if (lowerTick == type(uint16).max) {
            return (lowerTick, lowerTick);
        }
        return (lowerTick, lowerTick + 1);
    }
}