import type { PrivateAccounting } from "../../types";
import axios from "axios";
import hre from "hardhat";

export async function deployCounterFixture(): Promise<{
  privateAccounting: PrivateAccounting;
  address: string;
}> {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const PrivateAccounting = await hre.ethers.getContractFactory("PrivateAccounting");
  const privateAccounting = await PrivateAccounting.connect(contractOwner).deploy();
  await privateAccounting.waitForDeployment();
  const address = await privateAccounting.getAddress();
  return { privateAccounting, address };
}

export async function getTokensFromFaucet() {
  if (hre.network.name === "localfhenix") {
    const signers = await hre.ethers.getSigners();

    if (
      (await hre.ethers.provider.getBalance(signers[0].address)).toString() ===
      "0"
    ) {
      await hre.fhenixjs.getFunds(signers[0].address);
    }
  }
}
