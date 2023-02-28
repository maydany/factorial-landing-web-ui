import {loadFixture} from 'ethereum-waffle'
import {ethers, waffle} from 'hardhat'
import {
    MockERC20,
    L2fiMarket,
    L2fiMarketRouter,
    MockERC1155, TestHelper, FeeCollector,
} from '../typechain'
import marketFixture from './shared/marketFixture'
import {expect} from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe('L2fiMarket load test', () => {
    let market: L2fiMarket
    let router: L2fiMarketRouter
    let feeCollector: FeeCollector
    let options: MockERC1155
    let usdc: MockERC20
    let helper: TestHelper
    let tester: SignerWithAddress

    before('load fixture', async () => {
        [tester] = await ethers.getSigners();
        ({market, router, feeCollector, options, usdc, helper} = await loadFixture(marketFixture));
    })

    describe('#1 Setter test', async () => {
        it('#1-1 setReferralDiscount success test', async () => {
            await feeCollector.setReferralDiscount(1234)
            expect(await feeCollector.referralDiscount()).to.equal(1234)
            await feeCollector.setReferralDiscount(0)
            expect(await feeCollector.referralDiscount()).to.equal(0)
        })

        it('#1-1-1 setReferralDiscount fail test', async () => {
            await expect(feeCollector.setReferralDiscount("100000000"))
                .to.be.revertedWith('Over 100%')
        })

        it('#1-2 setRefereePortion success test', async () => {
            await feeCollector.setRefereePortion(1234)
            expect(await feeCollector.refereePortion()).to.equal(1234)
            await feeCollector.setRefereePortion(0)
            expect(await feeCollector.refereePortion()).to.equal(0)
        })

        it('#1-2-1 setRefereePortion fail test', async () => {
            await expect(feeCollector.setRefereePortion("100000000"))
                .to.be.revertedWith('Over 100%')
        })
    })

    describe('#2 referral test', async () => {
        it('#2-1 registerReferral success test', async () => {
            let [tester1, tester2] = await ethers.getSigners();
            await feeCollector.registerReferral(tester2.address);
        })

        it('#2-2 registerReferral fail test', async () => {
            let [tester1, tester2] = await ethers.getSigners();
            await expect(feeCollector.registerReferral(tester2.address))
                .to.be.revertedWith('Already registered')
        })
    })
})
