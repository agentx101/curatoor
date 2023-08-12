import { useEffect, useState } from 'react';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';
import { getRecommendations } from "../utils"
import { CollectionBox } from "../components/CollectionBox"


export function Home() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const [pins, setPins] = useState([]);


  useEffect(() => {
    (async () => {
      const colls = await getRecommendations();
      const hello = colls.map((col) => ({
        color: "#fff",
        height: 300,
        width: 300,
        src: col.image_url,
        name: col.description,
        href: `/users/${col.user_id}/collections/${col.id}`,
      }));
      setPins(hello);
    })();
    return () => { }
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
