import { ethers } from "hardhat";

async function main() {
    
    const PieToken = await ethers.getContractFactory("PieToken");
    const pieToken = await PieToken.deploy("PieToken", "PT");

    await pieToken.waitForDeployment();

    console.log("PieToken deployed to:", pieToken.target);

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });