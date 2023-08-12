import { useNetwork } from "wagmi";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';
import useAccountStore from "../store/account"
import useNFTStore from "../store/nft"
import { CollectionBox } from "../components/CollectionBox"




export function Collections() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const userId = useAccountStore((state) => state.userId);
  const [pins, setPins] = useState([]);
  const { id } = useParams();
  const { chain } = useNetwork();
  const setSdk = useNFTStore((state) => state.setSdk);
  const fetchCollectionNfts = useNFTStore((state) => state.fetchCollectionNfts);
  console.log("This is the id")
  console.log(id);
  if (!id) {
    return <></>
  }
  const accountId = id == "me" ? userId : parseInt(id);
  if (!accountId) return <></>;


  useEffect(() => {
    if (!chain) return;
    setSdk(chain.network)
    fetchCollectionNfts(accountId).then((colls) => {
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
            renderItem={({ data }) => <CollectionBox data={data} />}
          />

        </div>
      </Flex>
    </Box>
  );

}
