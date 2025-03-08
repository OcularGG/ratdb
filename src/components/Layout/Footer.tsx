import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box as="footer" bg="gray.100" _dark={{ bg: 'gray.900' }} py={4} textAlign="center">
      <Text>
        © {new Date().getFullYear()} ratDB.{' '}
        <Link
          href="https://github.com/OcularGG/ratdb"
          isExternal
          color="blue.500"
        >
          GitHub
        </Link>
      </Text>
    </Box>
  );
}