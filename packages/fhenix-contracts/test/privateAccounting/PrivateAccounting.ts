import { createPermitForContract } from "../../utils/instance";
import type { Signers } from "../types";
import { shouldBehaveLikePrivateAccounting } from "./PrivateAccounting.behavior";
import { deployCounterFixture, getTokensFromFaucet } from "./PrivateAccounting.fixture";
import hre from "hardhat";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    // get tokens from faucet if we're on localfhenix and don't have a balance
    await getTokensFromFaucet();

    const { privateAccounting, address } = await deployCounterFixture();
    this.privateAccounting = privateAccounting;

    // initiate fhenixjs
    this.permission = await createPermitForContract(hre, address);
    this.fhenixjs = hre.fhenixjs;

    // set admin account/signer
    const signers = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user = signers[1];
  });

  describe("Counter", function () {
    shouldBehaveLikePrivateAccounting();
  });
});
