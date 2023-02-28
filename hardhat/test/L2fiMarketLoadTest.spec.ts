import {loadFixture} from 'ethereum-waffle'
import {ethers, waffle} from 'hardhat'
import {
    MockERC20,
    L2fiMarket,
    L2fiMarketRouter,
    MockERC1155, TestHelper,
} from '../typechain'
import marketFixture from './shared/marketFixture'
import {expect} from "chai";
import {MaxUint128} from "./shared/constants";

describe('L2fiMarket load test', () => {
    let market: L2fiMarket
    let router: L2fiMarketRouter
    let options: MockERC1155
    let usdc: MockERC20
    let helper: TestHelper

    before('load fixture', async () => {
        const [tester] = await ethers.getSigners();
        ({market, router, options, usdc, helper} = await loadFixture(marketFixture));
        await usdc.mint(tester.address, MaxUint128)
        await usdc.approve(router.address, MaxUint128)
        await options.mint(tester.address, 1, MaxUint128);
        await options.setApprovalForAll(router.address, true);
    })

    describe('#1 Order load test', async () => {
        it('#1-1 Cancelled order skip load test', async () => {
            let loadAmount = 10
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14701, isBuy: true}]);
            await router.execute(1, placeBuyOrderCallData)
            placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14700, isBuy: true}]);
            await router.execute(1, placeBuyOrderCallData)

            let tickLast = (await market.tickInfos(14700)).last;
            for (let i = 0; i <= loadAmount / 5; i++) {
                let cancelOrderCallData1 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(5*i))]);
                let cancelOrderCallData2 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(5*i+1))]);
                let cancelOrderCallData3 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(5*i+2))]);
                let cancelOrderCallData4 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(5*i+3))]);
                let cancelOrderCallData5 = market.interface.encodeFunctionData("cancelOrder",
                    [await helper.getOrderId(14700, tickLast.add(5*i+4))]);
                await router.executeBatch(
                    1,
                    [
                        placeBuyOrderCallData,
                        cancelOrderCallData1,
                        placeBuyOrderCallData,
                        cancelOrderCallData2,
                        placeBuyOrderCallData,
                        cancelOrderCallData3,
                        placeBuyOrderCallData,
                        cancelOrderCallData4,
                        placeBuyOrderCallData,
                        cancelOrderCallData5
                    ]
                );
            }
            await router.execute(1, placeBuyOrderCallData);
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: "50000000000", tick: 14700, isBuy: false}]);
            await router.execute(1, placeSellOrderCallData);
        })

        it('#1-2 match order load test', async () => {
            let loadAmount = 10;
            let placeBuyOrderCallData = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 14700, isBuy: true}]);
            await router.execute(1, placeBuyOrderCallData);

            for (let i = 0; i <= loadAmount / 10; i++) {
                await router.executeBatch(
                    1,
                    [
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData,
                        placeBuyOrderCallData
                    ]
                );
            }
            let placeSellOrderCallData = market.interface.encodeFunctionData("placeSellOrder",
                [{optionAmount: "100000000000000", tick: 14700, isBuy: false}]);
            await router.execute(1, placeSellOrderCallData);
        })
    })

    it('#1-3 getOrderbook view function load test', async () => {
        let loadAmount = 10;
        for (let i = 0; i < loadAmount / 10; i++) {
            let placeBuyOrderCallData1 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 1, isBuy: true}]);
            let placeBuyOrderCallData2 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 2, isBuy: true}]);
            let placeBuyOrderCallData3 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 3, isBuy: true}]);
            let placeBuyOrderCallData4 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 4, isBuy: true}]);
            let placeBuyOrderCallData5 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 5, isBuy: true}]);
            let placeBuyOrderCallData6 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 6, isBuy: true}]);
            let placeBuyOrderCallData7 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 7, isBuy: true}]);
            let placeBuyOrderCallData8 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 8, isBuy: true}]);
            let placeBuyOrderCallData9 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 9, isBuy: true}]);
            let placeBuyOrderCallData10 = market.interface.encodeFunctionData("placeBuyOrder",
                [{optionAmount: "10000000000", tick: 10*i + 10, isBuy: true}]);
            await router.executeBatch(
                1,
                [
                    placeBuyOrderCallData1,
                    placeBuyOrderCallData2,
                    placeBuyOrderCallData3,
                    placeBuyOrderCallData4,
                    placeBuyOrderCallData5,
                    placeBuyOrderCallData6,
                    placeBuyOrderCallData7,
                    placeBuyOrderCallData8,
                    placeBuyOrderCallData9,
                    placeBuyOrderCallData10
                ]
            );
        }
        await market.getOrderbook(loadAmount);
    })
})
