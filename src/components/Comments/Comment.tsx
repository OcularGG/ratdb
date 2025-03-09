// Add to imports
import ReportCommentDialog from './ReportCommentDialog';

const Comment: React.FC<CommentProps> = ({ comment, onUpdate, depth = 0 }) => {
  // Add to existing state
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // Add to the menu items in the MoreVert menu
  <MenuItem
    onClick={() => {
      setReportDialogOpen(true);
      setAnchorEl(null);
    }}
  >
    Report
  </MenuItem>

  // Add before the closing tag
  <ReportCommentDialog
    open={reportDialogOpen}
    onClose={() => setReportDialogOpen(false)}
    commentId={comment.id}
  />
};