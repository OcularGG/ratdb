import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Permission } from '../../types/permissions';
import { supabase } from '../../lib/supabaseClient';
import { useAlert } from '../../contexts/AlertContext';

interface PermissionManagerProps {
  userId?: string; // If provided, manages permissions for specific user
}

const PermissionManager: React.FC<PermissionManagerProps> = ({ userId }) => {
  const { showAlert } = useAlert();
  const [groups, setGroups] = useState<any[]>([]);
  const [userPermissions, setUserPermissions] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);

  useEffect(() => {
    fetchGroups();
    if (userId) {
      fetchUserPermissions();
    }
  }, [userId]);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from('permission_groups')
      .select('*')
      .order('priority', { ascending: false });

    if (error) {
      showAlert('Error fetching permission groups', 'error');
      return;
    }
    setGroups(data);
  };

  const fetchUserPermissions = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('user_permissions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found error
      showAlert('Error fetching user permissions', 'error');
      return;
    }
    setUserPermissions(data || {
      user_id: userId,
      group_ids: [],
      granted_permissions: [],
      denied_permissions: [],
    });
  };

  const handlePermissionToggle = async (permission: Permission) => {
    if (!userId || !userPermissions) return;

    const granted = userPermissions.granted_permissions;
    const denied = userPermissions.denied_permissions;

    let newGranted = [...granted];
    let newDenied = [...denied];

    if (granted.includes(permission)) {
      newGranted = granted.filter(p => p !== permission);
      newDenied.push(permission);
    } else if (denied.includes(permission)) {
      newDenied = denied.filter(p => p !== permission);
    } else {
      newGranted.push(permission);
    }

    try {
      const { error } = await supabase
        .from('user_permissions')
        .upsert({
          user_id: userId,
          granted_permissions: newGranted,
          denied_permissions: newDenied,
          group_ids: userPermissions.group_ids,
        });

      if (error) throw error;

      setUserPermissions({
        ...userPermissions,
        granted_permissions: newGranted,
        denied_permissions: newDenied,
      });

      showAlert('Permissions updated successfully', 'success');
    } catch (error) {
      showAlert('Error updating permissions', 'error');
    }
  };

  const handleGroupToggle = async (groupId: string) => {
    if (!userId || !userPermissions) return;

    const currentGroups = userPermissions.group_ids || [];
    const newGroups = currentGroups.includes(groupId)
      ? currentGroups.filter(id => id !== groupId)
      : [...currentGroups, groupId];

    try {
      const { error } = await supabase
        .from('user_permissions')
        .upsert({
          user_id: userId,
          group_ids: newGroups,
          granted_permissions: userPermissions.granted_permissions,
          denied_permissions: userPermissions.denied_permissions,
        });

      if (error) throw error;

      setUserPermissions({
        ...userPermissions,
        group_ids: newGroups,
      });

      showAlert('User groups updated successfully', 'success');
    } catch (error) {
      showAlert('Error updating user groups', 'error');
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Permission Groups
        </Typography>
        <List>
          {groups.map((group) => (
            <ListItem key={group.id}>
              <ListItemText
                primary={group.name}
                secondary={`Priority: ${group.priority}`}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={`${group.permissions.length} permissions`}
                  size="small"
                />
                <Chip
                  label={group.color}
                  size="small"
                  style={{ backgroundColor: group.color }}
                />
                {userId && (
                  <Switch
                    checked={userPermissions?.group_ids?.includes(group.id)}
                    onChange={() => handleGroupToggle(group.id)}
                  />
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Individual Permissions
        </Typography>
        <List>
          {Object.values(Permission).map((permission) => (
            <ListItem key={permission}>
              <ListItemText
                primary={permission.replace(/_/g, ' ')}
                secondary={getPermissionDescription(permission)}
              />
              {userId && (
                <ListItemSecondaryAction>
                  <Switch
                    checked={userPermissions?.granted_permissions?.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    color={userPermissions?.denied_permissions?.includes(permission) ? 'error' : 'success'}
                  />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PermissionManager;