// nftFunctions.js
import {
    Sr25519Account
} from "@unique-nft/sr25519";
import {
    Sdk
} from '@unique-nft/sdk/full';
import {
    config
} from 'dotenv';
import FormData from 'form-data';
// import { generateImage } from './gpt.js';
import fetch from 'node-fetch';
import fs from 'fs';
// import path from 'path';

config();

const COLLECTION_ID = 714;

const PINATA_JWT = process.env.IPFS || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmM2EwNTVhYS1hYmQ2LTRlZDYtOTU5Yy1iMGJkZmVjMDViMTMiLCJlbWFpbCI6ImxobHJhaG1hbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmNkZDQ3ZjA0Y2M5MGY1YjhhMDEiLCJzY29wZWRLZXlTZWNyZXQiOiIwM2E4ZmM0NDNkYzJiMjNlNjVmOGU4MTllZTlkZTMyNjBjNmI3M2ZmNGFiYjBhM2M2MzAxNDBiZWUyYTY2ZWIxIiwiaWF0IjoxNzIyMDk2NjYwfQ.cQPYfszcpi57cvjHcjl3afVY8Lr3RNS4TvZpSGUVA9Q';
export const PINATA_GATEWAY = process.env.IPFS_GATEWAY || 'https://aquamarine-rainy-kangaroo-939.mypinata.cloud';

export const getSdk = (m) => {
    const mnemonic = m || process.env.MNEMONIC || "because discover output shoe kind survey pipe slush air cigar result crater";
    if (!mnemonic) {
        throw new Error('Mnemonic is not provided. Please set the MNEMONIC environment variable.');
    }
    const account = Sr25519Account.fromUri(mnemonic);
    const sdk = new Sdk({
        baseUrl: process.env.UNIQUE_NETWORK_BASE_URL || 'https://rest.unique.network/unique/v1',
        account,
    });

    return {
        sdk,
        account
    };
};

export async function pinFileToIPFS(filePath) {
    try {
        const data = new FormData();
        const file = fs.createReadStream(filePath);
        data.append('file', file);

        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: data,
        });

        const result = await response.json();
        return result.IpfsHash;
    } catch (error) {
        console.error('Error in pinFileToIPFS:', error);
        throw error;
    }
}



