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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface FeeCollectorInterface extends ethers.utils.Interface {
  functions: {
    "ALL_FEE_PORTION()": FunctionFragment;
    "claim()": FunctionFragment;
    "claimableFees(address)": FunctionFragment;
    "depositFee(address,uint256)": FunctionFragment;
    "feeToken()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "refereePortion()": FunctionFragment;
    "referral(address)": FunctionFragment;
    "referralDiscount()": FunctionFragment;
    "registerReferral(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setRefereePortion(uint256)": FunctionFragment;
    "setReferralDiscount(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ALL_FEE_PORTION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimableFees",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "feeToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "refereePortion",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "referral", values: [string]): string;
  encodeFunctionData(
    functionFragment: "referralDiscount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerReferral",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setRefereePortion",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setReferralDiscount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ALL_FEE_PORTION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimableFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "depositFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "refereePortion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "referral", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "referralDiscount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerReferral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRefereePortion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setReferralDiscount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export class FeeCollector extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: FeeCollectorInterface;

  functions: {
    ALL_FEE_PORTION(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "ALL_FEE_PORTION()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    claim(overrides?: Overrides): Promise<ContractTransaction>;

    "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

    claimableFees(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "claimableFees(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    depositFee(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "depositFee(address,uint256)"(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    feeToken(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "feeToken()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    initialize(
      _feeToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address)"(
      _feeToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "owner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    proxiableUUID(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    refereePortion(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "refereePortion()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    referral(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "referral(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    referralDiscount(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "referralDiscount()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    registerReferral(
      _referee: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerReferral(address)"(
      _referee: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setRefereePortion(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setRefereePortion(uint256)"(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setReferralDiscount(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setReferralDiscount(uint256)"(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "upgradeTo(address)"(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
  };

  ALL_FEE_PORTION(overrides?: CallOverrides): Promise<BigNumber>;

  "ALL_FEE_PORTION()"(overrides?: CallOverrides): Promise<BigNumber>;

  claim(overrides?: Overrides): Promise<ContractTransaction>;

  "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

  claimableFees(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  "claimableFees(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  depositFee(
    _payer: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "depositFee(address,uint256)"(
    _payer: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  feeToken(overrides?: CallOverrides): Promise<string>;

  "feeToken()"(overrides?: CallOverrides): Promise<string>;

  initialize(
    _feeToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address)"(
    _feeToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

  refereePortion(overrides?: CallOverrides): Promise<BigNumber>;

  "refereePortion()"(overrides?: CallOverrides): Promise<BigNumber>;

  referral(arg0: string, overrides?: CallOverrides): Promise<string>;

  "referral(address)"(arg0: string, overrides?: CallOverrides): Promise<string>;

  referralDiscount(overrides?: CallOverrides): Promise<BigNumber>;

  "referralDiscount()"(overrides?: CallOverrides): Promise<BigNumber>;

  registerReferral(
    _referee: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerReferral(address)"(
    _referee: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setRefereePortion(
    _refereePortion: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setRefereePortion(uint256)"(
    _refereePortion: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setReferralDiscount(
    _referralDiscount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setReferralDiscount(uint256)"(
    _referralDiscount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "upgradeTo(address)"(
    newImplementation: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "upgradeToAndCall(address,bytes)"(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  callStatic: {
    ALL_FEE_PORTION(overrides?: CallOverrides): Promise<BigNumber>;

    "ALL_FEE_PORTION()"(overrides?: CallOverrides): Promise<BigNumber>;

    claim(overrides?: CallOverrides): Promise<void>;

    "claim()"(overrides?: CallOverrides): Promise<void>;

    claimableFees(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "claimableFees(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositFee(
      _payer: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "depositFee(address,uint256)"(
      _payer: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    feeToken(overrides?: CallOverrides): Promise<string>;

    "feeToken()"(overrides?: CallOverrides): Promise<string>;

    initialize(_feeToken: string, overrides?: CallOverrides): Promise<void>;

    "initialize(address)"(
      _feeToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<string>;

    refereePortion(overrides?: CallOverrides): Promise<BigNumber>;

    "refereePortion()"(overrides?: CallOverrides): Promise<BigNumber>;

    referral(arg0: string, overrides?: CallOverrides): Promise<string>;

    "referral(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

    referralDiscount(overrides?: CallOverrides): Promise<BigNumber>;

    "referralDiscount()"(overrides?: CallOverrides): Promise<BigNumber>;

    registerReferral(
      _referee: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerReferral(address)"(
      _referee: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setRefereePortion(
      _refereePortion: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setRefereePortion(uint256)"(
      _refereePortion: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setReferralDiscount(
      _referralDiscount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReferralDiscount(uint256)"(
      _referralDiscount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeTo(address)"(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    AdminChanged(previousAdmin: null, newAdmin: null): EventFilter;

    BeaconUpgraded(beacon: string | null): EventFilter;

    Initialized(version: null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Upgraded(implementation: string | null): EventFilter;
  };

  estimateGas: {
    ALL_FEE_PORTION(overrides?: CallOverrides): Promise<BigNumber>;

    "ALL_FEE_PORTION()"(overrides?: CallOverrides): Promise<BigNumber>;

    claim(overrides?: Overrides): Promise<BigNumber>;

    "claim()"(overrides?: Overrides): Promise<BigNumber>;

    claimableFees(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "claimableFees(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositFee(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "depositFee(address,uint256)"(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    feeToken(overrides?: CallOverrides): Promise<BigNumber>;

    "feeToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(_feeToken: string, overrides?: Overrides): Promise<BigNumber>;

    "initialize(address)"(
      _feeToken: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<BigNumber>;

    refereePortion(overrides?: CallOverrides): Promise<BigNumber>;

    "refereePortion()"(overrides?: CallOverrides): Promise<BigNumber>;

    referral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "referral(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    referralDiscount(overrides?: CallOverrides): Promise<BigNumber>;

    "referralDiscount()"(overrides?: CallOverrides): Promise<BigNumber>;

    registerReferral(
      _referee: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerReferral(address)"(
      _referee: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setRefereePortion(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setRefereePortion(uint256)"(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setReferralDiscount(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setReferralDiscount(uint256)"(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "upgradeTo(address)"(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ALL_FEE_PORTION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ALL_FEE_PORTION()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claim(overrides?: Overrides): Promise<PopulatedTransaction>;

    "claim()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    claimableFees(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "claimableFees(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    depositFee(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "depositFee(address,uint256)"(
      _payer: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    feeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "feeToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _feeToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address)"(
      _feeToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "proxiableUUID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refereePortion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "refereePortion()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    referral(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "referral(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    referralDiscount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "referralDiscount()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerReferral(
      _referee: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerReferral(address)"(
      _referee: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setRefereePortion(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setRefereePortion(uint256)"(
      _refereePortion: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setReferralDiscount(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setReferralDiscount(uint256)"(
      _referralDiscount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "upgradeTo(address)"(
      newImplementation: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "upgradeToAndCall(address,bytes)"(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;
  };
}
