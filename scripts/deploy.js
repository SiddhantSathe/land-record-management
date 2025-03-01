async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const LandRecord = await ethers.getContractFactory("LandRecord");
    const landRecord = await LandRecord.deploy();
    console.log("LandRecord contract deployed to:", landRecord.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
