import { ethers } from "hardhat";

async function main() {
    
    // Deploying contract
    const PieLocked = await ethers.getContractFactory("PieLocked");
    const pielocked = await PieLocked.deploy();

    await pielocked.waitForDeployment();

    console.log(`pielocked deployed to target ${pielocked.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});