const hre = require("hardhat");
const { ethers } = require('hardhat');
// importing the json file from ../deployments/buildbear/MainContract.json
async function main(){
    const [deployer, account2] = await hre.ethers.getSigners();
    const sendEth = await deployer.sendTransaction({
        to: "0xce156c5071B84a924d7d789C088F59ed3f8BaB15",
        value: ethers.utils.parseEther("0.001")
    });
    console.log(sendEth);


}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
