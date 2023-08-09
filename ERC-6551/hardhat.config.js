require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
const {optimismKey,privateKey}=require("./secrets.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    buildbear: {
      url:" https://rpc.buildbear.io/major-ackbar-81b26cca"
       //rpc Url from BuildBear Dashboard
    },
    opgoerli:{
      url:"https://opt-goerli.g.alchemy.com/v2/"+optimismKey,
      accounts:[privateKey],
      // path:"m/44'/60'/0'/0/0",
      gasPrice:10000000000
    },
    zoragoerli: {
      url: 'https://testnet.rpc.zora.energy/',
      accounts: [privateKey],
      gasPrice:10000000000
    },
    base:{
      url:"https://goerli.base.org/",
      accounts:[privateKey],
      gasPrice:10000000000

    }
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 10317,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/major-ackbar-81b26cca",
          browserURL: "https://explorer.buildbear.io/major-ackbar-81b26cca",
        },
      },
    ],
  },
};
