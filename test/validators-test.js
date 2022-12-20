const {expect} = require("chai");
const hre = require("hardhat");
const convert = require('ethereum-unit-converter')
const {BigNumber} = require("ethers");
const util = require('web3-utils')
const web3 = require('web3')

const zeroAddress = '0x0000000000000000000000000000000000000000'
const publicKeyHex = "0x0491de396ce580733f02a8c67591e136e42143c35d106ed3f0e8878fbf16e0999e322e237c5a35156c2b4e2e6790a6a9cc29e109d3551224985e0ec951a2f4dad7"
const publicKeyBytes = util.hexToBytes(publicKeyHex)

const blsPub1 = "0362bff51633089a418fd7bf2304c981c995bd044a7f0a0e8d40ba49e37fb68105ca09c74ccac2b8d232a09afeb189c758534b3794f5e16596cacac7f62305be1823ee9edf1be110747f0e7f30760a0303b514a7f0661d1aec09ebed4b7b67a12cc1cb44e5c73759be416079973234981e2a58440dc5f770e4b5e5981f27bf3f"
const blsG1Pub1 = "011391c9a43ae1877de16949136e5a6779b46db81b0ee7397b509b64cda284c410f7dd768152830301ed778cb58efab6424284bca5271c006452b145cca76365"
const blsProof1 = "13e9e8115f1986824fcbefe4d944d53508786126a277ce9f4a4bf54ab93a35552d572c55b3083ee76791f1b24e2689e7e09d08a5ce833e9e93e67fdab2d97213"
const publicKey1 = "043255458e24278e31d5940f304b16300fdff3f6efd3e2a030b5818310ac67af45e28d057e6a332d07e0c5ab09d6947fd4eed1a646edbf224e2d2fec6f49f90abc"

const blsPub2 = "274ffc451044eb62cfd9d83bc745e2276b248858e8b1e8b5a477dbb6ab2377040ddb72781a5ccd2b875211495e9cf5428799430d7744d45de1793b5217e308a02f2aea650a93bf20f745b960331470bf3f75c764f95013daffdfa1b4ac6c442823ab50f83f52ffcb8f711b690c81ea61050efa5450b30ca4c673d47b5845e5e1"
const blsG1Pub2 = "2ca28f7f8c57f5d5955d2d306979794c3180399f56cbc4b2faed60e4c77210a70fbd826f4545bc5b94a92e0487003b6b17161618b2bb9b7fd251eecb90fbbaef"
const blsProof2 = "1dc08f7faa06072c96bceec68746168d599021a6fcf6fae605e1c412bb9737892b3ef2d32b0be7860ef0d80de6868bd6af1114313e1eae980b8a310cdc2f5692"
const publicKey2 = "040bb316cf4dbaeff8df7c6a8f3c55a11c72f7f2f8d79c274f27cdce2220f36371279e4fa6f5ecc92d799c79f30d3bb5913e906c06d7da20edd35dd61c4807052d"

const blsPub3 = "1e758021b775d2b0aa8acc8c94ebd1be28769f6f469490fa702bb8bddb7d99cd05ee3fc742fb0068e810ae77a72d2b5498dcba5b0bdc0618710f9a0e4425bf8521c23ffb73d81e0ebdfcd14a8618e78ac2bf188bcdd7e1a629afb120883c9f752b5841de50c38a63a33d6a1c491e8f4bfbd1ae5c62f23d831527cc465da89a59"
const blsG1Pub3 = "1fface6c61e3e95ff89d47c2cc2da6ce99e7452619eeeb24213d9f09d034be510ef3b134f092a0b3cde315a9ae795c26c824cda942e7d8e412d280f77b7768b7"
const blsProof3 = "0b50782abeba4c031b6c2a0f8a55ef9ffedc04d483fb1184d9f74bc98658a82c0ea126edfa9498a07ceaa6a01d2b88bcf1cd5b9c456633cb956eddf304c785fa"
const publicKey3 = "04e393c954d127d79d56b594a46df6b2e053f49446759eac612dbe12ade3095c679eeda1cafbff9d8fe17b8550d9d0d1fd71a2f5849b520c7bde795a3600b54616"

