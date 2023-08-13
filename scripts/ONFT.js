const {AlchemyKey,privateKey,optimismKey} =require("./secrets.json") ;

const proxyABI=require("./ABI/proxyABI.json");
const ONFTopABI=require("./ABI/ONFTopABI.json");
const { MaxUint256 } = require("ethers");
// const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
task("setRemoteGoerli","connect with other cahins")
.addParam("account","account to recieve")
.addParam("destinationchainid","chain id of destination")
.setAction(async(taskArgs)=>{
    const signer = await ethers.provider.getSigner() ;
    console.log("signer Created",signer);
    const proxyContract=new ethers.Contract("0xa6d23a8aa0b3e7f58c5ac12f41fe2262f7a242d5",
    proxyABI,signer);
    console.log("contract created");
    try{
        const trustResult = await proxyContract.setTrustedRemoteAddress(
          taskArgs.destinationchainid,
          taskArgs.account //setting destination chain as trusted remote 
        );
        
        const receipt =await trustResult.wait()
        // const token=await proxyContract.token();
        console.log(receipt);
      }
      catch(e){
        console.log("error",e);
      }
})

task("setRemoteOp","connect with other chains")
.addParam("account","account to recieve")
.addParam("destinationchainid","chain id of destination")
.setAction(async(taskArgs)=>{
  console.log(ethers.provider)
    const signer = await ethers.provider.getSigner() ;
    console.log("signer Created",signer);
    const proxyContract=new ethers.Contract("0x1CE50cFe9f3BE2c06bE35F38Ffd1eBd0dDFE1B85",
    ONFTopABI,signer);
    try{
        const trustResult = await proxyContract.setTrustedRemoteAddress(
          taskArgs.destinationchainid,
          taskArgs.account //setting destination chain as trusted remote 
        );
        
        // const receipt =await trustResult.wait()
        const token=await proxyContract.symbol();

        console.log(token);
      }
      catch(e){
        console.log("error",e);
      }
});

task("setGasGoerli","connect with other cahins")
.addParam("destinationchainid","chain id of destination")
.setAction(async(taskArgs)=>{
    const signer = await ethers.provider.getSigner() ;
    console.log("signer Created",signer);
    const proxyContract=new ethers.Contract("0xa6d23a8aa0b3e7f58c5ac12f41fe2262f7a242d5",
    proxyABI,signer);
    console.log("contract created");
    // MaxUint256 ser= 60000000000000000;
    try{
        const trustResult = await proxyContract.setMinDstGas (
          taskArgs.destinationchainid,
        1,
          "600000000000000000" //setting gas
        );
        
        // const receipt =await trustResult.wait()
        // const token=await proxyContract.token();
        // console.log(receipt);
      }
      catch(e){
        console.log("error",e);
      }
})

task("setGasOp","connect with other chains")
.addParam("destinationchainid","chain id of destination")
.setAction(async(taskArgs)=>{
  console.log(ethers.provider)
    const signer = await ethers.provider.getSigner() ;
    console.log("signer Created",signer);
    const proxyContract=new ethers.Contract("0x1CE50cFe9f3BE2c06bE35F38Ffd1eBd0dDFE1B85",
    ONFTopABI,signer);
    try{
        const trustResult = await proxyContract.setMinDstGas(
          taskArgs.destinationchainid,
          1,
          "600000000000000000" 
           //setting destination chain as trusted remote 
        );
        
        // const receipt =await trustResult.wait()
        const token=await proxyContract.symbol();

        console.log(token);
      }
      catch(e){
        console.log("error",e);
      }
});

task("sentFrom","connect with other chains")
.addParam("destinationchainid","chain id of destination")
.setAction(async(taskArgs)=>{
  console.log(ethers.provider)
    const signer = await ethers.provider.getSigner() ;
    console.log("signer Created",signer);
    const proxyContract=new ethers.Contract("0x1CE50cFe9f3BE2c06bE35F38Ffd1eBd0dDFE1B85",
    ONFTopABI,signer);
    try{
        const trustResult = await proxyContract.setMinDstGas(
          taskArgs.destinationchainid,
          1,
          "600000000000000000" 
           //setting destination chain as trusted remote 
        );
        
        // const receipt =await trustResult.wait()
        const token=await proxyContract.symbol();

        console.log(token);
      }
      catch(e){
        console.log("error",e);
      }
});
0.000000055555555555

module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"optimism-goerli",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/"+AlchemyKey,
      accounts:[privateKey],
      // path:"m/44'/60'/0'/0/0",
      gasPrice:10000000000, 
    },
    "base-goerli":{
      url:"https://goerli.base.org",
      accounts:[privateKey],
      // path:"m/44'/60'/0'/0/0",
      gasPrice:10000000000,
    },
    "optimism-goerli":{
      url:"https://opt-goerli.g.alchemy.com/v2/"+optimismKey,
      accounts:[privateKey],
      // path:"m/44'/60'/0'/0/0",
      gasPrice:10000000000,
    }
  }
};