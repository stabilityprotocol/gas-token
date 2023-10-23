import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Lock", function () {
  const MEANINGLESS_ADDRESS = "0x55900d17057534d097f5b0dd538105f8f088af82";
  describe("Blockable Transfers", function () {
    it("Token transfers should be blockable", async function () {
      const token = await hre.viem.deployContract("StabilityGasToken", []);

      await token.write.updateBlockTransfers([true]);

      await expect(
        token.write.transfer([MEANINGLESS_ADDRESS, BigInt(0)])
      ).to.be.rejectedWith("StabilityGasToken: Transfers are blocked");

      await expect(
        token.write.transferFrom([
          MEANINGLESS_ADDRESS,
          MEANINGLESS_ADDRESS,
          BigInt(0),
        ])
      ).to.be.rejectedWith("StabilityGasToken: Transfers are blocked");
    });

    it("Only owner can update blockable transfers", async function () {
      const token = await hre.viem.deployContract("StabilityGasToken", []);

      const wallet = await hre.viem.getWalletClients();

      await expect(
        token.write.updateBlockTransfers([true], {
          account: wallet[1].account,
        })
      ).to.be.rejectedWith("Ownable: caller is not the owner");
    });
  });
});
