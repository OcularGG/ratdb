import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import { Search, FilterList, Clear } from '@mui/icons-material';

interface SearchFilters {
  dateRange: {
    start: string;
    end: string;
  };
  servers: string[];
  types: string[];
  verified: boolean | null;
  reporterId: string;
}

const AdvancedSearch: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: { start: '', end: '' },
    servers: [],
    types: [],
    verified: null,
    reporterId: '',
  });
  const [expanded, setExpanded] = useState(false);

  // Implementation details...

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* Search implementation */}
    </Paper>
  );
};

export default AdvancedSearch;