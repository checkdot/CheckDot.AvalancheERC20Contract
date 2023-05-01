const hre = require("hardhat");

async function main() {
  const token = await (await ethers.getContractFactory("CheckDot"))
    .attach("0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE");

  const spender = "0x1dCF92BfA88082d1c5FE57e93df21Aa82396CF5a";
  await token.approve(spender, "9897808000000000000000000");

  console.log(
    `CheckDot approve ${spender} to ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});