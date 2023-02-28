// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

import "./BitMath.sol";

library TickBitmap {
    using BitMath for uint;

    // Constant
    uint8 private constant MIN_BIT_MAP_ID = 0;
    uint8 private constant MAX_BIT_MAP_ID = 255;

    function tickToIdx(uint16 tick) internal pure returns (uint8 bitMapIdx, uint8 bitIdx) {
        bitMapIdx = uint8(tick >> 8);
        bitIdx = uint8(tick % 256);
    }

    function idxToTick(uint8 bitMapIdx, uint8 bitIdx) internal pure returns (uint16 tick) {
        tick = (uint16(bitMapIdx) << 8) + bitIdx;
    }

    function openTick(mapping(uint8 => uint256) storage self, uint16 tick) internal {
        (uint8 bitMapIdx, uint8 bitIdx) = tickToIdx(tick);
        uint256 mask = 1 << bitIdx;
        self[bitMapIdx] |= mask;
    }

    function closeTick(mapping(uint8 => uint256) storage self, uint16 tick) internal {
        (uint8 bitMapIdx, uint8 bitIdx) = tickToIdx(tick);

        uint256 mask = 1 << bitIdx;
        uint256 diff = self[bitMapIdx] & mask;
        self[bitMapIdx] -= diff;
    }

    function findNextBuyTick(
        mapping(uint8 => uint) storage self,
        uint16 currentTick
    ) internal view returns (uint16 nextTick){
        (uint8 bitMapIdx, uint8 bitIdx) = tickToIdx(currentTick);
        uint mask = (1 << uint(bitIdx)) - 1;
        uint masked;
        while (true) {
            masked = self[bitMapIdx] & mask;
            if (masked == 0) {
                if (bitMapIdx == 0) {
                    return 0;
                }
                mask = type(uint).max;
                bitMapIdx = bitMapIdx - 1;
            } else {
                break;
            }
        }
        uint8 nextBitIdx = BitMath.mostSignificantBit(masked);
        nextTick = idxToTick(bitMapIdx, nextBitIdx);
    }

    function findNextSellTick(
        mapping(uint8 => uint) storage self,
        uint16 currentTick
    ) internal view returns (uint16 nextTick){
        (uint8 bitMapIdx, uint8 bitIdx) = tickToIdx(currentTick);
        uint mask = ~((1 << uint(bitIdx)) - 1 + (1 << uint(bitIdx)));
        uint masked;
        while (true) {
            masked = self[bitMapIdx] & mask;
            if (masked == 0) {
                if (bitMapIdx >= MAX_BIT_MAP_ID) {
                    return type(uint16).max;
                }
                mask = type(uint).max;
                bitMapIdx = bitMapIdx + 1;
            } else {
                break;
            }
        }
        uint8 nextBitIdx = BitMath.leastSignificantBit(masked);
        nextTick = idxToTick(bitMapIdx, nextBitIdx);
    }
}
