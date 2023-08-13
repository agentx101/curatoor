const {privateKey,AlchemyKey,OptimsimKey}=require("./secrets.json");
const bridgeApi=require("./abi/bridge.json");
const hre = require("hardhat");
const { ethers } = require('hardhat');
async function main() {
    const Newsigner = await hre.ethers.provider.getSigner();
    console.log("signing done");
    const bridgeContract=new ethers.Contract("",
    bridgeApi,signer);

}
