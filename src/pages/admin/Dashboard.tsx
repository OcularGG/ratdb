import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Comment as CommentIcon,
  Report as ReportIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import all admin components
import Overview from './sections/Overview';
import CommentModeration from './sections/CommentModeration';
import CommentReports from './sections/CommentReports';
import UserManagement from './sections/UserManagement';
import PermissionManager from './sections/PermissionManager';
import SystemSettings from './sections/SystemSettings';
import ReportModeration from './sections/ReportModeration';
import ActivityLog from './sections/ActivityLog';

const DRAWER_WIDTH = 280;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  permission: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    path: '/admin',
    icon: <DashboardIcon />,
    permission: 'view_admin_dashboard',
  },
  {
    label: 'Report Moderation',
    path: '/admin/reports',
    icon: <FlagIcon />,
    permission: 'moderate_reports',
  },
  {
    label: 'Comment Moderation',
    path: '/admin/comments',
    icon: <CommentIcon />,
    permission: 'moderate_comments',
  },
  {
    label: 'Comment Reports',
    path: '/admin/comment-reports',
    icon: <ReportIcon />,
    permission: 'view_comment_reports',
  },
  {
    label: 'User Management',
    path: '/admin/users',
    icon: <PersonIcon />,
    permission: 'manage_users',
  },
  {
    label: 'Permissions',
    path: '/admin/permissions',
    icon: <SecurityIcon />,
    permission: 'manage_permissions',
  },
  {
    label: 'Activity Log',
    path: '/admin/activity',
    icon: <DashboardIcon />,
    permission: 'view_activity_log',
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: <SettingsIcon />,
    permission: 'manage_settings',
  },
];

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
      </Box>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          user?.permissions.includes(item.permission) && (
            <ListItem
              button
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => isMobile && handleDrawerToggle()}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {NAV_ITEMS.find(item => item.path === location.pathname)?.label || 'Admin'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
        }}
      >
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/reports" element={<ReportModeration />} />
          <Route path="/comments" element={<CommentModeration />} />
          <Route path="/comment-reports" element={<CommentReports />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/permissions" element={<PermissionManager />} />
          <Route path="/activity" element={<ActivityLog />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;