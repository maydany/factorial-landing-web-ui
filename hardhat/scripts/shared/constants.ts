import { BigNumber } from 'ethers'

export const MaxUint128 = BigNumber.from(2).pow(128).sub(1)

export enum TICK_MIN_MAX {
  MIN = -887271,
  MAX = 887271,
}
