import {ethers} from "hardhat";
import chai from "chai";
import {solidity} from "ethereum-waffle";
import {
    TestHelper__factory,
    SingleTickPriceModel__factory,
    DoublePointTickPriceModel__factory,
} from "../../typechain";

chai.use(solidity);
const {expect} = chai;

describe("TickPriceModel test", () => {
    it("#1 getOrderIdx", async function () {
        let [tester] = await ethers.getSigners();

        let testTickFactory = new TestHelper__factory(tester);
        let testTickInstance = await testTickFactory.deploy();
        expect((await testTickInstance.getOrderId('0', 3)).toString()).to.eq("3", "Invalid orderIdx 1");
        expect((await testTickInstance.getOrderId('1', 0)).toString()).to.eq("1766847064778384329583297500742918515827483896875618958121606201292619776", "Invalid orderIdx 2");
        expect((await testTickInstance.getOrderId('100', 130)).toString()).to.eq("176684706477838432958329750074291851582748389687561895812160620129261977730", "Invalid orderIdx 3");
        expect((await testTickInstance.getOrderId('101', 2)).toString()).to.eq("178451553542616817287913047575034770098575873584437514770282226330554597378", "Invalid orderIdx 4");
        expect((await testTickInstance.getOrderId('999', 2)).toString()).to.eq("1765080217713605945253714203242175597311656412978743339163484595091327156226", "Invalid orderIdx 5");
        expect((await testTickInstance.getOrderId('1000', 2)).toString()).to.eq("1766847064778384329583297500742918515827483896875618958121606201292619776002", "Invalid orderIdx 6");
    })

    it("#2 single getPrice", async function () {
        let [tester] = await ethers.getSigners();

        let singleTickPriceModelFactory = new SingleTickPriceModel__factory(tester);
        let singleTickPriceModel = await singleTickPriceModelFactory.deploy(100);
        expect((await singleTickPriceModel.tickToPrice('0')).toString()).to.eq("0", "price should 0");
        expect((await singleTickPriceModel.tickToPrice('10')).toString()).to.eq("10", "price should 10");
        expect((await singleTickPriceModel.tickToPrice('100')).toString()).to.eq("100", "price should 100");
        expect((await singleTickPriceModel.tickToPrice('101')).toString()).to.eq("101", "price should 101");
        expect((await singleTickPriceModel.tickToPrice('999')).toString()).to.eq("999", "price should 999");
        expect((await singleTickPriceModel.tickToPrice('1000')).toString()).to.eq("1000", "price should 1000");
        expect((await singleTickPriceModel.tickToPrice('1001')).toString()).to.eq("1010", "price should 1010");
        expect((await singleTickPriceModel.tickToPrice('1899')).toString()).to.eq("9990", "price should 9990");
        expect((await singleTickPriceModel.tickToPrice('1900')).toString()).to.eq("10000", "price should 10000");
        expect((await singleTickPriceModel.tickToPrice('1901')).toString()).to.eq("10100", "price should 10100");
        expect((await singleTickPriceModel.tickToPrice('14500')).toString()).to.eq("1000000000000000000", "price should 1e18");
        expect((await singleTickPriceModel.tickToPrice('14700')).toString()).to.eq("3000000000000000000", "price should 3e18");
        expect((await singleTickPriceModel.tickToPrice('15000')).toString()).to.eq("6000000000000000000", "price should 6e18");
    })

    it("#3 double point getPrice", async function () {
        let [tester] = await ethers.getSigners();

        let doublePointTickPriceModelFactory = new DoublePointTickPriceModel__factory(tester);
        let doublePointTickPriceModel = await doublePointTickPriceModelFactory.deploy(1000,0);
        expect((await doublePointTickPriceModel.tickToPrice('0')).toString()).to.eq("0", "price should 0");
        expect((await doublePointTickPriceModel.tickToPrice('10')).toString()).to.eq("10", "price should 10");
        expect((await doublePointTickPriceModel.tickToPrice('100')).toString()).to.eq("100", "price should 100");
        expect((await doublePointTickPriceModel.tickToPrice('101')).toString()).to.eq("101", "price should 101");
        expect((await doublePointTickPriceModel.tickToPrice('4999')).toString()).to.eq("4999", "price should 4999");
        expect((await doublePointTickPriceModel.tickToPrice('5000')).toString()).to.eq("5000", "price should 5000");
        expect((await doublePointTickPriceModel.tickToPrice('5001')).toString()).to.eq("5005", "price should 5005");
        expect((await doublePointTickPriceModel.tickToPrice('5999')).toString()).to.eq("9995", "price should 9995");
        expect((await doublePointTickPriceModel.tickToPrice('6000')).toString()).to.eq("10000", "price should 10000");
        expect((await doublePointTickPriceModel.tickToPrice('6001')).toString()).to.eq("10010", "price should 10010");
        expect((await doublePointTickPriceModel.tickToPrice('9999')).toString()).to.eq("49990", "price should 49990");
        expect((await doublePointTickPriceModel.tickToPrice('10000')).toString()).to.eq("50000", "price should 50000");
        expect((await doublePointTickPriceModel.tickToPrice('10001')).toString()).to.eq("50050", "price should 50050");
        expect((await doublePointTickPriceModel.tickToPrice('65535')).toString()).to.eq("7675000000000000", "price should 50050");
    })

    it("#4 double point getPrice initialPower is 3", async function () {
        let [tester] = await ethers.getSigners();

        let doublePointTickPriceModelFactory = new DoublePointTickPriceModel__factory(tester);
        let doublePointTickPriceModel = await doublePointTickPriceModelFactory.deploy(1000, 3);
        expect((await doublePointTickPriceModel.tickToPrice('0')).toString()).to.eq("0", "price should 0");
        expect((await doublePointTickPriceModel.tickToPrice('10')).toString()).to.eq("10000", "price should 10000");
        expect((await doublePointTickPriceModel.tickToPrice('100')).toString()).to.eq("100000", "price should 100000");
        expect((await doublePointTickPriceModel.tickToPrice('101')).toString()).to.eq("101000", "price should 101000");
        expect((await doublePointTickPriceModel.tickToPrice('4999')).toString()).to.eq("4999000", "price should 4999000");
        expect((await doublePointTickPriceModel.tickToPrice('5000')).toString()).to.eq("5000000", "price should 5000000");
        expect((await doublePointTickPriceModel.tickToPrice('5001')).toString()).to.eq("5005000", "price should 5005000");
        expect((await doublePointTickPriceModel.tickToPrice('5999')).toString()).to.eq("9995000", "price should 9995000");
        expect((await doublePointTickPriceModel.tickToPrice('6000')).toString()).to.eq("10000000", "price should 10000000");
        expect((await doublePointTickPriceModel.tickToPrice('6001')).toString()).to.eq("10010000", "price should 10010000");
        expect((await doublePointTickPriceModel.tickToPrice('9999')).toString()).to.eq("49990000", "price should 49990000");
        expect((await doublePointTickPriceModel.tickToPrice('10000')).toString()).to.eq("50000000", "price should 50000000");
        expect((await doublePointTickPriceModel.tickToPrice('10001')).toString()).to.eq("50050000", "price should 50050000");
        expect((await doublePointTickPriceModel.tickToPrice('65535')).toString()).to.eq("7675000000000000000", "price should 50050");
    })

    it("#5 single prcie to tick", async function () {
        let [tester] = await ethers.getSigners();

        let singleTickPriceModelFactory = new SingleTickPriceModel__factory(tester);
        let singleTickPriceModel = await singleTickPriceModelFactory.deploy(100);
        expect((await singleTickPriceModel.priceToTick('0')).toString()).to.eq("0,0", "price should 0");
        expect((await singleTickPriceModel.priceToTick('10')).toString()).to.eq("10,10", "price should 10");
        expect((await singleTickPriceModel.priceToTick('100')).toString()).to.eq("100,100", "price should 100");
        expect((await singleTickPriceModel.priceToTick('101')).toString()).to.eq("101,101", "price should 101");
        expect((await singleTickPriceModel.priceToTick('999')).toString()).to.eq("999,999", "price should 999");
        expect((await singleTickPriceModel.priceToTick('1000')).toString()).to.eq("1000,1000", "price should 1000");
        expect((await singleTickPriceModel.priceToTick('1010')).toString()).to.eq("1001,1002", "price should 1010");
        expect((await singleTickPriceModel.priceToTick('9990')).toString()).to.eq("1899,1900", "price should 9990");
        expect((await singleTickPriceModel.priceToTick('10000')).toString()).to.eq("1900,1901", "price should 10000");
        expect((await singleTickPriceModel.priceToTick('10100')).toString()).to.eq("1901,1902", "price should 10100");
        expect((await singleTickPriceModel.priceToTick('10101')).toString()).to.eq("1901,1902", "price should 10100");
        expect((await singleTickPriceModel.priceToTick('10102')).toString()).to.eq("1901,1902", "price should 10100");
        expect((await singleTickPriceModel.priceToTick('1000000000000000000')).toString()).to.eq("14500,14501", "price should 1e18");
        expect((await singleTickPriceModel.priceToTick('3000000000000000000')).toString()).to.eq("14700,14701", "price should 3e18");
        expect((await singleTickPriceModel.priceToTick('6000000000000000000')).toString()).to.eq("15000,15001", "price should 6e18");
        expect((await singleTickPriceModel.priceToTick('60000000000000000000')).toString()).to.eq("15900,15901", "price should 6e18");
        expect((await singleTickPriceModel.priceToTick('60000000000000012345')).toString()).to.eq("15900,15901", "price should 6e18");
    })

    it("#6 double prcie to tick", async function () {
        let [tester] = await ethers.getSigners();

        let doublePointTickPriceModelFactory = new DoublePointTickPriceModel__factory(tester);
        let doublePointTickPriceModel = await doublePointTickPriceModelFactory.deploy(1000, 3);
        expect((await doublePointTickPriceModel.priceToTick('0')).toString()).to.eq("0,0", "tick should 0");
        expect((await doublePointTickPriceModel.priceToTick('10000')).toString()).to.eq("10,10", "tick should 10");
        expect((await doublePointTickPriceModel.priceToTick('100000')).toString()).to.eq("100,100", "tick should 100");
        expect((await doublePointTickPriceModel.priceToTick('101000')).toString()).to.eq("101,101", "tick should 101");
        expect((await doublePointTickPriceModel.priceToTick('4999000')).toString()).to.eq("4999,4999", "tick should 4999");
        expect((await doublePointTickPriceModel.priceToTick('5000000')).toString()).to.eq("5000,5000", "tick should 5000");
        expect((await doublePointTickPriceModel.priceToTick('5005000')).toString()).to.eq("5001,5001", "tick should 5001");
        expect((await doublePointTickPriceModel.priceToTick('9995000')).toString()).to.eq("5999,5999", "tick should 5999");
        expect((await doublePointTickPriceModel.priceToTick('10000000')).toString()).to.eq("6000,6000", "tick should 6000");
        expect((await doublePointTickPriceModel.priceToTick('10010000')).toString()).to.eq("6001,6002", "tick should 6002");
        expect((await doublePointTickPriceModel.priceToTick('49990000')).toString()).to.eq("9999,10000", "tick should 10000");
        expect((await doublePointTickPriceModel.priceToTick('50000000')).toString()).to.eq("10000,10001", "tick should 10001");
        expect((await doublePointTickPriceModel.priceToTick('50050000')).toString()).to.eq("10001,10002", "tick should 10002");
        expect((await doublePointTickPriceModel.priceToTick('7675000000000000000')).toString()).to.eq("65535,65535", "tick should 65535");
    })
});