import React from 'react';
import { Box, Flex, Button, useColorMode, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" bg="gray.100" _dark={{ bg: 'gray.900' }} py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} align="center" justify="space-between">
        <ChakraLink as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
          ratDB
        </ChakraLink>
        
        <Flex align="center" gap={4}>
          <ChakraLink as={RouterLink} to="/search">Search</ChakraLink>
          <ChakraLink as={RouterLink} to="/about">About</ChakraLink>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}