const createMutablePlantCollection = async () => {
    const {
        account,
        sdk
    } = getSdk();

    console.log(`Connected with address: ${account.address}`);

    const collectionSchema = {
        schemaName: "unique",
        schemaVersion: '1.0.0',
        image: {
            urlTemplate: 'https://aquamarine-rainy-kangaroo-939.mypinata.cloud/ipfs/{infix}'
        },
        coverPicture: {
            url: 'https://aquamarine-rainy-kangaroo-939.mypinata.cloud/ipfs/QmZBBrSubfvwF8ntGdymmKmeJWHDCojtNn1AMYDQSqFt3b'
        },
        attributesSchemaVersion: '1.0.0',
        attributesSchema: {
            0: {
                name: {
                    _: 'name'
                },
                type: 'string',
                optional: false
            },
            1: {
                name: {
                    _: 'imgURL'
                },
                type: 'string',
                optional: false
            },
            2: {
                name: {
                    _: 'walletID'
                },
                type: 'string',
                optional: false
            },
            3: {
                name: {
                    _: 'seed'
                },
                type: 'string',
                optional: false
            },
            4: {
                name: {
                    _: 'colVibrancy'
                },
                type: 'number',
                optional: false
            },
            5: {
                name: {
                    _: 'colVibrancyAdvice'
                },
                type: 'string',
                optional: false
            },
            6: {
                name: {
                    _: 'LAI'
                },
                type: 'number',
                optional: false
            },
            7: {
                name: {
                    _: 'LAIAdvice'
                },
                type: 'string',
                optional: false
            },
            8: {
                name: {
                    _: 'wilting'
                },
                type: 'number',
                optional: false
            },
            9: {
                name: {
                    _: 'wiltingAdvice'
                },
                type: 'string',
                optional: false
            },
            10: {
                name: {
                    _: 'spotting'
                },
                type: 'number',
                optional: false
            },
            11: {
                name: {
                    _: 'spottingAdvice'
                },
                type: 'string',
                optional: false
            },
            12: {
                name: {
                    _: 'symmetry'
                },
                type: 'number',
                optional: false
            },
            13: {
                name: {
                    _: 'symmetryAdvice'
                },
                type: 'string',
                optional: false
            },
            14: {
                name: {
                    _: 'growthPat'
                },
                type: 'number',
                optional: false
            },
            15: {
                name: {
                    _: 'growthPatAdvice'
                },
                type: 'string',
                optional: false
            },
            16: {
                name: {
                    _: 'pests'
                },
                type: 'number',
                optional: false
            },
            17: {
                name: {
                    _: 'pestsAdvice'
                },
                type: 'string',
                optional: false
            },
            18: {
                name: {
                    _: 'flowering'
                },
                type: 'number',
                optional: false
            }
        }
    };

    try {
        const result = await sdk.collection.create.submitWaitResult({
            address: account.address,
            name: 'Mutable Plants Collection',
            description: 'A collection of mutable plant NFTs',
            tokenPrefix: 'PLANT',
            schema: collectionSchema,
            tokenPropertyPermissions: Object.keys(collectionSchema.attributesSchema).map(key => ({
                key: collectionSchema.attributesSchema[key].name._,
                permission: {
                    mutable: true,
                    tokenOwner: true,
                    collectionAdmin: true,
                },
            })),
        });

        const {
            collectionId
        } = result.parsed;

        console.log(`Mutable Plant Collection created successfully!`);
        console.log(`Collection ID: ${collectionId}`);
        console.log(`Explore your collection: https://uniquescan.io/unique/collections/${collectionId}`);

        return collectionId;
    } catch (error) {
        console.error("Error creating mutable plant collection:", error);
        throw error;
    }
};

const mintPlantNFT = async (collectionId) => {
    const {
        account,
        sdk
    } = getSdk();

    try {
        const result = await sdk.token.create.submitWaitResult({
            address: account.address,
            collectionId: collectionId,
            data: {
                image: {
                    ipfsCid: 'QmZBBrSubfvwF8ntGdymmKmeJWHDCojtNn1AMYDQSqFt3b'
                },
                encodedAttributes: {
                    0: {
                        _: 'Plant Name'
                    },
                    1: {
                        _: 'https://example.com/plant-image.jpg'
                    },
                    2: {
                        _: 'wallet123'
                    },
                    3: {
                        _: 'seed123'
                    },
                    4: {
                        _: 50
                    },
                    5: {
                        _: 'Vibrant color advice'
                    },
                    6: {
                        _: 50
                    },
                    7: {
                        _: 'LAI advice'
                    },
                    8: {
                        _: 50
                    },
                    9: {
                        _: 'Wilting advice'
                    },
                    10: {
                        _: 50
                    },
                    11: {
                        _: 'Spotting advice'
                    },
                    12: {
                        _: 50
                    },
                    13: {
                        _: 'Symmetry advice'
                    },
                    14: {
                        _: 50
                    },
                    15: {
                        _: 'Growth pattern advice'
                    },
                    16: {
                        _: 50
                    },
                    17: {
                        _: 'Pests advice'
                    },
                    18: {
                        _: 50
                    }
                }
            }
        });

        const {
            tokenId
        } = result.parsed;

        console.log(`NFT minted successfully!`);
        console.log(`Token ID: ${tokenId}`);
        console.log(`Explore your NFT: https://uniquescan.io/unique/tokens/${collectionId}/${tokenId}`);

        return tokenId;
    } catch (error) {
        console.error("Error minting plant NFT:", error);
        throw error;
    }
};

const updatePlantNFT = async (collectionId, tokenId, newAttributes) => {
    const {
        account,
        sdk
    } = getSdk();

    try {
        const properties = Object.entries(newAttributes).map(([key, value]) => ({
            key,
            value: value.toString() // Convert all values to string
        }));

        const result = await sdk.token.setProperties.submitWaitResult({
            address: account.address,
            collectionId,
            tokenId,
            properties
        });

        console.log(`NFT updated successfully!`);
        console.log(`Updated Token ID: ${tokenId}`);
        console.log(`Explore your updated NFT: https://uniquescan.io/unique/tokens/${collectionId}/${tokenId}`);

        return result.parsed;
    } catch (error) {
        console.error("Error updating plant NFT:", error);
        throw error;
    }
};

const main = async () => {
    try {
        const collectionId = await createMutablePlantCollection();
        const tokenId = await mintPlantNFT(collectionId);

        console.log(res);
    } catch (e) {
        console.log('Something went wrong during collection creation, NFT minting, or updating');
        console.error(e);
    }
};

export const postPlant = async (imgURL, name, walletID, plantData) => {
    const {
        sdk,
        account
    } = getSdk();

    console.log(`Minting with address: ${account.address}`);
    console.log(`Sending to address: ${walletID}`);

    try {
        const result = await sdk.token.createMultiple.submitWaitResult({
            address: account.address,
            collectionId: COLLECTION_ID,
            tokens: [{
                owner: walletID,
                data: {
                    image: {
                        url: imgURL
                    },
                    encodedAttributes: {
                        0: {
                            _: name
                        },
                        1: {
                            _: imgURL
                        },
                        2: {
                            _: walletID
                        },
                        3: {
                            _: plantData.seed
                        },
                        4: {
                            _: plantData.colVibrancy
                        },
                        5: {
                            _: plantData.colVibrancyAdvice
                        },
                        6: {
                            _: plantData.LAI
                        },
                        7: {
                            _: plantData.LAIAdvice
                        },
                        8: {
                            _: plantData.wilting
                        },
                        9: {
                            _: plantData.wiltingAdvice
                        },
                        10: {
                            _: plantData.spotting
                        },
                        11: {
                            _: plantData.spottingAdvice
                        },
                        12: {
                            _: plantData.symmetry
                        },
                        13: {
                            _: plantData.symmetryAdvice
                        },
                        14: {
                            _: plantData.growthPat
                        },
                        15: {
                            _: plantData.growthPatAdvice
                        },
                        16: {
                            _: plantData.pests
                        },
                        17: {
                            _: plantData.pestsAdvice
                        },
                        18: {
                            _: plantData.flowering
                        }
                    }
                }
            }]
        });

        console.log("Minting result:", result);
        return result.parsed;
    } catch (error) {
        console.error("Error in postPlant:", error);
        throw error;
    }
};


export const putPlant = async (id, plantData) => {
    const {
        sdk,
        account
    } = getSdk(plantData.seed);


    try {
        // Prepare all properties, including the image URL
        const properties = [{
                key: 'name',
                value: plantData.name
            },
            {
                key: 'imgURL',
                value: plantData.imgURL
            },
            {
                key: 'walletID',
                value: plantData.walletID
            },
            {
                key: 'seed',
                value: plantData.seed
            },
            {
                key: 'colVibrancy',
                value: plantData.colVibrancy.toString()
            },
            {
                key: 'colVibrancyAdvice',
                value: plantData.colVibrancyAdvice
            },
            {
                key: 'LAI',
                value: plantData.LAI.toString()
            },
            {
                key: 'LAIAdvice',
                value: plantData.LAIAdvice
            },
            {
                key: 'wilting',
                value: plantData.wilting.toString()
            },
            {
                key: 'wiltingAdvice',
                value: plantData.wiltingAdvice
            },
            {
                key: 'spotting',
                value: plantData.spotting.toString()
            },
            {
                key: 'spottingAdvice',
                value: plantData.spottingAdvice
            },
            {
                key: 'symmetry',
                value: plantData.symmetry.toString()
            },
            {
                key: 'symmetryAdvice',
                value: plantData.symmetryAdvice
            },
            {
                key: 'growthPat',
                value: plantData.growthPat.toString()
            },
            {
                key: 'growthPatAdvice',
                value: plantData.growthPatAdvice
            },
            {
                key: 'pests',
                value: plantData.pests.toString()
            },
            {
                key: 'pestsAdvice',
                value: plantData.pestsAdvice
            },
            {
                key: 'flowering',
                value: plantData.flowering.toString()
            }
        ];

        // Update all properties in a single call
        const result = await sdk.token.setProperties.submitWaitResult({
            address: account.address,
            collectionId: COLLECTION_ID,
            tokenId: id,
            properties: properties
        });

        console.log(`Updated properties for NFT with ID: ${id}`);
        const jsonData = await sdk.token.get({
            collectionId: COLLECTION_ID,
            tokenId: id
        });

        // Extract the attributes and properties
        const attributes = jsonData.attributes;
        const jsonProperties = jsonData.properties;

        // Create a mapping of attribute names to their corresponding values
        const attributeMap = {};
        for (const key in attributes) {
            attributeMap[attributes[key].name._] = attributes[key].value._;
        }

        // Function to find a property value by key
        const findPropertyValue = (key) => {
            const property = jsonProperties.find(prop => prop.key === key);
            return property ? property.value : null;
        };

        // Create the properties array
        return [{
                key: 'name',
                value: findPropertyValue('name') || attributeMap['name']
            },
            {
                key: 'imgURL',
                value: findPropertyValue('imgURL') || attributeMap['imgURL']
            },
            {
                key: 'walletID',
                value: findPropertyValue('walletID') || attributeMap['walletID']
            },
            {
                key: 'seed',
                value: findPropertyValue('seed') || attributeMap['seed']
            },
            {
                key: 'colVibrancy',
                value: (findPropertyValue('colVibrancy') || attributeMap['colVibrancy']).toString()
            },
            {
                key: 'colVibrancyAdvice',
                value: findPropertyValue('colVibrancyAdvice') || attributeMap['colVibrancyAdvice']
            },
            {
                key: 'LAI',
                value: (findPropertyValue('LAI') || attributeMap['LAI']).toString()
            },
            {
                key: 'LAIAdvice',
                value: findPropertyValue('LAIAdvice') || attributeMap['LAIAdvice']
            },
            {
                key: 'wilting',
                value: (findPropertyValue('wilting') || attributeMap['wilting']).toString()
            },
            {
                key: 'wiltingAdvice',
                value: findPropertyValue('wiltingAdvice') || attributeMap['wiltingAdvice']
            },
            {
                key: 'spotting',
                value: (findPropertyValue('spotting') || attributeMap['spotting']).toString()
            },
            {
                key: 'spottingAdvice',
                value: findPropertyValue('spottingAdvice') || attributeMap['spottingAdvice']
            },
            {
                key: 'symmetry',
                value: (findPropertyValue('symmetry') || attributeMap['symmetry']).toString()
            },
            {
                key: 'symmetryAdvice',
                value: findPropertyValue('symmetryAdvice') || attributeMap['symmetryAdvice']
            },
            {
                key: 'growthPat',
                value: (findPropertyValue('growthPat') || attributeMap['growthPat']).toString()
            },
            {
                key: 'growthPatAdvice',
                value: findPropertyValue('growthPatAdvice') || attributeMap['growthPatAdvice']
            },
            {
                key: 'pests',
                value: (findPropertyValue('pests') || attributeMap['pests']).toString()
            },
            {
                key: 'pestsAdvice',
                value: findPropertyValue('pestsAdvice') || attributeMap['pestsAdvice']
            },
            {
                key: 'flowering',
                value: (findPropertyValue('flowering') || attributeMap['flowering']).toString()
            }
        ];

    } catch (error) {
        console.error("Error in putPlant:", error);
        throw error;
    }
};

