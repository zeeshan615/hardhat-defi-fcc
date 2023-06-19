const { version } = require("chai")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
	solidity: {
		compilers: [
			{ version: "0.8.7" },
			{ version: "0.8.7" },
			{ version: "0.4.19" },
			{ version: "0.6.12" },
		],
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 31337,
			forking: {
				url: MAINNET_RPC_URL,
			},
		},
		localhost: {
			chainId: 31337,
		},
		goerli: {
			chainId: 5,
			blockConfirmations: 6,
			url: GOERLI_RPC_URL,
			accounts: [PRIVATE_KEY],
		},
		sepolia: {
			chainId: 11155111,
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			blockConfirmations: 5,
			allowUnlimitedContractSize: true,
			saveDeployments: true,
		},
	},
	namedAccounts: {
		deployer: {
			default: 0,
			1: 0,
		},
		player: {
			default: 1,
		},
	},
	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			goerli: ETHERSCAN_API_KEY,
			sepolia: ETHERSCAN_API_KEY,
		},
		gasReporter: {
			enabled: false,
			currency: "USD",
			outputFile: "gas-report.text",
			noColors: true,
		},
	},
	mocha: {
		timeout: 800000, //800 seconds
	},
}
