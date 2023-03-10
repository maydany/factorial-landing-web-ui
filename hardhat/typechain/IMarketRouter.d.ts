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

interface IMarketRouterInterface extends ethers.utils.Interface {
  functions: {
    "doERC1155TransferIn(uint256,address,uint256)": FunctionFragment;
    "doERC20TransferIn(address,address,uint256)": FunctionFragment;
    "execute(uint256,bytes)": FunctionFragment;
    "executeBatch(uint256,bytes[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "doERC1155TransferIn",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "doERC20TransferIn",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeBatch",
    values: [BigNumberish, BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "doERC1155TransferIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "doERC20TransferIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeBatch",
    data: BytesLike
  ): Result;

  events: {};
}

export class IMarketRouter extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IMarketRouterInterface;

  functions: {
    doERC1155TransferIn(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "doERC1155TransferIn(uint256,address,uint256)"(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    doERC20TransferIn(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "doERC20TransferIn(address,address,uint256)"(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    execute(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "execute(uint256,bytes)"(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    executeBatch(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeBatch(uint256,bytes[])"(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  doERC1155TransferIn(
    _optionTokenId: BigNumberish,
    _from: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "doERC1155TransferIn(uint256,address,uint256)"(
    _optionTokenId: BigNumberish,
    _from: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  doERC20TransferIn(
    _quoteToken: string,
    _from: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "doERC20TransferIn(address,address,uint256)"(
    _quoteToken: string,
    _from: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  execute(
    _marketId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "execute(uint256,bytes)"(
    _marketId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  executeBatch(
    _marketId: BigNumberish,
    _dataArray: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeBatch(uint256,bytes[])"(
    _marketId: BigNumberish,
    _dataArray: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    doERC1155TransferIn(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "doERC1155TransferIn(uint256,address,uint256)"(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    doERC20TransferIn(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "doERC20TransferIn(address,address,uint256)"(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    execute(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "execute(uint256,bytes)"(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    executeBatch(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    "executeBatch(uint256,bytes[])"(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    doERC1155TransferIn(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "doERC1155TransferIn(uint256,address,uint256)"(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    doERC20TransferIn(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "doERC20TransferIn(address,address,uint256)"(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    execute(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "execute(uint256,bytes)"(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    executeBatch(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeBatch(uint256,bytes[])"(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    doERC1155TransferIn(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "doERC1155TransferIn(uint256,address,uint256)"(
      _optionTokenId: BigNumberish,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    doERC20TransferIn(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "doERC20TransferIn(address,address,uint256)"(
      _quoteToken: string,
      _from: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    execute(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "execute(uint256,bytes)"(
      _marketId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    executeBatch(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeBatch(uint256,bytes[])"(
      _marketId: BigNumberish,
      _dataArray: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
