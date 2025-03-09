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
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { debounce } from 'lodash';
import { supabase } from '../../lib/supabaseClient';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  tableName: string;
  columns: Column[];
  searchFields: string[];
}

const DataTable: React.FC<DataTableProps> = ({ tableName, columns, searchFields }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const fetchData = async (start: number, limit: number, search?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' });

      if (search) {
        const searchConditions = searchFields.map(field => 
          `${field}.ilike.%${search}%`
        );
        query = query.or(searchConditions.join(','));
      }

      const { data: result, count, error } = await query
        .range(start, start + limit - 1)
        .order('id', { ascending: true });

      if (error) throw error;

      setData(result || []);
      setTotal(count || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchSuggestions = async (search: string) => {
    if (!search) {
      setSearchSuggestions([]);
      return;
    }

    try {
      const suggestions = new Set<string>();
      
      for (const field of searchFields) {
        const { data, error } = await supabase
          .from(tableName)
          .select(field)
          .ilike(field, `%${search}%`)
          .limit(5);

        if (error) throw error;

        data.forEach(item => {
          if (item[field]) {
            suggestions.add(item[field]);
          }
        });
      }

      setSearchSuggestions(Array.from(suggestions));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSearchSuggestions, 300);

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage, searchQuery);
  }, [page, rowsPerPage, searchQuery]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Autocomplete
          freeSolo
          options={searchSuggestions}
          onInputChange={(_event, value) => {
            setSearchQuery(value);
            debouncedFetchSuggestions(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;