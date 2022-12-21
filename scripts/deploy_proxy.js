const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address,
        "balance:",
        (await deployer.getBalance()).toString()
    );

    const Proxy = await hre.ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();
    console.log("Proxy contract address:", proxy.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
