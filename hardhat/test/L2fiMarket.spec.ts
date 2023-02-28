import {loadFixture} from 'ethereum-waffle';
import {ethers, waffle} from 'hardhat';
import {
    MockERC20,
    L2fiMarket,
    L2fiMarketRouter,
    MockERC1155, TestHelper, FeeCollector,
} from '../typechain';
import marketFixture from './shared/marketFixture';
import {expect} from "chai";
import {MaxUint128, MaxUint16, ZeroAddress} from "./shared/constants";
import {BigNumber} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe('L2fiMarket unit test', () => {
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
        await usdc.mint(tester.address, MaxUint128)
        await usdc.approve(router.address, MaxUint128)
        await options.mint(tester.address, 1, MaxUint128)
        await options.setApprovalForAll(router.address, true)
    })

    describe('#1 placeBuyOrder simple test', async () => {
        it('#1-1 success test', async () => {
            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(10000000000)
            let orderId = await helper.getOrderId(tick, 0)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])

            // when
            await router.execute(1, placeBuyOrderCallData)

            // then
            expect((await market.orders(orderId)).owner).to.equal(tester.address)
            expect((await market.orders(orderId)).downsizedOptionAmount)
                .to.equal(optionAmount.div(await market.downsizingScale()))
            expect((await market.slot()).maxBuyTick).to.equal(tick)
        })

        it('#1-2 fail test "Not buy order"', async () => {
            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(10000000000)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Not buy order')
        })

        it('#1-3 fail test "Under minimum amount"', async () => {
            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(100)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Under minimum amount')
        })

        it('#1-4 fail test "Closed market"', async () => {
            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(10000000000)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])
            let originalCloseTime = await market.closeTime()
            await market.setCloseTime(100)

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Closed market')

            // rollback setting
            await market.setCloseTime(originalCloseTime)
        })
    })

    describe('#2 placeSellOrder simple test', async () => {
        it('#2-1 success test', async () => {
            // given
            let tick = BigNumber.from(14800)
            let optionAmount = BigNumber.from(10000000000)
            let orderId = await helper.getOrderId(tick, 0)
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])

            // when
            await router.execute(1, placeSellOrderCallData)

            // then
            expect((await market.orders(orderId)).owner).to.equal(tester.address)
            expect((await market.orders(orderId)).downsizedOptionAmount)
                .to.equal(optionAmount.div(await market.downsizingScale()))
            expect((await market.slot()).minSellTick).to.equal(tick)
        })

        it('#2-2 fail test "Not sell order"', async () => {
            // given
            let tick = BigNumber.from(14800)
            let optionAmount = BigNumber.from(10000000000)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Not sell order')
        })

        it('#2-3 fail test "Under minimum amount"', async () => {
            // given
            let tick = BigNumber.from(14800)
            let optionAmount = BigNumber.from(100)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Under minimum amount')
        })

        it('#2-4 fail test "Closed market"', async () => {
            // given
            let tick = BigNumber.from(14800)
            let optionAmount = BigNumber.from(10000000000)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])
            let originalCloseTime = await market.closeTime()
            await market.setCloseTime(100)

            // when
            await expect(router.execute(1, placeBuyOrderCallData))
                .to.be.revertedWith('Closed market')

            // rollback setting
            await market.setCloseTime(originalCloseTime)
        })
    })

    describe('#3 cancel order simple test', async () => {
        it('#3-1 cancel buy order success test', async () => {
            // given
            let orderId = await helper.getOrderId(14700, 0)
            let cancelOrderCallData = market.interface.encodeFunctionData("cancelOrder", [orderId])

            // when
            await router.execute(1, cancelOrderCallData)

            // then
            expect((await market.slot()).maxBuyTick).to.equal(0)
            expect((await market.orders(orderId)).owner).to.equal(ZeroAddress)
            expect((await market.orders(orderId)).downsizedOptionAmount).to.equal(0)
        })

        it('#3-2 cancel sell order success test', async () => {
            // given
            let orderId = await helper.getOrderId(14800, 0)
            let cancelOrderCallData = market.interface.encodeFunctionData("cancelOrder", [orderId])

            // when
            await router.execute(1, cancelOrderCallData)

            // then
            expect((await market.slot()).minSellTick).to.equal(MaxUint16)
            expect((await market.orders(orderId)).owner).to.equal(ZeroAddress)
            expect((await market.orders(orderId)).downsizedOptionAmount).to.equal(0)
        })
    })

    describe('#4 match order simple test', async () => {
        it('#4-1 matchOrder sell -> buy success test', async () => {
            // given
            let tick = BigNumber.from(14700)
            let orderId = await helper.getOrderId(tick, 0)
            let optionAmount = BigNumber.from(10000000000)
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])

            // when
            await router.execute(1, placeSellOrderCallData)
            await router.execute(1, placeBuyOrderCallData)

            // then
            expect((await market.orders(orderId)).owner).to.equal(ZeroAddress)
            expect((await market.orders(orderId)).downsizedOptionAmount).to.equal(0)
            expect((await market.slot()).maxBuyTick).to.equal(0)
            expect((await market.slot()).minSellTick).to.equal(MaxUint16)
            expect(await usdc.balanceOf(market.address)).to.equal(0)
            expect(await usdc.balanceOf(feeCollector.address)).to.equal("6000000")
        })

        it('#4-2 matchOrder buy -> sell success test', async () => {
            // given
            let tick = BigNumber.from(14800)
            let orderId = await helper.getOrderId(tick, 0)
            let optionAmount = BigNumber.from(10000000000)
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])

            // when
            await router.execute(1, placeBuyOrderCallData)
            await router.execute(1, placeSellOrderCallData)

            // then
            expect((await market.orders(orderId)).owner).to.equal(ZeroAddress)
            expect((await market.orders(orderId)).downsizedOptionAmount).to.equal(0)
            expect((await market.slot()).maxBuyTick).to.equal(0)
            expect((await market.slot()).minSellTick).to.equal(MaxUint16)
            expect(await usdc.balanceOf(market.address)).to.equal(0)
            expect(await usdc.balanceOf(feeCollector.address)).to.equal("14000000")
        })
    })

    describe('#5 execute batch simple success test', async () => {
        it('#5-1 placeBuyOrder single success test', async () => {
            // given
            let placeBuyOrderCallData1 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14700, isBuy: true}])
            let placeBuyOrderCallData2 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14800, isBuy: true}])
            let placeBuyOrderCallData3 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14900, isBuy: true}])
            let placeSellOrderCallData1 = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: "10000000000", tick: 15000, isBuy: false}])
            let placeSellOrderCallData2 = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: "10000000000", tick: 15100, isBuy: false}])
            let placeSellOrderCallData3 = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: "10000000000", tick: 15200, isBuy: false}])
            let cancelOrderCallData1 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(14700, (await market.tickInfos(14700)).last)])
            let cancelOrderCallData2 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(14800, (await market.tickInfos(14800)).last)])
            let cancelOrderCallData3 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(14900, (await market.tickInfos(14900)).last)])
            let cancelOrderCallData4 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(15000, (await market.tickInfos(15000)).last)])
            let cancelOrderCallData5 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(15100, (await market.tickInfos(15100)).last)])
            let cancelOrderCallData6 = market.interface.encodeFunctionData("cancelOrder",
                [await helper.getOrderId(15200, (await market.tickInfos(15200)).last)])

            // when
            await router.executeBatch(
                1,
                [
                    placeBuyOrderCallData1,
                    placeBuyOrderCallData2,
                    placeBuyOrderCallData3,
                    placeSellOrderCallData1,
                    placeSellOrderCallData2,
                    placeSellOrderCallData3
                ]
            )
            await router.executeBatch(
                1,
                [
                    cancelOrderCallData1,
                    cancelOrderCallData2,
                    cancelOrderCallData3,
                    cancelOrderCallData4,
                    cancelOrderCallData5,
                    cancelOrderCallData6
                ]
            )

            // then
            expect((await market.slot()).maxBuyTick).to.equal(0)
            expect((await market.slot()).minSellTick).to.equal(MaxUint16)
        })
    })

    describe('#6 setter test', async () => {
        it('#6-1 setMakerFee success test', async () => {
            await market.setCloseTime(1000)

            await market.setMakerFee(1000)
            expect(await market.makerFee()).to.equal(1000)
            await market.setMakerFee(0)
            expect(await market.makerFee()).to.equal(0)
        })

        it('#6-1-1 setMakerFee over 100% fail test', async () => {
            await expect(market.setMakerFee("100000000"))
                .to.be.revertedWith('Over 100%')
        })

        it('#6-1-2 setMakerFee no deficit fail test', async () => {
            await expect(market.setMakerFee(-1000))
                .to.be.revertedWith('No deficit')
        })

        it('#6-2 setTakerFee success test', async () => {
            await market.setTakerFee(1000)
            expect(await market.takerFee()).to.equal(1000)
            await market.setTakerFee(0)
            expect(await market.takerFee()).to.equal(0)
        })

        it('#6-2-1 setTakerFee over 100% fail test', async () => {
            await expect(market.setTakerFee("100000000"))
                .to.be.revertedWith('Over 100%')
        })

        it('#6-2-2 setTakerFee no deficit fail test', async () => {
            await expect(market.setTakerFee(-1000))
                .to.be.revertedWith('No deficit')
        })

        it('#6-2-3 setMaker/TakerFee success test', async () => {
            await market.setMakerFee(1000)
            await market.setTakerFee(-1000)
            expect(await market.takerFee()).to.equal(-1000)
            await market.setTakerFee(1000)
            await market.setMakerFee(-1000)
            expect(await market.makerFee()).to.equal(-1000)

            // rollback setting
            await market.setMakerFee(100)
            await market.setTakerFee(100)
        })

        it('#6-3 setOpenTime success test', async () => {
            const blockNumBefore = await ethers.provider.getBlockNumber()
            const blockBefore = await ethers.provider.getBlock(blockNumBefore)
            const currentTime = blockBefore.timestamp

            await market.setOpenTime(1000)
            expect(await market.openTime()).to.equal(1000)
            await market.setOpenTime(currentTime)
            expect(await market.openTime()).to.equal(currentTime)
        })

        it('#6-4 setCloseTime success test', async () => {
            const blockNumBefore = await ethers.provider.getBlockNumber()
            const blockBefore = await ethers.provider.getBlock(blockNumBefore)
            const currentTime = blockBefore.timestamp

            await market.setCloseTime(1000)
            expect(await market.closeTime()).to.equal(1000)
            await market.setCloseTime(currentTime + 100000)
            expect(await market.closeTime()).to.equal(currentTime + 100000)
        })

        it('#6-5 setMinimumOrderAmount success test', async () => {
            await market.setMinimumOrderAmount(0)
            expect(await market.minimumOrderAmount()).to.equal(0)
            await market.setMinimumOrderAmount(10000)
            expect(await market.minimumOrderAmount()).to.equal(10000)
        })
    })

    describe('#7 Shortcut test', async () => {
        it('#7-1 Open shortcut success test', async () => {
            let loadAmount = 10
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14700, isBuy: true}])
            await router.execute(1, placeBuyOrderCallData)

            let tickLast = (await market.tickInfos(14700)).last
            for (let i = 0; i <= loadAmount; i++) {
                let cancelOrderCallData1 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(i))])
                await router.executeBatch(
                    1,
                    [
                        placeBuyOrderCallData,
                        cancelOrderCallData1
                    ]
                );
            }
            await router.execute(1, placeBuyOrderCallData)
            tickLast = (await market.tickInfos(14700)).last
            let fromOrderId = await helper.getOrderId(14700, tickLast.sub(loadAmount))
            await market.openShortcut(fromOrderId, fromOrderId.add(5))
            expect(await market.nextOrderIds(fromOrderId)).to.equal(fromOrderId.add(5))
        })

        it('#7-2 Open shortcut fail test - Not same tick orders', async () => {
            let fromOrderId = await helper.getOrderId(14701, 1)
            let toOrderId = await helper.getOrderId(14703, 2)
            await expect(market.openShortcut(fromOrderId, toOrderId))
                .to.be.revertedWith('Not same tick orders')
        })

        it('#7-3 Open shortcut fail test - To is upper than from', async () => {
            let fromOrderId = await helper.getOrderId(14700, 10)
            let toOrderId = await helper.getOrderId(14700, 5)
            await expect(market.openShortcut(fromOrderId, toOrderId))
                .to.be.revertedWith('To is upper than from')
        })

        it('#7-4 Open shortcut fail test - To is upper than original', async () => {
            let tickLast = (await market.tickInfos(14700)).last
            let fromOrderId = await helper.getOrderId(14700, tickLast.sub(10))
            await expect(market.openShortcut(fromOrderId, fromOrderId.add(3)))
                .to.be.revertedWith('To is upper than original')
        })

        it('#7-5 Open shortcut fail test - Invalid order id', async () => {
            let tickLast = (await market.tickInfos(14700)).last
            let fromOrderId = await helper.getOrderId(14700, tickLast.sub(10))
            await expect(market.openShortcut(fromOrderId, fromOrderId.add(100)))
                .to.be.revertedWith('Invalid order id')
        })
    })

    describe('#8 Referral test', async () => {
        it('#8-1 Referral discount success test', async () => {

            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(10000000000)
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])
            await feeCollector.setReferralDiscount(100000);

            // when
            await router.execute(1, placeSellOrderCallData)
            await router.execute(1, placeBuyOrderCallData)

            //then (14e6 + 6e6 * 0.9 // original: 14e6, fee: 6e6, discount: 10%)
            expect(await usdc.balanceOf(feeCollector.address)).to.equal("19400000")

            // rollback setting
            await feeCollector.setReferralDiscount(0);
        })

        it('#8-2 Referee portion success test', async () => {
            let [tester1, tester2] = await ethers.getSigners();

            // given
            let tick = BigNumber.from(14700)
            let optionAmount = BigNumber.from(10000000000)
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: false}])
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: optionAmount, tick: tick, isBuy: true}])
            await feeCollector.setRefereePortion(100000);

            // when
            await router.execute(1, placeSellOrderCallData)
            await router.execute(1, placeBuyOrderCallData)

            //then (6e6 * 0.1 // fee: 6e6, portion: 10%)
            expect(await feeCollector.claimableFees(tester2.address)).to.equal("600000")

            // rollback setting
            await feeCollector.setRefereePortion(0);
        })
    })

})
