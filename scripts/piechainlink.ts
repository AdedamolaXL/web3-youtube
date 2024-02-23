import { ethers } from "hardhat";

// We require the Hardhat runtime environment explicity above. This is optional but useful for running the script in a standalone fashion through `node <script>`

// When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

async function main() {
  // Hardhat always runs the compile task when running scripts with its command line interface.

  const pieTokenAddress = '0x44d52D9F508F6F6378b9e9bbC74cEB4f394CbC32';
  const routerAddress = '0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0';


  // If this script is run directly using `node` you may want to compile manually to make sure everything is compiled manually
  const PieChainlink = await ethers.getContractFactory("PieChainlink");
  const piechainlink = await PieChainlink.deploy(routerAddress, pieTokenAddress);

  await piechainlink.waitForDeployment();

  console.log(`Piechainlink deployed to ${piechainlink.target}`);
}

  // We recommend this pattern to be able to use async/await everywhere and properly handle erros
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});