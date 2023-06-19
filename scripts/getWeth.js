const { ethers, getNamedAccounts, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const AMOUNT = ethers.utils.parseEther("0.1")

async function getWeth() {
	const { deployer } = await getNamedAccounts()
	const iWeth = await ethers.getContractAt(
		"IWeth",
		"0xdd13E55209Fd76AfE204dBda4007C227904f0a81",
		deployer
	)

	const txResponse = await iWeth.deposit({
		value: AMOUNT,
	})
	await txResponse.wait(1)

	const wethBalance = await iWeth.balanceOf(deployer)
	console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
