//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";


contract PaymentManager {

    event paymentSent(address user, bytes amount);

	function addPayment(
		address user,
		bytes calldata amount
	) public {

        emit paymentSent(user, amount);
    }
}
