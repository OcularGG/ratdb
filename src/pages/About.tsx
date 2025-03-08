import React from 'react';
import { Box, Heading, Text, VStack, Link, ListItem, UnorderedList } from '@chakra-ui/react';

export function About() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading>About ratDB</Heading>
      
      <Text>
        ratDB is a community-driven database for tracking player behavior in Albion Online.
        Our goal is to help maintain a healthy gaming environment by providing transparency
        and accountability.
      </Text>

      <Box>
        <Heading size="md" mb={4}>Features</Heading>
        <UnorderedList spacing={2}>
          <ListItem>Search across all Albion Online servers (WEST, EAST, EUROPE)</ListItem>
          <ListItem>Real-time data updates</ListItem>
          <ListItem>Community-driven reporting system</ListItem>
          <ListItem>Dark/Light mode support</ListItem>
        </UnorderedList>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Contributing</Heading>
        <Text>
          This project is open source and we welcome contributions! Visit our{' '}
          <Link
            href="https://github.com/OcularGG/ratdb"
            color="blue.500"
            isExternal
          >
            GitHub repository
          </Link>
          {' '}to learn more about how you can help improve ratDB.
        </Text>
      </Box>
    </VStack>
  );
}