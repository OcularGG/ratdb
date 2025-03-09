import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { useAlert } from '../../contexts/AlertContext';

const CommentReports: React.FC = () => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    report: any | null;
    action: string;
  }>({
    open: false,
    report: null,
    action: '',
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, count, error } = await supabase
        .from('comment_reports')
        .select(`
          *,
          reporter:reporter_id(email),
          comment:comment_id(
            id,
            content,
            user_id(email)
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

      if (error) throw error;
      setReports(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, rowsPerPage]);

  const handleAction = async (dismiss: boolean) => {
    if (!actionDialog.report) return;

    try {
      const updates = {
        status: dismiss ? 'DISMISSED' : 'REVIEWED',
        reviewed_by: user?.id,
        reviewed_at: new Date().toISOString(),
        action_taken: actionDialog.action,
      };

      const { error } = await supabase
        .from('comment_reports')
        .update(updates)
        .eq('id', actionDialog.report.id);

      if (error) throw error;

      if (!dismiss) {
        // Hide the reported comment
        await supabase
          .from('comments')
          .update({
            hidden: true,
            hidden_reason: `Report action: ${actionDialog.action}`,
            hidden_by: user?.id,
          })
          .eq('id', actionDialog.report.comment.id);
      }

      showAlert('Report handled successfully', 'success');
      setActionDialog({ open: false, report: null, action: '' });
      fetchReports();
    } catch (error) {
      showAlert('Error handling report', 'error');
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comment Reports
      </Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    {new Date(report.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{report.reporter?.email}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {report.reason_type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {report.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ 
                      __html: report.comment?.content 
                    }} />
                    <Typography variant="caption" color="text.secondary">
                      by {report.comment?.user_id.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      color={
                        report.status === 'PENDING' ? 'warning' :
                        report.status === 'REVIEWED' ? 'error' :
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {report.status === 'PENDING' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          color="warning"
                          onClick={() => setActionDialog({
                            open: true,
                            report,
                            action: '',
                          })}
                        >
                          Take Action
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleAction(true)}
                        >
                          Dismiss
                        </Button>
                      </Box>
                    )}
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
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <Dialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, report: null, action: '' })}
      >
        <DialogTitle>Take Action on Report</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Action taken"
            value={actionDialog.action}
            onChange={(e) => setActionDialog({
              ...actionDialog,
              action: e.target.value,
            })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setActionDialog({ open: false, report: null, action: '' })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleAction(false)}
            disabled={!actionDialog.action}
          >
            Take Action
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommentReports;