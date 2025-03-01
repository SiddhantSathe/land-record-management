// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
//   networks: {
//     ganache: {
//       chainId: 1337,
//     },
//   },
// };


require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    // hardhat: {
    //   chainId: 1337
    // },
    // Using Ganache
    ganache: {
      url: "http://127.0.0.1:7545",  // Ganache local blockchain URL
      accounts: {
        mnemonic: process.env.MNEMONIC  // You can set a mnemonic in your .env file
      },
      gasPrice: 20000000000,  // Adjust gas price if needed
    },
  }
};
