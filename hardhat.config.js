require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.5.13",
                settings: {
                    evmVersion: "istanbul",
                    optimizer: {
                        enabled: true,
                        runs: 1,
                    },
                }
            },
            {
                version: "0.8.17"
            }
        ]
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true
        },
        localhost: {
            url: 'http://127.0.0.1:7445',
            accounts: ['879c29fc7d2d889ccb2f45b9b399dea892a89f8b3c77d024ed053d2ac833b734']
        },
        map_dev: {
            url: 'http://3.0.19.66:7445',
            accounts: ['879c29fc7d2d889ccb2f45b9b399dea892a89f8b3c77d024ed053d2ac833b734']
        },
        map_test: {
            url: 'http://18.142.54.137:7445',
            accounts: ['0x879c29fc7d2d889ccb2f45b9b399dea892a89f8b3c77d024ed053d2ac833b734']
        },
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
        disambiguatePaths: false,
    }
};