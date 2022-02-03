import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { Contract, ContractFactory, ContractReceipt } from "ethers";
import { ethers } from "hardhat";

describe("ERC721", function () {
  let Token: ContractFactory;
  let hardhatToken: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("BLACKGOLD");
    [owner, addr1, addr2] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  it("BalanceOf return token counts", async function () {
      await hardhatToken.safeMint(owner.address);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(1);
  });

  it("getApproved return approved address for token Id", async function () {
    await hardhatToken.safeMint(owner.address);
    await hardhatToken.approve(addr1.address, 1);
    expect(await hardhatToken.getApproved(1)).to.equal(addr1.address);
  });
  
  it("getApprovalFroAll return approved address operator status true", async function () {
    await hardhatToken.setApprovalForAll(addr1.address, true);
    expect(await hardhatToken.isApprovedForAll(owner.address, addr1.address)).to.equal(true);
  });
  
  it("getApprovalFroAll return approved address operator status false", async function () {
    expect(await hardhatToken.isApprovedForAll(owner.address, addr1.address)).to.equal(false);
  });
  
  it("Get Token name", async function () {
    expect(await hardhatToken.name()).to.equal("BLACKGOLDTOKEN");
  });
  
  it("Get Token Owner", async function () {
    expect(await hardhatToken.owner()).to.equal(owner.address);
  });

  it("Get Token symbol", async function () {
    expect(await hardhatToken.symbol()).to.equal("BGT");
  });
  
  it("Get Token OwnerOf", async function () {
    await hardhatToken.safeMint(addr1.address);
    expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);
  });

  it("Get Token tokenURI", async function () {
    await hardhatToken.safeMint(addr1.address);
    expect(await hardhatToken.tokenURI(1)).to.equal('https://ipfs.io/ipfs/QmWvLf8u1Vsd4TFLM289m3SxCwFNcc6NT7wYA3MbP1EjqK?filename=metadata.json1');
  });

  it("Transfer From", async function () {
    await hardhatToken.safeMint(owner.address);
    await hardhatToken.transferFrom(owner.address, addr1.address, 1);
    expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);
  });
  
  it("Set new Owner", async function () {
    await hardhatToken.transferOwnership(addr1.address);
    expect(await hardhatToken.owner()).to.equal(addr1.address);
  });

});
