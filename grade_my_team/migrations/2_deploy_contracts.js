var Grading = artifacts.require("./Grading.sol");

module.exports = function(deployer) {
  deployer.deploy(Grading);
};