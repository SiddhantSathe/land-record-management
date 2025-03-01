const { expect } = require("chai");

describe("LandRecord Contract", function () {
    let LandRecord;
    let landRecord;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        LandRecord = await ethers.getContractFactory("LandRecord");
        landRecord = await LandRecord.deploy();
    });

    it("Should register a land record", async function () {
        await landRecord.registerLand("Mumbai", 500);
        const land = await landRecord.lands(1);
        expect(land.location).to.equal("Mumbai");
        expect(land.area).to.equal(500);
        expect(land.owner).to.equal(owner.address);
    });

    it("Should transfer ownership of the land", async function () {
        await landRecord.registerLand("Mumbai", 500);
        const [newOwner] = await ethers.getSigners();
        await landRecord.transferOwnership(1, newOwner.address);
        const land = await landRecord.lands(1);
        expect(land.owner).to.equal(newOwner.address);
    });

    it("Should verify ownership", async function () {
        await landRecord.registerLand("Mumbai", 500);
        const ownerAddress = await landRecord.verifyOwnership(1);
        expect(ownerAddress).to.equal(owner.address);
    });
});
