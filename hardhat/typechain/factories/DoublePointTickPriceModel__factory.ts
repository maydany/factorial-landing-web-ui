/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DoublePointTickPriceModel } from "../DoublePointTickPriceModel";

export class DoublePointTickPriceModel__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _tickDegree: BigNumberish,
    _initialPower: BigNumberish,
    overrides?: Overrides
  ): Promise<DoublePointTickPriceModel> {
    return super.deploy(
      _tickDegree,
      _initialPower,
      overrides || {}
    ) as Promise<DoublePointTickPriceModel>;
  }
  getDeployTransaction(
    _tickDegree: BigNumberish,
    _initialPower: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _tickDegree,
      _initialPower,
      overrides || {}
    );
  }
  attach(address: string): DoublePointTickPriceModel {
    return super.attach(address) as DoublePointTickPriceModel;
  }
  connect(signer: Signer): DoublePointTickPriceModel__factory {
    return super.connect(signer) as DoublePointTickPriceModel__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DoublePointTickPriceModel {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DoublePointTickPriceModel;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_tickDegree",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_initialPower",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "initialTickSqaure",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "priceToTick",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tickDegree",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "tick",
        type: "uint16",
      },
    ],
    name: "tickToPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161088838038061088883398101604081905261002f9161004e565b6000805461ffff191661ffff9390931692909217909155600155610083565b6000806040838503121561006157600080fd5b825161ffff8116811461007357600080fd5b6020939093015192949293505050565b6107f6806100926000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806318f214b514610051578063725d857c1461008457806397f3e6211461009b578063f1c64e64146100bc575b600080fd5b61006461005f366004610579565b6100cf565b6040805161ffff9384168152929091166020830152015b60405180910390f35b61008d60015481565b60405190815260200161007b565b6000546100a99061ffff1681565b60405161ffff909116815260200161007b565b61008d6100ca366004610592565b610386565b600080600154600a6100e191906106b0565b6100eb90846106d2565b6000549093506101009061ffff1660056106e6565b61ffff16831161011257509091829150565b6000546101249061ffff16600a6106e6565b61ffff1683116101ab576000546101409061ffff1660056106e6565b61014e9061ffff1684610710565b925061015b6005846106d2565b60005490935083906101729061ffff1660056106e6565b61ffff166101809190610727565b60005484906101949061ffff1660056106e6565b61ffff166101a29190610727565b91509150915091565b600064174876e8008411156101f5576101c86305f5e100856106d2565b6000549094506101dd9061ffff1660056106e6565b6101e89060086106e6565b6101f2908261073f565b90505b629896808411156102395761020c612710856106d2565b6000549094506102219061ffff1660056106e6565b61022c9060046106e6565b610236908261073f565b90505b620186a084111561027c5761024f6064856106d2565b6000549094506102649061ffff1660056106e6565b61026f9060026106e6565b610279908261073f565b90505b6127108411156102b357610291600a856106d2565b6000549094506102a69061ffff1660056106e6565b6102b0908261073f565b90505b6000546102c59061ffff1660056106e6565b61ffff1684116102e0576102d9848261073f565b905061035b565b6000546102f29061ffff16600a6106e6565b61ffff16841161035b5760005461030e9061ffff1660056106e6565b61031c9061ffff1685610710565b93506103296005856106d2565b60005490945084906103409061ffff1660056106e6565b61ffff1661034e9190610727565b610358908261073f565b90505b61ffff81811614156103705793849350915050565b8061037c81600161073f565b9250925050915091565b600080546103999061ffff1660056106e6565b61ffff168261ffff16116103c9576001546103b590600a6106b0565b6103c39061ffff8416610765565b92915050565b6000546103db9061ffff1660066106e6565b61ffff168261ffff1611610448576001546103f790600a6106b0565b6000546104099061ffff1660056106e6565b6104139084610784565b61041e9060056106e6565b6000546104309061ffff1660056106e6565b61043a919061073f565b61ffff166103c39190610765565b600154600080549091906104619061ffff1660056106e6565b6000546104729061ffff1686610784565b61047c91906107a7565b61ffff1661048a9190610727565b60005490915061049f9061ffff1660056106e6565b6000546104b09061ffff1685610784565b6104ba91906107c8565b6000549093506104cf9061ffff1660046106e6565b61ffff168361ffff161161051d576104e881600a6106b0565b6104f69061ffff8516610765565b610501826003610727565b61050c90600a6106b0565b6105169190610727565b9392505050565b61052881600a6106b0565b60005461053a9061ffff1660046106e6565b6105449085610784565b61054f9060056106e6565b6000546105619061ffff1660046106e6565b61056b919061073f565b61ffff166104f69190610765565b60006020828403121561058b57600080fd5b5035919050565b6000602082840312156105a457600080fd5b813561ffff8116811461051657600080fd5b634e487b7160e01b600052601160045260246000fd5b600181815b808511156106075781600019048211156105ed576105ed6105b6565b808516156105fa57918102915b93841c93908002906105d1565b509250929050565b60008261061e575060016103c3565b8161062b575060006103c3565b8160018114610641576002811461064b57610667565b60019150506103c3565b60ff84111561065c5761065c6105b6565b50506001821b6103c3565b5060208310610133831016604e8410600b841016171561068a575081810a6103c3565b61069483836105cc565b80600019048211156106a8576106a86105b6565b029392505050565b6000610516838361060f565b634e487b7160e01b600052601260045260246000fd5b6000826106e1576106e16106bc565b500490565b600061ffff80831681851681830481118215151615610707576107076105b6565b02949350505050565b600082821015610722576107226105b6565b500390565b6000821982111561073a5761073a6105b6565b500190565b600061ffff80831681851680830382111561075c5761075c6105b6565b01949350505050565b600081600019048311821515161561077f5761077f6105b6565b500290565b600061ffff8381169083168181101561079f5761079f6105b6565b039392505050565b600061ffff808416806107bc576107bc6106bc565b92169190910492915050565b600061ffff808416806107dd576107dd6106bc565b9216919091069291505056fea164736f6c634300080c000a";