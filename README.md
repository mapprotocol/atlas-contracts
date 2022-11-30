# atlas-contracts

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```



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