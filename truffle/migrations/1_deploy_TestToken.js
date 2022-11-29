var TestToken = artifacts.require("TestToken.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestToken);
};