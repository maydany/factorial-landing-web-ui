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
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IMarketInterface extends ethers.utils.Interface {
  functions: {
    "cancelOrder(uint256)": FunctionFragment;
    "placeBuyOrder(tuple)": FunctionFragment;
    "placeSellOrder(tuple)": FunctionFragment;
    "setCaller(address)": FunctionFragment;
    "settleDebt()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBuyOrder",
    values: [{ optionAmount: BigNumberish; tick: BigNumberish; isBuy: boolean }]
  ): string;
  encodeFunctionData(
    functionFragment: "placeSellOrder",
    values: [{ optionAmount: BigNumberish; tick: BigNumberish; isBuy: boolean }]
  ): string;
  encodeFunctionData(functionFragment: "setCaller", values: [string]): string;
  encodeFunctionData(
    functionFragment: "settleDebt",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "placeBuyOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "placeSellOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setCaller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "settleDebt", data: BytesLike): Result;

  events: {
    "CancelOrder(uint256)": EventFragment;
    "MakeOrder(uint256,address,uint256,bool)": EventFragment;
    "MatchOrder(uint256,address,uint256)": EventFragment;
    "OpenShortcut(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CancelOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MakeOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MatchOrder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OpenShortcut"): EventFragment;
}

export class IMarket extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IMarketInterface;

  functions: {
    cancelOrder(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelOrder(uint256)"(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    placeBuyOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "placeBuyOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    placeSellOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "placeSellOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setCaller(
      _caller: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setCaller(address)"(
      _caller: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    settleDebt(overrides?: Overrides): Promise<ContractTransaction>;

    "settleDebt()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  cancelOrder(
    _orderId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelOrder(uint256)"(
    _orderId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  placeBuyOrder(
    _orderParam: {
      optionAmount: BigNumberish;
      tick: BigNumberish;
      isBuy: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "placeBuyOrder((uint256,uint16,bool))"(
    _orderParam: {
      optionAmount: BigNumberish;
      tick: BigNumberish;
      isBuy: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  placeSellOrder(
    _orderParam: {
      optionAmount: BigNumberish;
      tick: BigNumberish;
      isBuy: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "placeSellOrder((uint256,uint16,bool))"(
    _orderParam: {
      optionAmount: BigNumberish;
      tick: BigNumberish;
      isBuy: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setCaller(
    _caller: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setCaller(address)"(
    _caller: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  settleDebt(overrides?: Overrides): Promise<ContractTransaction>;

  "settleDebt()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    cancelOrder(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelOrder(uint256)"(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    placeBuyOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    "placeBuyOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    placeSellOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    "placeSellOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    setCaller(_caller: string, overrides?: CallOverrides): Promise<void>;

    "setCaller(address)"(
      _caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    settleDebt(overrides?: CallOverrides): Promise<void>;

    "settleDebt()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    CancelOrder(orderId: BigNumberish | null): EventFilter;

    MakeOrder(
      orderId: BigNumberish | null,
      owner: null,
      optionAmount: null,
      isBuy: null
    ): EventFilter;

    MatchOrder(
      makerOrderId: BigNumberish | null,
      taker: null,
      optionAmount: null
    ): EventFilter;

    OpenShortcut(fromOrderId: null, toOrderId: null): EventFilter;
  };

  estimateGas: {
    cancelOrder(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelOrder(uint256)"(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    placeBuyOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "placeBuyOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    placeSellOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "placeSellOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    setCaller(_caller: string, overrides?: Overrides): Promise<BigNumber>;

    "setCaller(address)"(
      _caller: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    settleDebt(overrides?: Overrides): Promise<BigNumber>;

    "settleDebt()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelOrder(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelOrder(uint256)"(
      _orderId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    placeBuyOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "placeBuyOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    placeSellOrder(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "placeSellOrder((uint256,uint16,bool))"(
      _orderParam: {
        optionAmount: BigNumberish;
        tick: BigNumberish;
        isBuy: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setCaller(
      _caller: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setCaller(address)"(
      _caller: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    settleDebt(overrides?: Overrides): Promise<PopulatedTransaction>;

    "settleDebt()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}