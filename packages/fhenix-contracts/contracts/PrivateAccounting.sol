pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";

contract PrivateAccounting  {

  mapping(address => euint32) internal _balances;
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function addPayment(address user, inEuint32 calldata encryptedValue) public {
    euint32 value = FHE.asEuint32(encryptedValue);
    _balances[user] = _balances[user] + value;
  }

  function processPayment(address user, inEuint32 calldata encryptedValue) public {
    euint32 value = FHE.asEuint32(encryptedValue);
    ebool isHigher = _balances[user].gt(value);
    require(FHE.decrypt(isHigher), "Insufficient balance");
    _balances[user] = _balances[user] - value;
  }

}