const blsPub4 = "18feb77e2a630167ab824409e077cf201aebf788b2f87fe32e29c5b0970382cc2f8c8182ad695ad0b04f77fd4c8c66044ed4a643409622c2716d096896a3c11f0ea9b3272eba683eb8b9ba83fd4dd50b06562d8dc77b6b45485d7f2857aca35f131f0c085b2ed92862e77aae3ab392d12a39f3119906130eaa5b1fe8d5210e82"
const blsG1Pub4 = "07f6e4c048b7fbea463fd032f2fbbbcf1a70c9182c3cba4afaed33b29a8a1ad8141ec2ccf9a5f7744f59687cb80eb5f8a53a9a708822fa0210645495989a8a03"
const blsProof4 = "096e4e97116a3d8677a888ce6da1057b6f37ca6e2a7843b441bd7982b18ee2b40196c4bba1c65a32e7f418b445b63c87363eb647721ed0b42e56c0ebd19c0198"
const publicKey4 = "04463e7db0f9c35ba7ae68a8098f1024019b90191281276eeef294acb3f1354b0acd69b0a35b569d08b5b45017078d2342120c335290857d95eb3621d1084622b6"

const DistributeEvent = "ValidatorAndVotersEpochPaymentDistributed(address,uint256,uint256)"

function hexToBytes(hex) {
    let start = 0
    if (hex.startsWith("0x")) {
        start = 2
    }
    let bytes = [];
    for (let c = start; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substring(c, c + 2), 16));
    }
    return bytes;
}

// describe("Greeter", function() {
//     let greeter;
//     beforeEach(async function () {
//         const Greeter = await ethers.getContractFactory("Greeter");
//         greeter = await Greeter.deploy("Hello, world!");
//         await greeter.deployed();
//     })
//
//     it("Should return the new greeting once it's changed", async function() {
//
//         expect(await greeter.greet()).to.equal("Hello, world!");
//
//         await greeter.setGreeting("Hola, mundo!");
//         expect(await greeter.greet()).to.equal("Hola, mundo!");
//     });
// });

describe("Validators", function () {
    let epochRewards, accounts, lockedGold, validators, election;

    beforeEach(async function () {
        console.log("============================================== Deploy Contract ==============================================")
        // deploy Libraries
        const AddressSortedLinkedList = await hre.ethers.getContractFactory("AddressSortedLinkedList");
        const addressSortedLinkedList = await AddressSortedLinkedList.deploy();
        console.log("AddressSortedLinkedList deployed to:", addressSortedLinkedList.address);

        const Signatures = await hre.ethers.getContractFactory("Signatures");
        const signatures = await Signatures.deploy();
        console.log("Signatures deployed to:", signatures.address);

        // deploy Registry contract
        const Registry = await hre.ethers.getContractFactory("Registry");
        const registry = await Registry.deploy(true);
        await registry.deployed();
        await registry.initialize();
        const registryAddress = registry.address;
        console.log("Registry deployed to: ", registry.address)

        // deploy GoldToken contract
        const GoldToken = await hre.ethers.getContractFactory("GoldToken");
        const goldToken = await GoldToken.deploy(true);
        await goldToken.deployed();
        await goldToken.initialize(registryAddress);
        console.log("GoldToken deployed to: ", goldToken.address)

        // deploy EpochRewards contract
        const EpochRewards = await hre.ethers.getContractFactory("EpochRewards");
        epochRewards = await EpochRewards.deploy(true);
        await epochRewards.deployed();

        const maxEpochPayment = "2500000000000000000000000"
        const communityRewardFraction = "0"
        const epochMaintainerPaymentFraction = "333333333333333333330000"
        const communityPartner = "0x0000000000000000000000000000000000000000"
        const mgrMaintainerAddress = "0x0000000000000000000000000000000000000001"
        await epochRewards.initialize(
            registryAddress,
            maxEpochPayment,
            communityRewardFraction,
            epochMaintainerPaymentFraction,
            communityPartner,
            mgrMaintainerAddress
        );
        console.log("EpochRewards deployed to: ", epochRewards.address)

        // deploy Accounts contract
        const Accounts = await hre.ethers.getContractFactory(
            "Accounts",
            {
                libraries: {
                    Signatures: signatures.address,
                }
            });
        accounts = await Accounts.deploy(true);
        await accounts.deployed();
        await accounts.initialize(registryAddress);
        console.log("Accounts deployed to: ", accounts.address)

        // deploy LockedGold contract
        const LockedGold = await hre.ethers.getContractFactory("LockedGold");
        lockedGold = await LockedGold.deploy(true);
        await lockedGold.deployed();
        await lockedGold.initialize(registryAddress, 1296000); // 15 day
        console.log("LockedGold deployed to: ", lockedGold.address)

        // deploy Validators contract
        const Validators = await hre.ethers.getContractFactory("Validators");
        validators = await Validators.deploy(true);
        await validators.deployed();
        console.log("Validators deployed to: ", validators.address)

        const validatorRequirementValue = BigNumber.from("1000000000000000000000000").toBigInt()
        const validatorRequirementDuration = 5184000
        const validatorScoreExponent = 10
        const validatorScoreAdjustmentSpeed = "200000000000000000000000"
        const slashingMultiplierResetPeriod = 2592000
        const commissionUpdateDelay = 51840
        const pledgeMultiplierInReward = "1000000000000000000000000"
        const downtimeGracePeriod = 0

        await validators.initialize(
            registryAddress,
            validatorRequirementValue,
            validatorRequirementDuration,
            validatorScoreExponent,
            validatorScoreAdjustmentSpeed,
            slashingMultiplierResetPeriod,
            commissionUpdateDelay,
            pledgeMultiplierInReward,
            downtimeGracePeriod,
        )

        // deploy Election contract
        const Election = await hre.ethers.getContractFactory(
            "Election",
            {
                libraries: {
                    AddressSortedLinkedList: addressSortedLinkedList.address,
                }
            },
        );
        election = await Election.deploy(true);
        await election.deployed();
        console.log("Election deployed to: ", election.address)

        const minElectableValidators = 1
        const maxElectableValidators = 100
        const maxNumValidatorsVotedFor = 10
        const electabilityThreshold = '1000000000000000000000'

        await election.initialize(
            registryAddress,
            minElectableValidators,
            maxElectableValidators,
            maxNumValidatorsVotedFor,
            electabilityThreshold
        )


        await registry.setAddressFor('GoldToken', goldToken.address);
        await registry.setAddressFor('EpochRewards', epochRewards.address);
        await registry.setAddressFor('Accounts', accounts.address);
        await registry.setAddressFor('LockedGold', lockedGold.address);
        await registry.setAddressFor('Election', election.address);
        await registry.setAddressFor('Validators', validators.address);

        const addr = await registry.registry('0x065b3511e672769036815d78dd1d8a43df1e790e38323f22c4aed211e85ea281')
        console.log("Accounts: ", addr)

        console.log("=============================================================================================================\n")
    })

    it("distribute epoch reward when the staking weight is 1", async function () {
        const signers = await hre.ethers.getSigners();
        const signer1 = signers[0]
        const signer2 = signers[1]
        const signer3 = signers[2]
        const signer4 = signers[3]
        // 41666_666666666666666875
        // 375000_000000000000001875
        const vals = [
            {
                signer: signer1,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub1,
                blsG1Pub: blsG1Pub1,
                blsProof: blsProof1,
                publicKey: publicKey1,
                score: "1000000000000000000000000",
                validatorRewards: "41666666666666666666875",
                votersRewards: "375000000000000000001875",
            }, {
                signer: signer2,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub2,
                blsG1Pub: blsG1Pub2,
                blsProof: blsProof2,
                publicKey: publicKey2,
                score: "1000000000000000000000000",
                validatorRewards: "41666666666666666666875",
                votersRewards: "375000000000000000001875"
            },
            {
                signer: signer3,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub3,
                blsG1Pub: blsG1Pub3,
                blsProof: blsProof3,
                publicKey: publicKey3,
                score: "1000000000000000000000000",
                validatorRewards: "41666666666666666666875",
                votersRewards: "375000000000000000001875"
            },
            {
                signer: signer4,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub4,
                blsG1Pub: blsG1Pub4,
                blsProof: blsProof4,
                publicKey: publicKey4,
                score: "1000000000000000000000000",
                validatorRewards: "41666666666666666666875",
                votersRewards: "375000000000000000001875"
            }
        ];

        await registerValidators(accounts, lockedGold, validators, election, vals)
        const validatorAndVoterTotalReward = await calculateTargetEpochRewards(epochRewards);
        const denominator = await calculateDenominator(validators, vals)
        await distributeEpochPaymentsFromSigner(validators, vals, validatorAndVoterTotalReward, denominator)
    });

    it("distribute epoch reward when the staking weight is 0.7", async function () {
        const signers = await hre.ethers.getSigners();
        const signer1 = signers[0]
        const signer2 = signers[1]
        const signer3 = signers[2]
        const signer4 = signers[3]
        const vals = [
            {
                signer: signer1,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub1,
                blsG1Pub: blsG1Pub1,
                blsProof: blsProof1,
                publicKey: publicKey1,
                score: "900000000000000000000000",
                validatorRewards: "39750000000000000000198",
                votersRewards: "401916666666666666668677",
            }, {
                signer: signer2,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub2,
                blsG1Pub: blsG1Pub2,
                blsProof: blsProof2,
                publicKey: publicKey2,
                score: "800000000000000000000000",
                validatorRewards: "33999999999973333333503",
                votersRewards: "390999999999693333335288"
            },
            {
                signer: signer3,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub3,
                blsG1Pub: blsG1Pub3,
                blsProof: blsProof3,
                publicKey: publicKey3,
                score: "700000000000000000000000",
                validatorRewards: "28583333333321666666809",
                votersRewards: "379749999999845000001899"
            },
            {
                signer: signer4,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub4,
                blsG1Pub: blsG1Pub4,
                blsProof: blsProof4,
                publicKey: publicKey4,
                score: "600000000000000000000000",
                validatorRewards: "23500000000000000000117",
                votersRewards: "368166666666666666668508"
            }
        ];

        await registerValidators(accounts, lockedGold, validators, election, vals)
        await validators.setPledgeMultiplierInReward("700000000000000000000000")
        const validatorAndVoterTotalReward = await calculateTargetEpochRewards(epochRewards);
        const denominator = await calculateDenominator(validators, vals)
        await distributeEpochPaymentsFromSigner(validators, vals, validatorAndVoterTotalReward, denominator)
    });

    it("distribute epoch reward when the staking weight is 0.6", async function () {
        const signers = await hre.ethers.getSigners();
        const signer1 = signers[0]
        const signer2 = signers[1]
        const signer3 = signers[2]
        const signer4 = signers[3]
        const vals = [
            {
                signer: signer1,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub1,
                blsG1Pub: blsG1Pub1,
                blsProof: blsProof1,
                publicKey: publicKey1,
                score: "900000000000000000000000",
                validatorRewards: "40500000000000000000202",
                votersRewards: "409500000000000000002048",
            }, {
                signer: signer2,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub2,
                blsG1Pub: blsG1Pub2,
                blsProof: blsProof2,
                publicKey: publicKey2,
                score: "800000000000000000000000",
                validatorRewards: "34222222222186666666837",
                votersRewards: "393555555555146666668635"
            },
            {
                signer: signer3,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub3,
                blsG1Pub: blsG1Pub3,
                blsProof: blsProof3,
                publicKey: publicKey3,
                score: "700000000000000000000000",
                validatorRewards: "28388888888873333333475",
                votersRewards: "377166666666460000001886"
            },
            {
                signer: signer4,
                amount: 1000000,
                commission: 100000,
                blsPub: blsPub4,
                blsG1Pub: blsG1Pub4,
                blsProof: blsProof4,
                publicKey: publicKey4,
                score: "600000000000000000000000",
                validatorRewards: "23000000000000000000115",
                votersRewards: "360333333333333333335135"
            }
        ];

        await registerValidators(accounts, lockedGold, validators, election, vals)
        await validators.setPledgeMultiplierInReward("600000000000000000000000")
        const validatorAndVoterTotalReward = await calculateTargetEpochRewards(epochRewards);
        const denominator = await calculateDenominator(validators, vals)
        await distributeEpochPaymentsFromSigner(validators, vals, validatorAndVoterTotalReward, denominator)
    });
});

async function registerValidators(accounts, lockedGold, validators, election, vals) {
    for (let i = 0; i < vals.length; i++) {
        const val = vals[i]
        const signer = val.signer
        const amount = convert(val.amount, "ether").wei
        const commission = val.commission
        const blsPub = val.blsPub
        const blsG1Pub = val.blsG1Pub
        const blsProof = val.blsProof
        const publicKey = val.publicKey
        const score = val.score

        console.log("============================================ Register Validators ============================================")
        await accounts.connect(signer).createAccount();
        console.log("created account, ", "address: ", signer.address);
        await accounts.connect(signer).setName(signer.address);
        console.log("set name, ", "address: ", signer.address);
        await accounts.connect(signer).setAccountDataEncryptionKey(publicKeyBytes);
        console.log("set account data encryption key, ", "address: ", signer.address);

        await lockedGold.connect(signer).lock({value: amount});
        console.log("locked map, ", "address: ", signer.address, "amount: ", amount);

        let lesser = zeroAddress
        let greater = zeroAddress
        if (i > 0) {
            greater = vals[i - 1].signer.address
        }
        const params = [hexToBytes(blsPub), hexToBytes(blsG1Pub), hexToBytes(blsProof), hexToBytes(publicKey).slice(1)]
        await validators.connect(signer).registerValidator(commission, lesser, greater, params);
        console.log("registered validator, ", "address: ", signer.address);

        await election.connect(signer).vote(signer.address, amount, lesser, greater);
        console.log("voted validator, ", "validator: ", signer.address, "votes: ", amount);

        await election.connect(signer).activate(signer.address)

        const totalActiveVotes = await election.getActiveVotes()
        const activeVotes = await election.getActiveVotesForValidator(signer.address)
        console.log("account: ", signer.address, "totalActiveVotes: ", totalActiveVotes, "activeVotes: ", activeVotes)

        const vs = await election.electValidatorSigners()
        console.log("elected validator: ", vs);

        const tx = await validators.setValidatorScore(signer.address, score);
        await tx.wait()

        const [, , , s] = await validators.getValidator(signer.address);
        console.log("updated validator score, ", "validator: ", signer.address, "score: ", s)
        console.log("=============================================================================================================\n")
    }
}

async function calculateDenominator(validators, vals) {
    const pledgeMultiplier = await validators.getPledgeMultiplierInReward()
    let sum = BigNumber.from(0);
    for (const val of vals) {
        sum = sum.add(BigNumber.from(val.score))
        sum = sum.add(pledgeMultiplier)
    }
    console.log("calculated denominator", "pledgeMultiplier: ", pledgeMultiplier, "sum: ", sum)
    return sum;
}

async function calculateTargetEpochRewards(epochRewards) {
    const [validatorAndVoterTotalReward, communityReward, maintainerReward] = await epochRewards.calculateTargetEpochRewards();
    console.log({validatorAndVoterTotalReward, communityReward, maintainerReward})
    return validatorAndVoterTotalReward
}

async function distributeEpochPaymentsFromSigner(validators, vals, maxPayment, denominator) {
    for (const val of vals) {
        let validatorAddress;
        const tx = await validators.distributeEpochPaymentsFromSigner(val.signer.address, maxPayment, denominator);
        const receipt = await tx.wait()
        for (const event of receipt.events) {
            if (event.topics[0] === hre.ethers.utils.id(DistributeEvent)) {
                validatorAddress = event.args.validator
                expect(event.args.validatorPayment).to.equal(val.validatorRewards)
                expect(event.args.votersPayment).to.equal(val.votersRewards)
            }
        }
        expect(validatorAddress).to.equal(val.signer.address)
    }
}

async function getLesserAndGreater(election) {
    const [validators, values] = await election.connect(signer).getTotalVotesForEligibleValidators()

    let voteTotals = [
        {
            Validator: validator,
            Value: amount,
        }
    ];
}
