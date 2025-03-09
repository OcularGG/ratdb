import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import AlertProvider from '../../contexts/AlertContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AlertProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </AlertProvider>
  );
};

export default Layout;