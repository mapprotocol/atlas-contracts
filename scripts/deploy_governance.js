const hre = require("hardhat");

async function main() {
    const constructorArgs = [true]
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address,
        "balance:",
        (await deployer.getBalance()).toString()
    );

    // deploy Proposals contract
    const Proposals = await hre.ethers.getContractFactory("Proposals");
    const proposals = await Proposals.deploy();
    console.log("Proposals contract address:", proposals.address);

    // deploy IntegerSortedLinkedList contract
    const IntegerSortedLinkedList = await hre.ethers.getContractFactory("IntegerSortedLinkedList");
    const integerSortedLinkedList = await IntegerSortedLinkedList.deploy();
    console.log("IntegerSortedLinkedList contract address:", integerSortedLinkedList.address);

    // deploy Governance contract
    const Governance = await hre.ethers.getContractFactory(
        "Governance",
        {
            libraries: {
                Proposals: proposals.address,
                IntegerSortedLinkedList: integerSortedLinkedList.address,
            }
        },
    );
    const governance = await Governance.deploy(...constructorArgs, {gasLimit: "20000000"});
    // const governance = await Governance.deploy(...constructorArgs);
    console.log("Governance contract address:", governance.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
