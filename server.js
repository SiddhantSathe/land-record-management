const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const port = 3000;

// Set up provider and contract instance
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const landRecordAddress = process.env.LAND_RECORD_ADDRESS;
const landRecordABI = [
    "function registerLand(string memory location, uint256 area) public",
    "function transferOwnership(uint256 landId, address newOwner) public",
    "function verifyOwnership(uint256 landId) public view returns (address)"
];
const landRecordContract = new ethers.Contract(landRecordAddress, landRecordABI, provider);

app.use(express.json());

// Endpoint to register land
app.post('/register-land', async (req, res) => {
    const { location, area } = req.body;
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const landRecordWithSigner = landRecordContract.connect(signer);
    const tx = await landRecordWithSigner.registerLand(location, area);
    await tx.wait();
    res.json({ status: 'Land Registered' });
});

// Endpoint to transfer ownership
app.post('/transfer-ownership', async (req, res) => {
    const { landId, newOwner } = req.body;
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const landRecordWithSigner = landRecordContract.connect(signer);
    const tx = await landRecordWithSigner.transferOwnership(landId, newOwner);
    await tx.wait();
    res.json({ status: 'Ownership Transferred' });
});

// Endpoint to verify ownership
app.get('/verify-ownership/:landId', async (req, res) => {
    const landId = req.params.landId;
    const owner = await landRecordContract.verifyOwnership(landId);
    res.json({ owner });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
