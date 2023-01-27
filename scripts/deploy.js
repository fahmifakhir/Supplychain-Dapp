const hre = require("hardhat");
const { Item } = require("../src/data/items.json");
const { factory } = require("../src/data/factoryData.json");
const { distributor } = require("../src/data/distributorData.json");
const { retail } = require("../src/data/retailData.json");

async function main() {

  const deployer = await ethers.getSigner();

  const supplyChain = await hre.ethers.getContractFactory("supplyChain");
  const supplychain = await supplyChain.deploy();

  const setLogistic = await hre.ethers.getContractFactory("setLogistic");
  const setlogistic = await setLogistic.deploy();

  await supplychain.deployed();
  await setlogistic.deployed();

  console.log("supplyChain contract deployed to:", supplychain.address);
  console.log("setLogistic contract deployed to:", setlogistic.address);

  //add list a default factory, distributor and retail

  for (let i = 0; i < factory.length; i++) {
    const setFactory = await setlogistic
      .connect(deployer)
      .addFactory(
        factory[i].addr, 
        factory[i].name, 
        factory[i].place
        );
    await setFactory.wait();
  }
  for (let i = 0; i < distributor.length; i++) {
    const setDistributor = await setlogistic
      .connect(deployer)
      .addDistribution(
        distributor[i].addr,
        distributor[i].name,
        distributor[i].place
      );
    await setDistributor.wait();

  }
  for (let i = 0; i < retail.length; i++) {
    const setRetail = await setlogistic
      .connect(deployer)
      .addRetail(
        retail[i].addr, 
        retail[i].name, 
        retail[i].place
      );
    await setRetail.wait();
  }
  console.log(retail)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
