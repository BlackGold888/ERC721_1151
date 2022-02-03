import { task } from "hardhat/config";
import { Contract, ContractFactory, ContractReceipt } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import "@nomiclabs/hardhat-waffle";
import { HardhatRuntimeEnvironment } from "hardhat/types";

async function getContractInstance(hre: HardhatRuntimeEnvironment) : Promise<Contract>{
    let Token: ContractFactory;
    let hardhatToken: Contract;
    Token = await hre.ethers.getContractFactory("BLACKGOLD");
    hardhatToken = await Token.deploy();
    return hardhatToken;
}

task("approve", "Approve an account's balance")
  .addParam("account", "Approve an account's balance")
  .setAction(async (taskArgs, hre) => {
    const hardhatToken = await getContractInstance(hre);
    await hardhatToken.safeMint(taskArgs.account);
    console.log(`Minted address ${await hardhatToken.ownerOf(1)}`);
});