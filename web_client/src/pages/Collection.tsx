import { useNetwork } from "wagmi";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';
import useAccountStore from "../store/account"
import useNFTStore from "../store/nft"
import { NFTBox } from "../components/NFTBox"




export function Collection() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const currentUser = useAccountStore((state) => state.userId);
  const [pins, setPins] = useState([]);
  const { userId, id } = useParams();
  const { chain } = useNetwork();
  const setSdk = useNFTStore((state) => state.setSdk);
  const fetchCollectionNfts = useNFTStore((state) => state.fetchCollectionNfts);
  console.log("This is the id")
  console.log(id);
  console.log(userId);
  if (!id || !userId) {
    return <></>
  }
  const collectionId = parseInt(id);
  if (!collectionId) return <></>;

  useEffect(() => {
    if (!chain) return;
    setSdk(chain.network)
    console.log("getting collection nft")
    fetchCollectionNfts(collectionId).then((colls) => {
      console.log(colls);
      setPins(colls);
    });
  }, []);

  return (
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
            renderItem={({ data }) => <NFTBox data={data} />}
          />

        </div>
      </Flex>
    </Box>
  );

}
