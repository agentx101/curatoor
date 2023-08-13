import { Fragment, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  Box,
  Button,
  ButtonLink,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Icon,
  IconButton,
  Flex,
  Layer,
  Modal,
  TextField,
} from 'gestalt';

import useAccountStore from "../store/account"

export default function SearchFieldBox() {
  const { address, isConnected } = useAccount();
  const setAccount = useAccountStore((state) => state.setAccount);
  const userId = useAccountStore((state) => state.userId);
  const [showComponent, setShowComponent] = useState(false);
  const [inputFields, setInputFields] = useState([
    { tokenhash: '' }
  ])
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const addFields = () => {
    let newfield = { tokenhash: '' }

    setInputFields([...inputFields, newfield])
  }

  const handleFormChange = (index, event, value) => {
    let data: any = [...inputFields];
    console.log(event.target.keikkkky);
    console.log(data)
    console.log(value)
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }


  if (isConnected && !!address) {
    setAccount(address);

  }
  return (
    <Box
      padding={8}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex alignItems="center" flex="grow" gap={{ row: 4, column: 0 }}>
        <Box
          id="jeet"
          height={55}
          width={60}
          dangerouslySetInlineStyle={{
            __style: {
              backgroundImage: "url(/assets/img/logo.svg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          }}
        >

        </Box>
        <Flex.Item flex="grow">
          {isConnected &&
            <>
              <ButtonLink
                accessibilityLabel="My Curations"
                iconEnd="visit"
                size="lg"
                color="blue"
                text="My Curations"
                rel="nofollow"
                target="blank"
                href={`/users/${userId}/collections`}
              />
              <Box marginStart={10} display="inlineBlock">
                <Button text="Create Curation" onClick={() => setShowComponent(true)} />
              </Box>
            </>
          }
        </Flex.Item>
        <ConnectButton accountStatus="avatar" />
      </Flex>

      {showComponent && (
        <Layer zIndex={modalZIndex}>
          <Modal
            accessibilityModalLabel="Create new board"
            align="start"
            heading="Create Curation"
            onDismiss={() => setShowComponent(false)}
            footer={
              <Flex alignItems="center" justifyContent="end">
                <Button color="red" text="Create" onClick={() => setShowComponent(false)} />
              </Flex>
            }
            size="sm"
          >
            <Fragment>
              <Box marginBottom={6}>
                <TextField
                  id="name"
                  name="name"
                  onChange={({ value }) => setName(value)}
                  placeholder='Name your Curation'
                  type="text"
                  value={name}
                />
              </Box>
              <Box marginBottom={6}>
                <TextField
                  id="imageUrl"
                  name="image"
                  onChange={({ value }) => setImageUrl(value)}
                  placeholder='ipfs link of your curation thumbnail'
                  type="text"
                  value={imageUrl}
                />
              </Box>
              {inputFields.map((input, index) =>
                <Box marginBottom={6} key={index}>
                  <TextField
                    id={`Token Hash - ${index}`}
                    name="tokenhash"
                    onChange={({ event, value }) => handleFormChange(index, event, value)}
                    placeholder='Token of the nft you want to include in this curation'
                    type="text"
                    value={input.tokenhash}
                  />
                </Box>
              )}
              <Box marginBottom={6}>
                <IconButton
                  accessibilityLabel="Add More"
                  bgColor="red"
                  icon="add"
                  size="sm"
                  onClick={addFields}
                />
              </Box>
            </Fragment>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
