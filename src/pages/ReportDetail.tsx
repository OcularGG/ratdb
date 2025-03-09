import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Share as ShareIcon,
  Gavel as GavelIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAlert } from '../contexts/AlertContext';

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any>(null);
  const [appealOpen, setAppealOpen] = useState(false);
  const [appealText, setAppealText] = useState('');
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('rat_reports')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setReport(data);
    } catch (error) {
      showAlert('Report not found', 'error');
      navigate('/');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showAlert('Link copied to clipboard', 'success');
    } catch (error) {
      showAlert('Failed to copy link', 'error');
    }
  };

  const handleAppealSubmit = async () => {
    // Implement appeal submission logic here
    showAlert('Appeal submitted successfully', 'success');
    setAppealOpen(false);
    setAppealText('');
  };

  if (!report) return null;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">
            Report #{id}
            {report.verified && (
              <VerifiedIcon sx={{ ml: 1, color: 'success.main' }} />
            )}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{ mr: 2 }}
            >
              Share
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<GavelIcon />}
              onClick={() => setAppealOpen(true)}
            >
              Appeal
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Rat Details
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{report.rat_name}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Aliases
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {report.aliases?.map((alias: string) => (
                  <Chip key={alias} label={alias} size="small" />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Discord
              </Typography>
              <Typography variant="body1">{report.discord_main}</Typography>
              {report.discord_alts?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Alt Discord Accounts
                  </Typography>
                  {report.discord_alts.map((alt: string) => (
                    <Typography key={alt} variant="body2">
                      {alt}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Incident Details
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Date & Server
              </Typography>
              <Typography variant="body1">
                {new Date(report.incident_date).toLocaleDateString()} on {report.server}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Type
              </Typography>
              <Chip
                label={report.type.replace('_', ' ')}
                color={
                  report.type === 'MAMMOTH_SCAM' ? 'error' :
                  report.type === 'SCAM' ? 'warning' : 'default'
                }
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Details
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {report.details}
              </Typography>
            </Box>

            {report.evidence_links?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Evidence
                </Typography>
                {report.evidence_links.map((link: string) => (
                  <Link
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            Reported by {report.reporter_name} on{' '}
            {new Date(report.report_timestamp).toLocaleString()}
          </Typography>
        </Box>
      </Paper>

      <Dialog open={appealOpen} onClose={() => setAppealOpen(false)}>
        <DialogTitle>Submit Appeal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            label="Appeal Reason"
            fullWidth
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAppealOpen(false)}>Cancel</Button>
          <Button onClick={handleAppealSubmit} variant="contained">
            Submit Appeal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportDetail;