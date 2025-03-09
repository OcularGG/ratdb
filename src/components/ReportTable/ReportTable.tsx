import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Tabs,
  Tab,
  Button,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Search as SearchIcon, Share as ShareIcon } from '@mui/icons-material';

interface Report {
  id: number;
  rat_name: string;
  incident_date: string;
  type: string;
  server: string;
  verified: boolean;
}

const ReportTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [serverTab, setServerTab] = useState('WEST');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchReports();
  }, [page, rowsPerPage, searchQuery, serverTab]);

  const fetchReports = async () => {
    try {
      let query = supabase
        .from('rat_reports')
        .select('*', { count: 'exact' })
        .eq('server', serverTab)
        .order('report_timestamp', { ascending: false });

      if (searchQuery) {
        query = query.or(
          `rat_name.ilike.%${searchQuery}%,` +
          `id.eq.${!isNaN(parseInt(searchQuery)) ? searchQuery : 0},` +
          `details.ilike.%${searchQuery}%`
        );
      }

      const { data, count, error } = await query
        .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

      if (error) throw error;
      setReports(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={serverTab}
          onChange={(_, newValue) => setServerTab(newValue)}
          aria-label="server tabs"
        >
          <Tab label="West" value="WEST" />
          <Tab label="East" value="EAST" />
          <Tab label="Europe" value="EUROPE" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by ID, rat name, or details..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Rat Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>#{report.id}</TableCell>
                <TableCell>{report.rat_name}</TableCell>
                <TableCell>
                  {new Date(report.incident_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={report.type.replace('_', ' ')}
                    color={
                      report.type === 'MAMMOTH_SCAM' ? 'error' :
                      report.type === 'SCAM' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={report.verified ? 'Verified' : 'Unverified'}
                    color={report.verified ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/report/${report.id}`}
                    size="small"
                    variant="outlined"
                    startIcon={<ShareIcon />}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReportTable;