import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ReportTable from '../components/ReportTable/ReportTable';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Albion ratDB
        </Typography>
        {user && (
          <Button
            component={RouterLink}
            to="/report/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Submit Report
          </Button>
        )}
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Track and verify scammers and thieves in Albion Online
      </Typography>
      <ReportTable />
    </Box>
  );
};

export default Home;