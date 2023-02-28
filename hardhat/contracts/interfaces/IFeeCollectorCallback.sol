// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface IFeeCollectorCallback {
    /// @dev In the implementation you must pay the fee tokens
    /// @param _amount The amount of token to be transferred
    function feeCallback(uint256 _amount) external;
}
