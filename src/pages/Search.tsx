import React from 'react';
import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { searchPlayers } from '../utils/supabase';
import { SearchBar } from '../components/SearchBar';
import { PlayerCard } from '../components/PlayerCard';
import type { Player } from '../types';

export function Search() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => searchPlayers(searchTerm),
    enabled: searchTerm.length > 2
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch search results',
        status: 'error',
        duration: 5000,
      });
    }
  }, [error, toast]);

  const handleSearch = () => {
    if (searchTerm.length < 3) {
      toast({
        title: 'Invalid Search',
        description: 'Please enter at least 3 characters',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading mb={6}>Search Players</Heading>
      
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Search by player name..."
      />

      {data && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {data.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}