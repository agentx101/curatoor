import { Alchemy } from "alchemy-sdk";
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { getUserCollections, getCollectionData, ipfsToWeb } from "../utils"

import { ALCHEMY_KEY, CHAINS } from "../constants"

interface NFTState {
  sdk: null | Alchemy,
  setSdk: (chain: string) => void,
  deleteSdk: () => void,
  fetchNfts: (address: string) => Promise<any>,
  fetchUserCollections: (userId: number) => Promise<any>,
  fetchCollectionNfts: (collectionId: number) => Promise<any>,
  fetchCollections: (address: string) => Promise<any>,
  currentCollection: any,
}

const useNFTStore = create<NFTState>()(
  devtools(
    persist(
      (set, get) => ({
        currentCollection: null,
        sdk: null,
        setSdk: (chain: string) => {
          const settings = {
            apiKey: ALCHEMY_KEY, // Replace with your Alchemy API Key.
            network: CHAINS[chain], // Replace with your network.
          };
          const sdk = new Alchemy(settings);
          set({ sdk })
        },
        deleteSdk: () => set({ sdk: new Alchemy }),
        fetchNfts: async (address: string) => {
          // Print total NFT count returned in the response:
          if (!get().sdk) {
            return Promise.resolve([]);
          }
          const nftsForOwner = await get().sdk.nft.getNftsForOwner(address);

          // Print contract address and tokenId for each NFT:
          const data = []
          for (const nft of nftsForOwner.ownedNfts) {
            data.push(nft)
          }
          console.log(data);
          return Promise.resolve(data)
        },
        fetchUserCollections: async (userId: number) => {
          const data = await getUserCollections(userId);
          return data.map((nft: any) => ({
            name: nft?.name,
            color: "#fff",
            height: 200,
            width: 200,
            src: (nft?.image_url ? ipfsToWeb(nft.image_url) : ''),
            href: `/users/${userId}/collections/${nft.id}`
          }))
        },
        fetchCollections: async (address: string) => {
          // Print total NFT count returned in the response:
          if (!get().sdk) {
            return Promise.resolve([]);
          }
          const nftsForOwner = await get().sdk.nft.getNftsForOwner(address);

          // Print contract address and tokenId for each NFT:
          const data = []
          for (const nft of nftsForOwner.ownedNfts) {
            (nft?.media?.length == 0) && data.push(nft)
          }
          return Promise.resolve(data)
        },
        fetchCollectionNfts: async (collectionId: number) => {
          console.log("Get collection data")
          const collectionData = await getCollectionData(collectionId);
          console.log(`Get collection nft ${collectionData.address}`)
          const nftData = await get().fetchNfts(collectionData.address)
          console.log("This is nft data")
          console.log(nftData);
          return nftData.map((nft: any) => {
            const imageUrl = ((nft.media?.length || 0) == 0) ? '' : nft.media[0].thumbnail
            return {
              name: nft?.title,
              color: "#fff",
              height: 200,
              width: 200,
              src: imageUrl,

            }
          })
        }

      }),
      {
        name: 'nft-storage',
      }
    )
  )
)

export default useNFTStore;