export const getPlant = async (id) => {
    const {
        sdk
    } = getSdk();

    try {
        const jsonData = await sdk.token.get({
            collectionId: COLLECTION_ID,
            tokenId: id
        });

        // Extract the attributes and properties
        const attributes = jsonData.attributes;
        const jsonProperties = jsonData.properties;

        // Create a mapping of attribute names to their corresponding values
        const attributeMap = {};
        for (const key in attributes) {
            attributeMap[attributes[key].name._] = attributes[key].value._;
        }

        // Function to find a property value by key
        const findPropertyValue = (key) => {
            const property = jsonProperties.find(prop => prop.key === key);
            return property ? property.value : null;
        };

        // Create the properties array
        return [{
                key: 'name',
                value: findPropertyValue('name') || attributeMap['name']
            },
            {
                key: 'imgURL',
                value: findPropertyValue('imgURL') || attributeMap['imgURL']
            },
            {
                key: 'walletID',
                value: findPropertyValue('walletID') || attributeMap['walletID']
            },
            {
                key: 'seed',
                value: findPropertyValue('seed') || attributeMap['seed']
            },
            {
                key: 'colVibrancy',
                value: (findPropertyValue('colVibrancy') || attributeMap['colVibrancy']).toString()
            },
            {
                key: 'colVibrancyAdvice',
                value: findPropertyValue('colVibrancyAdvice') || attributeMap['colVibrancyAdvice']
            },
            {
                key: 'LAI',
                value: (findPropertyValue('LAI') || attributeMap['LAI']).toString()
            },
            {
                key: 'LAIAdvice',
                value: findPropertyValue('LAIAdvice') || attributeMap['LAIAdvice']
            },
            {
                key: 'wilting',
                value: (findPropertyValue('wilting') || attributeMap['wilting']).toString()
            },
            {
                key: 'wiltingAdvice',
                value: findPropertyValue('wiltingAdvice') || attributeMap['wiltingAdvice']
            },
            {
                key: 'spotting',
                value: (findPropertyValue('spotting') || attributeMap['spotting']).toString()
            },
            {
                key: 'spottingAdvice',
                value: findPropertyValue('spottingAdvice') || attributeMap['spottingAdvice']
            },
            {
                key: 'symmetry',
                value: (findPropertyValue('symmetry') || attributeMap['symmetry']).toString()
            },
            {
                key: 'symmetryAdvice',
                value: findPropertyValue('symmetryAdvice') || attributeMap['symmetryAdvice']
            },
            {
                key: 'growthPat',
                value: (findPropertyValue('growthPat') || attributeMap['growthPat']).toString()
            },
            {
                key: 'growthPatAdvice',
                value: findPropertyValue('growthPatAdvice') || attributeMap['growthPatAdvice']
            },
            {
                key: 'pests',
                value: (findPropertyValue('pests') || attributeMap['pests']).toString()
            },
            {
                key: 'pestsAdvice',
                value: findPropertyValue('pestsAdvice') || attributeMap['pestsAdvice']
            },
            {
                key: 'flowering',
                value: (findPropertyValue('flowering') || attributeMap['flowering']).toString()
            }
        ];

    } catch (error) {
        console.error("Error in getPlant:", error);
        throw error;
    }
};

export const getPlantsUser = async (walletID) => {
    const {
        sdk
    } = getSdk();

    try {
        const {
            tokens
        } = await sdk.tokens.accountTokens({
            address: walletID,
            collectionId: COLLECTION_ID
        });

        const plants = await Promise.all(tokens.map(token => getPlant(token.tokenId)));
        return plants;
    } catch (error) {
        console.error("Error in getPlantsUser:", error);
        throw error;
    }
};

export const getPlants = async () => {
    const {
        sdk
    } = getSdk();

    try {
        const {
            tokenId
        } = await sdk.collection.lastTokenId({
            collectionId: COLLECTION_ID
        });

        console.log(`Total tokens: ${tokenId}`);

        let all = [];

        for (let i = 1; i <= tokenId; i++) {
            try {
                const jsonData = await sdk.token.get({
                    collectionId: COLLECTION_ID,
                    tokenId: i
                });
                const attributes = jsonData.attributes;
                const jsonProperties = jsonData.properties;

                // Create a mapping of attribute names to their corresponding values
                const attributeMap = {};
                for (const key in attributes) {
                    attributeMap[attributes[key].name._] = attributes[key].value._;
                }

                // Function to find a property value by key
                const findPropertyValue = (key) => {
                    const property = jsonProperties.find(prop => prop.key === key);
                    return property ? property.value : null;
                };

                // Create the properties array
                all.push([
                    {
                        key: 'id',
                        value: i
                    }
                    ,{
                        key: 'name',
                        value: findPropertyValue('name') || attributeMap['name']
                    },
                    {
                        key: 'imgURL',
                        value: findPropertyValue('imgURL') || attributeMap['imgURL']
                    },
                    {
                        key: 'walletID',
                        value: findPropertyValue('walletID') || attributeMap['walletID']
                    },
                    {
                        key: 'seed',
                        value: findPropertyValue('seed') || attributeMap['seed']
                    },
                    {
                        key: 'colVibrancy',
                        value: (findPropertyValue('colVibrancy') || attributeMap['colVibrancy']).toString()
                    },
                    {
                        key: 'colVibrancyAdvice',
                        value: findPropertyValue('colVibrancyAdvice') || attributeMap['colVibrancyAdvice']
                    },
                    {
                        key: 'LAI',
                        value: (findPropertyValue('LAI') || attributeMap['LAI']).toString()
                    },
                    {
                        key: 'LAIAdvice',
                        value: findPropertyValue('LAIAdvice') || attributeMap['LAIAdvice']
                    },
                    {
                        key: 'wilting',
                        value: (findPropertyValue('wilting') || attributeMap['wilting']).toString()
                    },
                    {
                        key: 'wiltingAdvice',
                        value: findPropertyValue('wiltingAdvice') || attributeMap['wiltingAdvice']
                    },
                    {
                        key: 'spotting',
                        value: (findPropertyValue('spotting') || attributeMap['spotting']).toString()
                    },
                    {
                        key: 'spottingAdvice',
                        value: findPropertyValue('spottingAdvice') || attributeMap['spottingAdvice']
                    },
                    {
                        key: 'symmetry',
                        value: (findPropertyValue('symmetry') || attributeMap['symmetry']).toString()
                    },
                    {
                        key: 'symmetryAdvice',
                        value: findPropertyValue('symmetryAdvice') || attributeMap['symmetryAdvice']
                    },
                    {
                        key: 'growthPat',
                        value: (findPropertyValue('growthPat') || attributeMap['growthPat']).toString()
                    },
                    {
                        key: 'growthPatAdvice',
                        value: findPropertyValue('growthPatAdvice') || attributeMap['growthPatAdvice']
                    },
                    {
                        key: 'pests',
                        value: (findPropertyValue('pests') || attributeMap['pests']).toString()
                    },
                    {
                        key: 'pestsAdvice',
                        value: findPropertyValue('pestsAdvice') || attributeMap['pestsAdvice']
                    },
                    {
                        key: 'flowering',
                        value: (findPropertyValue('flowering') || attributeMap['flowering']).toString()
                    }
                ])
            } catch (error) {
                if (error.name === "TokenNotFoundError") {
                    console.log(`Token ${i} not found, skipping.`);
                } else {
                    console.error(`Error fetching token ${i}:`, error);
                }
            }
        }

        return all;
    } catch (error) {
        console.error("Error in getPlants:", error);
        throw error;
    }
};

export const talkPlant = async (messages) => {
    // GPT integration to process messages and generate a response
    // This is a placeholder and should be replaced with actual GPT integration
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
};

export const sellPlant = async (id, fromWalletID, fromWalletSeed, toWalletID) => {
    const {
        sdk
    } = getSdk(fromWalletSeed);

    try {
        const result = await sdk.token.transfer.submitWaitResult({
            address: fromWalletID,
            from: fromWalletID,
            to: toWalletID,
            collectionId: COLLECTION_ID,
            tokenId: id
        });

        return result.parsed;
    } catch (error) {
        console.error("Error in sellPlant:", error);
        throw error;
    }
};