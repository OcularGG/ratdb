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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { useAlert } from '../../contexts/AlertContext';

const CommentModeration: React.FC = () => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  const [modDialog, setModDialog] = useState<{
    open: boolean;
    comment: any | null;
    reason: string;
  }>({
    open: false,
    comment: null,
    reason: '',
  });

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data, count, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:user_id(email),
          report:report_id(id, rat_name)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

      if (error) throw error;
      setComments(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page, rowsPerPage]);

  const handleModerate = async (approve: boolean) => {
    if (!modDialog.comment) return;

    try {
      const { error } = await supabase
        .from('comments')
        .update({
          hidden: !approve,
          hidden_reason: approve ? null : modDialog.reason,
          hidden_by: approve ? null : user?.id,
        })
        .eq('id', modDialog.comment.id);

      if (error) throw error;
      showAlert(`Comment ${approve ? 'approved' : 'hidden'} successfully`, 'success');
      setModDialog({ open: false, comment: null, reason: '' });
      fetchComments();
    } catch (error) {
      showAlert('Error moderating comment', 'error');
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comment Moderation
      </Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Report</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    {new Date(comment.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{comment.user?.email}</TableCell>
                  <TableCell>
                    #{comment.report?.id} - {comment.report?.rat_name}
                  </TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={comment.hidden ? 'Hidden' : 'Visible'}
                      color={comment.hidden ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color={comment.hidden ? 'success' : 'warning'}
                      onClick={() => setModDialog({
                        open: true,
                        comment,
                        reason: comment.hidden_reason || '',
                      })}
                    >
                      {comment.hidden ? 'Approve' : 'Hide'}
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
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <Dialog
        open={modDialog.open}
        onClose={() => setModDialog({ open: false, comment: null, reason: '' })}
      >
        <DialogTitle>
          {modDialog.comment?.hidden ? 'Approve Comment' : 'Hide Comment'}
        </DialogTitle>
        <DialogContent>
          {!modDialog.comment?.hidden && (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason for hiding"
              value={modDialog.reason}
              onChange={(e) => setModDialog({
                ...modDialog,
                reason: e.target.value,
              })}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModDialog({ open: false, comment: null, reason: '' })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color={modDialog.comment?.hidden ? 'success' : 'warning'}
            onClick={() => handleModerate(!modDialog.comment?.hidden)}
          >
            {modDialog.comment?.hidden ? 'Approve' : 'Hide'} Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommentModeration;