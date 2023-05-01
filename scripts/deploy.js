const hre = require("hardhat");

async function main() {
  const owner = "0x961a14bEaBd590229B1c68A21d7068c8233C8542";

  const CheckDotContract = await hre.ethers.getContractFactory("CheckDot");
  const checkdot = await CheckDotContract.deploy(owner);

  await checkdot.deployed();

  console.log(
    `CheckDot deployed to ${checkdot.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});