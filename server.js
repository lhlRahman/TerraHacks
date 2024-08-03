// server.js
import express from 'express';
import { config } from 'dotenv';
import {
    postPlant,
    putPlant,
    getPlant,
    getPlantsUser,
    getPlants,
    talkPlant,
    sellPlant
} from './plant-nft-functions.js';

config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const collection = 714;

app.post('/postPlant', async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data);
        const result = await postPlant(data.imgURL, data.name, data.walletID, data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/putPlant', async (req, res) => {
    try {
        const { id, data } = req.body;
        const result = await putPlant(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/getPlant/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const plant = await getPlant(parseInt(id));
        res.json(plant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getPlantsUser/:walletID', async (req, res) => {
    try {
        const { walletID } = req.params;
        const plants = await getPlantsUser(walletID);
        res.json(plants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getPlants', async (req, res) => {
    try {
        console.log('getPlants');
        const plants = await getPlants();
        res.json(plants);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/talkPlant', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await talkPlant(messages);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/sellPlant', async (req, res) => {
    try {
        const { id, fromWalletID, fromWalletSeed, toWalletID } = req.body;
        const result = await sellPlant(id, fromWalletID, fromWalletSeed, toWalletID);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
}
);

function makeRequest() {
    https.get('https://terrahacks.onrender.com/health', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log("sent request to myself");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

// Request every 15 mins
setInterval(makeRequest, 15 * 20 * 1000);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});