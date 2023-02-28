import {Fixture} from 'ethereum-waffle'
import {ethers, waffle} from 'hardhat'
import {
    L2fiMarket,
    L2fiMarketRouter,
    FeeCollector,
    MockOldERC20,
    MockERC1155,
    SingleTickPriceModel,
    TestHelper
} from '../../typechain'

import {MaxUint128} from "./constants";

const marketFixture: Fixture<{
    market: L2fiMarket
    router: L2fiMarketRouter
    feeCollector: FeeCollector
    options: MockERC1155
    usdc: MockOldERC20
    helper: TestHelper
}> = async () => {
    const [deployer] = await ethers.getSigners();

    const MockERC1155Factory = await ethers.getContractFactory('MockERC1155');
    const MockERC20Factory = await ethers.getContractFactory('MockOldERC20');
    const routerFactory = await ethers.getContractFactory('L2fiMarketRouter');
    const feeCollectorFactory = await ethers.getContractFactory('FeeCollector');
    const marketFactory = await ethers.getContractFactory('L2fiMarket');
    const SingleTickPriceModelFactory = await ethers.getContractFactory('SingleTickPriceModel');
    const testHelperFactory = await ethers.getContractFactory('TestHelper');

    const options = await MockERC1155Factory.deploy() as MockERC1155;
    const usdc = await MockERC20Factory.deploy("mockUSDC", "usdc", "6") as MockOldERC20;
    const router = await routerFactory.deploy() as L2fiMarketRouter;
    const feeCollector = await feeCollectorFactory.deploy() as FeeCollector;
    const tickPriceModel = await SingleTickPriceModelFactory.deploy(100) as SingleTickPriceModel;
    const market = await marketFactory.deploy() as L2fiMarket;
    const helper = await testHelperFactory.deploy() as TestHelper;

    await options.mint(deployer.address, 1, MaxUint128);
    await usdc.mint(deployer.address, MaxUint128);

    await router.initialize(options.address);
    await router.registerMarket(1, market.address);

    await feeCollector.initialize(usdc.address);

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const currentTime = blockBefore.timestamp;

    await market.initialize(
        options.address,
        1, usdc.address,
        router.address,
        feeCollector.address,
        tickPriceModel.address,
        100,
        0,
        0,
        10000
    );

    await market.setMakerFee(100)
    await market.setTakerFee(100)
    await market.setOpenTime(currentTime)
    await market.setCloseTime(currentTime + 100000)

    return {
        market,
        router,
        feeCollector,
        options,
        usdc,
        helper
    }
}

export default marketFixture
