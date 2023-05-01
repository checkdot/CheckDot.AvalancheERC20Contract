/** @type import('hardhat/config').HardhatUserConfig */
var secret = require("./secret");
require("@nomiclabs/hardhat-ethers");
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');

module.exports = {
  etherscan: {
    apiKey: {
      polygon: secret.POLYGON_SCAN_KEY,
      avalanche: secret.SNOWTRACE_KEY,
      opera: secret.FTM_SCAN_KEY
    }
  },
  networks: {
    polygon: {
      // truffle deploy --network polygon
      url: `https://rpc-mainnet.maticvigil.com`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://api.polygonscan.com'
        }
      }
    },
    avalanche: {
      // truffle deploy --network avax
      url: `https://api.avax.network/ext/bc/C/rpc`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://api.snowtrace.io'
        }
      }
    },
    opera: {
      // truffle deploy --network fantom
      url: `https://rpc.ankr.com/fantom`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://api.ftmscan.com'
        }
      }
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

