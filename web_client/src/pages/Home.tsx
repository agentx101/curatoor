import { useAccount } from "wagmi";
import { useEffect, useId, useRef, useState } from 'react';
import { Box, Flex, Image, Label, Masonry, Text } from 'gestalt';

function getPins() {
  const pins = [
    {
      color: '#2b3938',
      height: 316,
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      width: 474,
      name: 'the Hang Son Doong cave in Vietnam',
    },
    {
      color: '#8e7439',
      height: 1081,
      src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
      width: 474,
      name: 'La Gran Muralla, Pekín, China',
    },
    {
      color: '#698157',
      height: 711,
      src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
      width: 474,
      name: 'Plitvice Lakes National Park, Croatia',
    },
    {
      color: '#4e5d50',
      height: 632,
      src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
      width: 474,
      name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
    },
    {
      color: '#6d6368',
      height: 710,
      src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
      width: 474,
      name: 'Border of China and Vietnam',
    },
  ];

  const pinList = [...new Array(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

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




export function Home() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
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
            layout="basicCentered"
            minCols={4}
            renderItem={({ data }) => <GridComponent data={data} />}
          />

        </div>
      </Flex>
    </Box>
  );

}
