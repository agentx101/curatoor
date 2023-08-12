import { Flex, Image, Link, Text } from 'gestalt';


interface CollectionBoxProp {
  name: string,
  color: string,
  height: number,
  width: number,
  src: string,
  href: string,
}

export function CollectionBox({ data }: { data: CollectionBoxProp }) {
  return (
    <Flex direction="column" >
      <Link
        href={data.href}
        underline="none"
      >
        <Image
          alt={data.name}
          color={data.color}
          naturalHeight={data.height}
          naturalWidth={data.width}
          src={data.src}
        />
        <Text>{data.name}</Text>
      </Link>
    </Flex>
  );
}
