require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");

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
            allowUnlimitedContractSize: true,
            accounts: {
                accountsBalance: "100000000000000000000000000"
            }
        },
        localhost: {
            url: 'http://127.0.0.1:8545',
            accounts: [
                '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6',
                '0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897',
                '0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82',
                '0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1'
            ]
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