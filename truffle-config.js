const path = require("path");

module.exports = {
  // Directory for compiled contracts
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  // Compiler settings
  compilers: {
    solc: {
      version: "0.5.17", // Matches your pragma range
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  // Single Ganache network
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337", // Ganache default
      gas: 6721975,      // Ganache block gas limit
      gasPrice: 20000000000, // 20 Gwei
    },
  },

  // Optional Mocha settings
  mocha: {
    timeout: 10000,
  },
};