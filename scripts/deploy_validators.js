const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address,
        "balance:",
        (await deployer.getBalance()).toString()
    );

    const Validators = await hre.ethers.getContractFactory("Validators");
    const validators = await Validators.deploy(true);
    await validators.deployed();
    console.log("Validators deployed to: ", validators.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
