// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface IFeeCollector {
    /// @dev Deposit fee to collector
    /// @param _payer The payer address
    /// @param _amount The payer address
    function depositFee(address _payer, uint256 _amount) external;
}
