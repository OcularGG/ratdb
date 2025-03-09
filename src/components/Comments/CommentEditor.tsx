import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../contexts/AuthContext';
import { useAlert } from '../../contexts/AlertContext';

interface CommentEditorProps {
  reportId: number;
  parentId?: string;
  onCommentSubmitted: () => void;
  initialContent?: string;
  isEditing?: boolean;
  commentId?: string;
  onCancelEdit?: () => void;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  reportId,
  parentId,
  onCommentSubmitted,
  initialContent = '',
  isEditing = false,
  commentId,
  onCancelEdit,
}) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'code-block'
  ];

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    setLoading(true);
    try {
      if (isEditing && commentId) {
        const { error } = await supabase
          .from('comments')
          .update({
            content: content.trim(),
            raw_content: JSON.stringify(content),
            edited: true,
          })
          .eq('id', commentId);

        if (error) throw error;
        showAlert('Comment updated successfully', 'success');
      } else {
        const { error } = await supabase
          .from('comments')
          .insert([{
            report_id: reportId,
            user_id: user.id,
            parent_id: parentId,
            content: content.trim(),
            raw_content: JSON.stringify(content),
          }]);

        if (error) throw error;
        showAlert('Comment added successfully', 'success');
        setContent('');
      }

      onCommentSubmitted();
    } catch (error) {
      showAlert('Error submitting comment', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your comment..."
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        {isEditing && onCancelEdit && (
          <Button
            onClick={onCancelEdit}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
        >
          {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentEditor;