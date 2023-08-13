# Curista
An Art gallery of NFTs, powered by ERC6551, Layerzero and EAS NFT curators can make independent collections of multiple NFTs on OP, Base and Zora, natively.

# Decription
This is a platform built for NFT curators and NFT searchers.
It enables every user to create separate NFT curations in a single wallet (powered by ERC 6551 - Token bound accounts) . Each of these curations have NFTs relevant to the story and naunces for that theme. Eg. a modern art TBA can have all modern art related NFTs in it, similarly a pixel art TBA can contain just pixel arts. NFTs from any chain can be sent to a TBA hosted on one of the OP chain (Zora, base, OP), which can further get attested by other NFT enthusiasts. 

Why is this relevant?

Curators have the unique social and cultural insights to purchase and mint NFTs that are valuable. Each NFT has its own meaning and story behind it. Some of them share a similar story while others are individual pieces. In the current setup, NFTs are spread across chains and even if it is on a single chain, it is very difficult to categorize them and show it to the world.

The current  " collect all your NFTs in a single wallet" has a huge limitation. There is no way to make any one particular one stand out and for a curator to tell the story natively. Our platform provides the structural base and the front end to showcase the unique perspective of curators to the world. Here any user can browse through the multiple individually curated galleries and purchase an NFT or the whole bundle.

# How it is made

The project was built with the OP starter kit as the base to connect with wallets etc. We used an open source library that mimicked pinterest to be used as the front end for the platform. Built and hosted it using Docker.

For querying endpoints and blockchain data we used alchemy SDK.
Tokenbound accounts deployment, and registry contracts were used to create ERC-6551 registries in each of the chains - Zora, OP and Base. This allows every curator to create a collection on each of these chains. 

We used Layerzero Universal ONFT contracts to enable curators to bridge their NFTs from multiple chains onto the hosted chain of the TBA.
Each of these NFTs that get pulled in get self attested by the curator to be a part of the collection using EAS. This is to ensure that no one can randomly send tokens to the collection and only the ones selected by the curator is visible in the collection.

Once it is a part of the collection, each of the NFTs and the whole collection itself can be attested by anyone browsing through the platform. Again EAS is used here to make this possible. 
 


# Requirements
You must to have docker installed on your system to be able to curatoor

# Installing

## Clone this repository

1. cd into the cloned folder 
2. RUN: `docker compose build`
3. RUN: `docker compose up -d`

The application should now be available at localhost:5174

Some Housekeeping:

You will have to create two tables you rcopy of the the database.

1. docker exec -it webdb psql -U ethglobal
2. ```
CREATE TABLE IF NOT EXISTS users (
             id serial PRIMARY KEY,
             address VARCHAR(50) NOT NULL UNIQUE
         )

```
3. ```
CREATE TABLE IF NOT EXISTS collections (
             id serial PRIMARY KEY,
             address VARCHAR(50) NOT NULL UNIQUE,
             user_id INT NOT NULL,
             image_url Varchar(255),
             name Varchar(255),
             description Text
         )
```

It would be best to add a few dummy values to the database manually to see the application flow
