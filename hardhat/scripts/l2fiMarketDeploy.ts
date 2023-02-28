const fs = require("fs");
import { ethers } from "hardhat";
import hre from "hardhat";
import { L2fiMarket__factory } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();

  // ----------------------file setting---------------------------------
  let readFileAddress = "../networks/" + hre.network.name + ".json";
  let writeFileAddress = "./networks/" + hre.network.name + ".json";

  const config = require(readFileAddress);
  // -------------------------deploy code----------------------------------

  let l2fiMarketFactory = new L2fiMarket__factory(deployer);
  let l2fiMarket = await l2fiMarketFactory.deploy();
  config.L2FI_MARKET_OPTION1_CONTRACT = l2fiMarket.address;

  // ---------------------------write file-------------------------------
  console.log("write file: ", JSON.stringify(config, null, 1));
  fs.writeFileSync(writeFileAddress, JSON.stringify(config, null, 1));
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
