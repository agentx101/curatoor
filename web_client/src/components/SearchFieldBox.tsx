import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Box, Flex, Icon, ButtonLink } from 'gestalt';
import useAccountStore from "../store/account"

export default function SearchFieldBox() {
  const { address, isConnected } = useAccount();
  const setAccount = useAccountStore((state) => state.setAccount);
  const userId = useAccountStore((state) => state.userId);


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
        <Icon
          accessibilityLabel="Pinterest"
          color="brandPrimary"
          icon="pinterest"
          size={20}
        />
        <Flex.Item flex="grow">
          {isConnected &&
            <ButtonLink
              accessibilityLabel="My Collections"
              iconEnd="visit"
              size="lg"
              color="blue"
              text="My Collections"
              rel="nofollow"
              target="blank"
              href={`/users/${userId}/collections`}
            />
          }
        </Flex.Item>
        <ConnectButton accountStatus="avatar" />
      </Flex>
    </Box>
  );
}
