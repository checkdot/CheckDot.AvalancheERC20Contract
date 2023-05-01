const hre = require("hardhat");

async function main() {
  const token = await (await ethers.getContractFactory("CheckDot"))
    .attach("0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE")

  await token.burn("102192000000000000000000");
  console.log(
    `CheckDot burn to ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});