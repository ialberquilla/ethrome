//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PaymentManager {
	address public owner;
	address public token;

	// constructor(address _token) {
	// 	owner = msg.sender;
	// 	token = _token;
	// }

    event paymentSent(address user, bytes amount);

	function addPayment(
		address user,
		bytes calldata amount
	) public {
		// ERC20(token).transfer(user, amount);
        emit paymentSent(user, amount);
    }
}
