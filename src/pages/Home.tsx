import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';

export function Home() {
  const bgColor = useColorModeValue('white', 'gray.800');

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_server_stats');
      if (error) throw error;
      return data;
    }
  });

  return (
    <Box>
      <Heading mb={6}>Albion Online ratDB</Heading>
      <Text mb={8}>
        Track and search player behavior across all Albion Online servers.
        Our community-driven database helps maintain a healthy gaming environment.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {['WEST', 'EAST', 'EUROPE'].map((server) => (
          <Stat
            key={server}
            p={4}
            shadow="md"
            borderRadius="lg"
            bg={bgColor}
          >
            <StatLabel>{server}</StatLabel>
            <StatNumber>
              {stats?.[server.toLowerCase()]?.count ?? '...'}
            </StatNumber>
            <StatHelpText>
              Tracked Players
            </StatHelpText>
          </Stat>
        ))}
      </SimpleGrid>
    </Box>
  );
}