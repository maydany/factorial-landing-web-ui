/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IMarket } from "../IMarket";

export class IMarket__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMarket {
    return new Contract(address, _abi, signerOrProvider) as IMarket;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
    ],
    name: "CancelOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isBuy",
        type: "bool",
      },
    ],
    name: "MakeOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "makerOrderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "optionAmount",
        type: "uint256",
      },
    ],
    name: "MatchOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fromOrderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toOrderId",
        type: "uint256",
      },
    ],
    name: "OpenShortcut",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "optionAmount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "tick",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "isBuy",
            type: "bool",
          },
        ],
        internalType: "struct IMarket.OrderParam",
        name: "_orderParam",
        type: "tuple",
      },
    ],
    name: "placeBuyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "optionAmount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "tick",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "isBuy",
            type: "bool",
          },
        ],
        internalType: "struct IMarket.OrderParam",
        name: "_orderParam",
        type: "tuple",
      },
    ],
    name: "placeSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_caller",
        type: "address",
      },
    ],
    name: "setCaller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
