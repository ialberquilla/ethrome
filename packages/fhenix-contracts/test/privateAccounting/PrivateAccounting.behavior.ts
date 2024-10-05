import { expect, assert } from "chai";
import hre from "hardhat";

export function shouldBehaveLikePrivateAccounting(): void {
  it("should add a payment and allow payments smaller than the balance", async function () {

    const amountToPay = 10;

    const user = this.signers.user;

    const eAmountPayment = await this.fhenixjs.encrypt_uint32(
      amountToPay,
    );

    console.log({eAmountPayment})

    await this.privateAccounting.connect(this.signers.admin).addPayment(user, eAmountPayment);


    const amountNotAllowed  = 5;

    const eAmountPaymentNotAllowed = await this.fhenixjs.encrypt_uint32(
      amountNotAllowed,
    );

    await this.privateAccounting.connect(this.signers.admin).processPayment(user, eAmountPaymentNotAllowed);

  });
}
