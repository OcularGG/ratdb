import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import Layout from './components/Layout';
import Routes from './Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SupabaseProvider>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </SupabaseProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;