const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

    const par=await deploy("ProxyONFT721", {
        from: deployer,
        args: [100000,lzEndpointAddress, "0xaf614a2ced7ec8cdffaebc10ba797f6c9ebfcd78"],
        log: true,
        waitConfirmations: 1,
    });
    console.log(par);
}

module.exports.tags = ["ProxyONFT721"]
