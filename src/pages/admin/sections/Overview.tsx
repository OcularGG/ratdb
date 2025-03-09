import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  Flag as FlagIcon,
  Comment as CommentIcon,
  Person as PersonIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { supabase } from '../../../lib/supabaseClient';

interface StatsCard {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    totalComments: 0,
    pendingCommentReports: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: totalReports },
        { count: pendingReports },
        { count: totalComments },
        { count: pendingCommentReports },
        { count: activeUsers },
      ] = await Promise.all([
        supabase.from('rat_reports').select('*', { count: 'exact' }),
        supabase.from('rat_reports').select('*', { count: 'exact' }).eq('status', 'PENDING'),
        supabase.from('comments').select('*', { count: 'exact' }),
        supabase.from('comment_reports').select('*', { count: 'exact' }).eq('status', 'PENDING'),
        supabase.from('users').select('*', { count: 'exact' }).eq('active', true),
      ]);

      setStats({
        totalReports: totalReports || 0,
        pendingReports: pendingReports || 0,
        totalComments: totalComments || 0,
        pendingCommentReports: pendingCommentReports || 0,
        activeUsers: activeUsers || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards: StatsCard[] = [
    {
      title: 'Total Reports',
      value: stats.totalReports,
      icon: <FlagIcon />,
      color: '#4caf50',
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      icon: <ReportIcon />,
      color: '#ff9800',
    },
    {
      title: 'Total Comments',
      value: stats.totalComments,
      icon: <CommentIcon />,
      color: '#2196f3',
    },
    {
      title: 'Pending Comment Reports',
      value: stats.pendingCommentReports,
      icon: <ReportIcon />,
      color: '#f44336',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <PersonIcon />,
      color: '#9c27b0',
    },
  ];

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: `${card.color}20`,
                    p: 1,
                    borderRadius: 1,
                    mr: 2,
                  }}
                >
                  {React.cloneElement(card.icon, { sx: { color: card.color } })}
                </Box>
                <Typography variant="h6" color="text.secondary">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="h3">
                {card.value.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add additional sections like recent activity, charts, etc. */}
    </Box>
  );
};

export default Overview;