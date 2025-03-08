import React from 'react';
import { Box, Heading, Text, Badge, useColorModeValue } from '@chakra-ui/react';
import type { Player } from '../../types';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={bgColor}
    >
      <Heading size="md" mb={2}>{player.name}</Heading>
      <Badge colorScheme="blue" mb={2}>{player.server}</Badge>
      <Text fontSize="sm" color="gray.500">
        Added: {new Date(player.created_at).toLocaleDateString()}
      </Text>
    </Box>
  );
}