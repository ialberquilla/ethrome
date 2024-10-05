pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";

contract PrivateAccounting {
  mapping(address => euint32) internal _balances;
  address public owner;
  address public paymentManager;
  uint256 public counter;
  mapping(uint256 => uint256) public paymentAmount;

  modifier onlyPaymentManager() {
    require(
      msg.sender == paymentManager,
      "Only payment manager can call this function"
    );
    _;
  }

  constructor(address paymentManager) {
    owner = msg.sender;
    paymentManager = paymentManager;
  }

  function addPayment(
    address user,
    inEuint32 calldata encryptedValue
  ) public onlyPaymentManager {
    euint32 value = FHE.asEuint32(encryptedValue);
    _balances[user] = _balances[user] + value;
  }

  function processPayment(
    address user,
    inEuint32 calldata encryptedValue
  ) public onlyPaymentManager {
    euint32 value = FHE.asEuint32(encryptedValue);
    FHE.req(FHE.gt(_balances[user], value));
    _balances[user] = _balances[user] - value;
  }

  function getCounterPermitSealed(
    Permission memory permission,
    uint256 paymentId
  ) public view onlySender(permission) returns (string memory) {
    return FHE.decrypt(paymentAmount[paymentId]);
  }
}
