/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface DoublePointTickPriceModelInterface extends ethers.utils.Interface {
  functions: {
    "initialTickSqaure()": FunctionFragment;
    "priceToTick(uint256)": FunctionFragment;
    "tickDegree()": FunctionFragment;
    "tickToPrice(uint16)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "initialTickSqaure",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceToTick",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tickDegree",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tickToPrice",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "initialTickSqaure",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceToTick",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tickDegree", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tickToPrice",
    data: BytesLike
  ): Result;

  events: {};
}

export class DoublePointTickPriceModel extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: DoublePointTickPriceModelInterface;

  functions: {
    initialTickSqaure(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "initialTickSqaure()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    priceToTick(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
      1: number;
    }>;

    "priceToTick(uint256)"(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
      1: number;
    }>;

    tickDegree(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    "tickDegree()"(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    tickToPrice(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "tickToPrice(uint16)"(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;
  };

  initialTickSqaure(overrides?: CallOverrides): Promise<BigNumber>;

  "initialTickSqaure()"(overrides?: CallOverrides): Promise<BigNumber>;

  priceToTick(
    price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    0: number;
    1: number;
  }>;

  "priceToTick(uint256)"(
    price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    0: number;
    1: number;
  }>;

  tickDegree(overrides?: CallOverrides): Promise<number>;

  "tickDegree()"(overrides?: CallOverrides): Promise<number>;

  tickToPrice(
    tick: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "tickToPrice(uint16)"(
    tick: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    initialTickSqaure(overrides?: CallOverrides): Promise<BigNumber>;

    "initialTickSqaure()"(overrides?: CallOverrides): Promise<BigNumber>;

    priceToTick(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
      1: number;
    }>;

    "priceToTick(uint256)"(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
      1: number;
    }>;

    tickDegree(overrides?: CallOverrides): Promise<number>;

    "tickDegree()"(overrides?: CallOverrides): Promise<number>;

    tickToPrice(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tickToPrice(uint16)"(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    initialTickSqaure(overrides?: CallOverrides): Promise<BigNumber>;

    "initialTickSqaure()"(overrides?: CallOverrides): Promise<BigNumber>;

    priceToTick(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "priceToTick(uint256)"(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tickDegree(overrides?: CallOverrides): Promise<BigNumber>;

    "tickDegree()"(overrides?: CallOverrides): Promise<BigNumber>;

    tickToPrice(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tickToPrice(uint16)"(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialTickSqaure(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "initialTickSqaure()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceToTick(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "priceToTick(uint256)"(
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tickDegree(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tickDegree()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tickToPrice(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tickToPrice(uint16)"(
      tick: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
