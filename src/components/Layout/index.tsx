import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navigation />
      <Container as="main" flex="1" maxW="container.xl" py={8}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}