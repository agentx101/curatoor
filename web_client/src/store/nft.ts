import { Alchemy } from "alchemy-sdk";
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

import { ALCHEMY_KEY, CHAINS } from "../constants"

interface NFTState {
  sdk: null | Alchemy,
  setSdk: (chain: string) => void,
  deleteSdk: () => void,
  fetchNfts: (address: string) => Promise<any>,
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

      }),
      {
        name: 'nft-storage',
      }
    )
  )
)

export default useNFTStore;
