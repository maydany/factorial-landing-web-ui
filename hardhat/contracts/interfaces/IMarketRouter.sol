// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface IMarketRouter {
    function execute(uint256 _marketId, bytes calldata _data) external;

    function executeBatch(uint256 _marketId, bytes[] calldata _dataArray) external;

    function doERC1155TransferIn(uint256 _optionTokenId, address _from, uint256 _amount) external;

    function doERC20TransferIn(address _quoteToken, address _from, uint256 _amount) external;

}
