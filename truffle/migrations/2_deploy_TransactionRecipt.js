var TransactionReciept = artifacts.require("TransactionReciept.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TransactionReciept);
};