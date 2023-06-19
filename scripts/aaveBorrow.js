const { ethers, getNamedAccounts, network } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth.js")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
	await getWeth()
	const { deployer } = await getNamedAccounts()

	const lendingPool = await getLendingPool(deployer)
	console.log(`lending pool address = ${lendingPool.address}`)
}

async function getLendingPool(account) {
	const lendingPoolAddressesProvider = await ethers.getContractAt(
		"ILendingPoolAddressesProvider",
		networkConfig[network.config.chainId].lendingPoolAddressesProvider,
		account
	)
	const lendingPoolAddress =
		await lendingPoolAddressesProvider.getLendingPool()
	const lendingPool = await ethers.getContractAt(
		"ILendingPool",
		lendingPoolAddress,
		account
	)
	return lendingPool
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
