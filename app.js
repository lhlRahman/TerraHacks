// server.js
import express from 'express';
import { config } from 'dotenv';
import { mintRaceNFT, mintAchievementNFT, PINATA_GATEWAY, getSdk, getRacesByPlayer, getAchievementsByPlayer } from './nftFunctions.js';

config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/mint-nft', async (req, res) => {
    try {
        const {
            nftData,
            playerAddress
        } = req.body;

        if (!playerAddress) {
            return res.status(400).json({ error: 'Player address is required' });
        }

        const { account } = getSdk();
        console.log('Minting account:', account.address);

        const mintResult = await mintRaceNFT(nftData);
        res.json(mintResult);

    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).json({ 
            error: 'Failed to mint NFT', 
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        });
    }
});


app.post("/getinfo", async (req, res) => {
    try {
        const { playerAddress } = req.body;
        if (!playerAddress) {
            return res.status(400).json({ error: 'Player address is required' });
        }
        const races = await getRacesByPlayer(playerAddress);

        res.json(races);
    } catch (error) {
        console.error('Error getting player info:', error);
        res.status(500).json({ error: 'Failed to get player info', details: error instanceof Error ? error.message : String(error) });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});