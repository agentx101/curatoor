
import { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Box, Flex, Icon, IconButton, SearchField } from 'gestalt';

export default function SearchFieldBox() {
  const [searchValue, setSearchValue] = useState('');
  const { isConnected } = useAccount();
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
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldA11yExample"
            onChange={({ value }) => setSearchValue(value)}
            placeholder="Search and explore"
            value={searchValue}
          />
        </Flex.Item>
        <ConnectButton accountStatus="avatar" />
      </Flex>
    </Box>
  );
}
