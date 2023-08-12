import { Alchemy } from "alchemy-sdk";
import { useNetwork } from "wagmi";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';
import { shallow } from 'zustand/shallow'
import useAccountStore from "../store/account"
import useNFTStore from "../store/nft"
import { getPins } from "../utils"


interface GridComponentProp {
  name: string,
  color: string,
  height: number,
  width: number,
  src: string,
}

function GridComponent({ data }: { data: GridComponentProp }) {
  return (
    <Flex direction="column">
      <Image
        alt={data.name}
        color={data.color}
        naturalHeight={data.height}
        naturalWidth={data.width}
        src={data.src}
      />
      <Text>{data.name}</Text>
    </Flex>
  );
}


export function Collections() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const account = useAccountStore((state) => state.account);
  const [pins, setPins] = useState([]);
  const { id } = useParams();
  const { chain } = useNetwork();
  const setSdk = useNFTStore((state) => state.setSdk);
  const fetchNfts = useNFTStore((state) => state.fetchNfts);


  useEffect(() => {
    if (!chain) return;
    setSdk(chain.network)
    fetchNfts(account).then((nfts) => {
      console.log("Effect putting in pins");
      console.log(nfts);
      console.log("what's going on")
      const hello = nfts.filter((nft: any) => nft?.media?.length > 0).map(
        (nft: any) => {
          console.log("mapping shit");
          console.log(nft.rawMetadata.image);
          return {
            color: "#fff",
            height: 300,
            width: 300,
            src: nft.rawMetadata.image,
            name: nft.description,
          }
        }
      );
      console.log("Hello hello")
      console.log(hello)
      setPins(hello);
    });
  }, []);

  return (
    !!account &&
    <Box padding={2}>
      <Flex direction="column" gap={4}>
        <div
          tabIndex={0}
          style={{
            margin: '0 auto',
            outline: 'none',
          }}
          id="jeet"
        >
          <Masonry
            columnWidth={170}
            gutterWidth={20}
            items={pins}
            layout="basic"
            minCols={4}
            renderItem={({ data }) => <GridComponent data={data} />}
          />

        </div>
      </Flex>
    </Box>
  );

}
