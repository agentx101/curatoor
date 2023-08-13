import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchFieldBox from '../components/SearchFieldBox'
import { Box, Column, Flex, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';


const Root: React.FC = () => {

  return (
    <>
      <SearchFieldBox />
      <Outlet />
    </>
  );
};
export default Root
