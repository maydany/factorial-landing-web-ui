// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "../interfaces/ITIckPriceModel.sol";

contract DoublePointTickPriceModel is ITickPriceModel {
    uint16 public tickDegree;
    uint256 public initialTickSqaure;

    constructor(uint16 _tickDegree, uint256 _initialPower) {
        tickDegree = _tickDegree;
        initialTickSqaure = _initialPower;
    }

    /// tick range 0.02% ~ 0.1%
    function tickToPrice(uint16 tick) external view override returns (uint256){
        if (tick <= 5 * tickDegree) {
            return tick * (10 ** initialTickSqaure);
        }
        if (tick <= 6 * tickDegree) {
            return (5 * tickDegree + (5 * (tick - (5 * tickDegree)))) * (10 ** initialTickSqaure);
        }
        uint256 square = ((tick - tickDegree) / (5 * tickDegree)) + initialTickSqaure;
        tick = (tick - tickDegree) % (5 * tickDegree);
        if (tick <= 4 * tickDegree) {
            return (10 ** (square + 3)) + tick * (10 ** square);
        }
        return (10 ** (square + 3)) + (4 * tickDegree + (5 * (tick - (4 * tickDegree)))) * (10 ** square);
    }

    function priceToTick(uint price) external view override returns (uint16, uint16){
        price /= (10 ** initialTickSqaure);
        if (price <= 5 * tickDegree) {
            return (uint16(price), uint16(price));
        }

        if (price <= 10 * tickDegree) {
            price -= 5 * tickDegree;
            price /= 5;
            return (uint16(5 * tickDegree + price), uint16(5 * tickDegree + price));
        }

        uint16 lowerTick = 0;
        if (price > 1e11) {
            price /= 1e8;
            lowerTick += 5 * tickDegree * 8;
        }

        if (price > 1e7) {
            price /= 1e4;
            lowerTick += 5 * tickDegree * 4;
        }

        if (price > 1e5) {
            price /= 1e2;
            lowerTick += 5 * tickDegree * 2;
        }

        if (price > 1e4) {
            price /= 1e1;
            lowerTick += 5 * tickDegree;
        }

        if (price <= 5 * tickDegree) {
            lowerTick += uint16(price);
        } else if (price <= 10 * tickDegree) {
            price -= 5 * tickDegree;
            price /= 5;
            lowerTick += uint16(5 * tickDegree + price);
        }
        if (lowerTick == type(uint16).max) {
            return (lowerTick, lowerTick);
        }
        return (lowerTick, lowerTick + 1);
    }
}