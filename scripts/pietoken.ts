import { ethers } from "hardhat";

async function main() {

    const lockedAddress = '0xadcD6d3A79545cf3765FfD8a6E217e4351c49bCF';
    
    const PieToken = await ethers.getContractFactory("PieToken");
    const pieToken = await PieToken.deploy("PieToken", "PT", lockedAddress);

    await pieToken.waitForDeployment();

    console.log("PieToken deployed to:", pieToken.target);

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });