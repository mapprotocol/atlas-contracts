# atlas-contracts

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# deployment governance contract steps

### 1. deploy proxy contract

```shell
npx hardhat run --network [Network Name] scripts/deploy_proxy.js
```

### 2. deploy governance contract

```shell
npx hardhat run --network [Network Name] scripts/deploy_governance.js
```

### 3. sets the address of the implementation contract

Set the implementation contract address of the proxy contract deployed in the first step to the address of the
governance contract deployed in the second step

Stage:

1. Proposal
2. Approval
3. Referendum
4. Execution

Operation:

1. propose
2. upvote
3. approve

```

                   upvote         approve           vote
                      |              |                |
propose —— Proposal ----> Approval ----> Referendum ----> Execution
               |               |              |                |
               |               |              |                |
               |               ---------------------------------
               |                              |
            enqueue                        dequeue 
 
```