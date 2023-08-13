import { Flex, Image, Link, Text } from 'gestalt';


interface NFTBoxProp {
  name: string,
  color: string,
  height: number,
  width: number,
  src: string,
}

export function NFTBox({ data }: { data: NFTBoxProp }) {
  return (
    <Flex direction="column" >
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
