import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { BigNumber, Contract, ContractFactory, ContractReceipt } from "ethers";
import { ethers } from "hardhat";

describe("ERC1151", function () {
  let Token: ContractFactory;
  let hardhatToken: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("BLACKGOLD1155");
    [owner, addr1, addr2] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

    it("Mint token", async function () {
        await hardhatToken.mint(owner.address, 1, 100, 888);
        expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(100);
    });

    it("Burn token", async function () {
        await hardhatToken.mint(owner.address, 1, 100, 888);
        await hardhatToken.burn(owner.address, 1, 50);
        expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(50);
    });
    
    it("Mint Batch token", async function () {
        await hardhatToken.mintBatch(owner.address, [1, 2, 3], [100, 200, 300], 123);
        expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(100);
        expect(await hardhatToken.balanceOf(owner.address, 2)).to.equal(200);
        expect(await hardhatToken.balanceOf(owner.address, 3)).to.equal(300);
    });

    it("Burn Batch token", async function () {
        await hardhatToken.mintBatch(owner.address, [1, 2, 3], [100, 200, 300], 123);
        await hardhatToken.burnBatch(owner.address, [1, 2, 3], [10, 20, 30]);
        expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(90);
        expect(await hardhatToken.balanceOf(owner.address, 2)).to.equal(180);
        expect(await hardhatToken.balanceOf(owner.address, 3)).to.equal(270);
    });
});
