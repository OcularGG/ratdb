import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';

const SubmitReport: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rat_name: '',
    aliases: [] as string[],
    discord_main: '',
    discord_alts: [] as string[],
    incident_date: '',
    details: '',
    server: '',
    type: '',
    evidence_links: [] as string[],
  });
  const [newAlias, setNewAlias] = useState('');
  const [newDiscordAlt, setNewDiscordAlt] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('rat_reports')
        .insert([
          {
            ...formData,
            reporter_name: user.email,
            created_by: user.id,
          },
        ]);

      if (error) throw error;

      showAlert('Report submitted successfully', 'success');
      navigate('/');
    } catch (error) {
      showAlert('Error submitting report', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (field: 'aliases' | 'discord_alts' | 'evidence_links', value: string) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      [field]: [...formData[field], value.trim()],
    });
    switch (field) {
      case 'aliases':
        setNewAlias('');
        break;
      case 'discord_alts':
        setNewDiscordAlt('');
        break;
      case 'evidence_links':
        setNewLink('');
        break;
    }
  };

  const handleRemoveItem = (field: 'aliases' | 'discord_alts' | 'evidence_links', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Submit Report
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Rat Name"
                value={formData.rat_name}
                onChange={(e) => setFormData({ ...formData, rat_name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Alias"
                  value={newAlias}
                  onChange={(e) => setNewAlias(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem('aliases', newAlias);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleAddItem('aliases', newAlias)}
                        edge="end"
                      >
                        <AddIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.aliases.map((alias, index) => (
                  <Chip
                    key={index}
                    label={alias}
                    onDelete={() => handleRemoveItem('aliases', index)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Discord Username"
                value={formData.discord_main}
                onChange={(e) => setFormData({ ...formData, discord_main: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Alt Discord"
                  value={newDiscordAlt}
                  onChange={(e) => setNewDiscordAlt(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem('discord_alts', newDiscordAlt);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleAddItem('discord_alts', newDiscordAlt)}
                        edge="end"
                      >
                        <AddIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.discord_alts.map((alt, index) => (
                  <Chip
                    key={index}
                    label={alt}
                    onDelete={() => handleRemoveItem('discord_alts', index)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Incident Date"
                value={formData.incident_date}
                onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Server"
                value={formData.server}
                onChange={(e) => setFormData({ ...formData, server: e.target.value })}
              >
                <MenuItem value="WEST">West</MenuItem>
                <MenuItem value="EAST">East</MenuItem>
                <MenuItem value="EUROPE">Europe</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                label="Incident Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="THEFT">Theft</MenuItem>
                <MenuItem value="SCAM">Scam</MenuItem>
                <MenuItem value="MAMMOTH_SCAM">Mammoth Scam</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Incident Details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Evidence Link"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem('evidence_links', newLink);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleAddItem('evidence_links', newLink)}
                        edge="end"
                      >
                        <AddIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.evidence_links.map((link, index) => (
                  <Chip
                    key={index}
                    label={link}
                    onDelete={() => handleRemoveItem('evidence_links', index)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  Submit Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default SubmitReport;