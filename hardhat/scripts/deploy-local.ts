import { MaxUint128 } from "./shared/constants";

const fs = require("fs");
import { ethers } from "hardhat";
import hre from "hardhat";
import {
  L2fiMarket,
  L2fiMarketRouter,
  FeeCollector,
  MockOldERC20,
  MockERC1155,
  SingleTickPriceModel,
  TestHelper,
} from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // ----------------------file setting---------------------------------
  let readFileAddress = "../networks/" + hre.network.name + ".json";
  let writeFileAddress = "./networks/" + hre.network.name + ".json";

  const config = require(readFileAddress);
  // -------------------------deploy code----------------------------------

  const MockERC1155Factory = await ethers.getContractFactory("MockERC1155");
  const MockERC20Factory = await ethers.getContractFactory("MockOldERC20");
  const routerFactory = await ethers.getContractFactory("L2fiMarketRouter");
  const feeCollectorFactory = await ethers.getContractFactory("FeeCollector");
  const marketFactory = await ethers.getContractFactory("L2fiMarket");
  const SingleTickPriceModelFactory = await ethers.getContractFactory(
    "SingleTickPriceModel"
  );
  const testHelperFactory = await ethers.getContractFactory("TestHelper");

  const options = (await MockERC1155Factory.deploy()) as MockERC1155;
  const usdc = (await MockERC20Factory.deploy(
    "mockUSDC",
    "usdc",
    "6"
  )) as MockOldERC20;
  const router = (await routerFactory.deploy()) as L2fiMarketRouter;
  const feeCollector = (await feeCollectorFactory.deploy()) as FeeCollector;
  const tickPriceModel = (await SingleTickPriceModelFactory.deploy(
    100
  )) as SingleTickPriceModel;
  const market = (await marketFactory.deploy()) as L2fiMarket;
  const helper = (await testHelperFactory.deploy()) as TestHelper;

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
    1,
    usdc.address,
    router.address,
    feeCollector.address,
    tickPriceModel.address,
    100,
    currentTime,
    currentTime + 1000000,
    10000
  );

  config.ADMIN = deployer.address;
  config.L2FI_OPTION1_MARKET = market.address;
  config.L2FI_MARKET_ROUTER = router.address;
  config.L2FI_FEE_COLLECTOR = feeCollector.address;
  config.TEST_HELPER = helper.address;
  config.USDC = usdc.address;
  config.OPTION_CONTRACT = options.address;

  // ---------------------------write file-------------------------------
  fs.writeFileSync(writeFileAddress, JSON.stringify(config, null, 1));
  console.log("write file: ", JSON.stringify(config, null, 1));
  console.log("option contract address: ", options.address);
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
