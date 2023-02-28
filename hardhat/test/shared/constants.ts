import { BigNumber } from 'ethers'

export const MaxUint128 = BigNumber.from(2).pow(128).sub(1)
export const MaxUint16 = BigNumber.from(2).pow(16).sub(1)
export const ZeroAddress = "0x0000000000000000000000000000000000000000"

export enum TICK_MIN_MAX {
  MIN = -887271,
  MAX = 887271,
}
