// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //We get the contract to deploy
  // const BlackGold = await ethers.getContractFactory("BLACKGOLDTOKEN");
  // const blackgold = await BlackGold.deploy();

  // await blackgold.deployed();

  // console.log("BLACKGOLDTOKEN deployed to:", blackgold.address);

  const BlackGold1155 = await ethers.getContractFactory("BLACKGOLD1155");
  const blackgold1155 = await BlackGold1155.deploy();

  await blackgold1155.deployed();

  console.log("BLACKGOLDTOKEN1155 deployed to:", blackgold1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
