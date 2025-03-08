import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

/**
 * 404 Not Found page
 * Displayed when no route matches the current URL
 */
export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center">
      <Heading mb={4}>404: Page Not Found</Heading>
      <Text mb={6}>The page you're looking for doesn't exist.</Text>
      <Button onClick={() => navigate('/')}>
        Return Home
      </Button>
    </Box>
  );
}