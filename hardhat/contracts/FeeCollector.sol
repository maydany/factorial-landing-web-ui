// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol";

import "./interfaces/IFeeCollector.sol";
import "./interfaces/IFeeCollectorCallback.sol";

contract FeeCollector is IFeeCollector, OwnableUpgradeable, UUPSUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using MathUpgradeable for uint256;

    // 1000000 => 100%
    uint256 public constant ALL_FEE_PORTION = 1000000;

    address public feeToken;

    uint256 public refereePortion;
    uint256 public referralDiscount;

    // Mapping referrer to referee
    mapping(address => address) public referral;
    // Mapping referee to claimable fee amount
    mapping(address => uint256) public claimableFees;

    /// @dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /// @dev Initialize the L2Fi fee collector contract, using msg.sender as the first owner.
    /// @param _feeToken ERC20 fee token address.
    function initialize(address _feeToken) public initializer {
        __Ownable_init();
        feeToken = _feeToken;
    }

    /// @dev Set maker fee.
    /// @param _refereePortion Percentage of fee the referee will take
    function setRefereePortion(uint256 _refereePortion) external onlyOwner {
        require(_refereePortion <= ALL_FEE_PORTION, 'Over 100%');
        refereePortion = _refereePortion;
    }

    /// @dev Set maker fee.
    /// @param _referralDiscount The referral discount fee percentage
    function setReferralDiscount(uint256 _referralDiscount) external onlyOwner {
        require(_referralDiscount <= ALL_FEE_PORTION, 'Over 100%');
        referralDiscount = _referralDiscount;
    }

    /// @dev Register referral
    /// @param _referee Address of referee
    function registerReferral(address _referee) external {
        require(referral[msg.sender] == address(0), 'Already registered');
        referral[msg.sender] = _referee;
    }

    /// @dev Deposit fee to collector
    /// @param _payer The payer address
    /// @param _amount The amount of deposit fee
    function depositFee(address _payer, uint256 _amount) external override {
        if (referral[_payer] != address(0)) {
            claimableFees[referral[_payer]] += _amount.mulDiv(refereePortion, ALL_FEE_PORTION);
            _amount = _amount.mulDiv(ALL_FEE_PORTION - referralDiscount, ALL_FEE_PORTION);
        }
        uint256 balanceBefore = IERC20Upgradeable(feeToken).balanceOf(address(this));
        IFeeCollectorCallback(msg.sender).feeCallback(_amount);
        require(balanceBefore + _amount <= IERC20Upgradeable(feeToken).balanceOf(address(this)), 'Callback error');
    }

    /// @dev Claim accumulated referral fee
    function claim() external {
        uint256 claimable = claimableFees[msg.sender];
        require(claimable > 0, 'No claimable fee');
        claimableFees[msg.sender] = 0;
        IERC20Upgradeable(feeToken).safeTransfer(msg.sender, claimable);
    }
}

