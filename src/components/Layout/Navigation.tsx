/**
 * Navigation component for sidebar menu
 * Last updated: 2025-03-09 18:33:21 UTC
 * @author OcularGG
 * @module components/layout/Navigation
 */

import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Report as ReportIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  onItemClick?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  requiredPermission?: string;
}

/**
 * Navigation menu items configuration
 */
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    label: 'Submit Report',
    path: '/submit',
    icon: <ReportIcon />,
  },
  {
    label: 'Search',
    path: '/search',
    icon: <SearchIcon />,
  },
  {
    label: 'Admin',
    path: '/admin',
    icon: <AdminIcon />,
    requiredPermission: 'view_admin_dashboard',
  },
  {
    label: 'Help',
    path: '/help',
    icon: <HelpIcon />,
  },
];

/**
 * Navigation component
 * @component
 */
const Navigation: React.FC<NavigationProps> = ({ onItemClick }) => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          Albion ratDB
        </Typography>
      </Box>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => {
          // Skip admin items if user doesn't have permission
          if (item.requiredPermission && !user?.permissions?.includes(item.requiredPermission)) {
            return null;
          }

          return (
            <ListItem
              button
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onItemClick}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Navigation;