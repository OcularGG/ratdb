export enum Permission {
  // Report Permissions
  VIEW_REPORTS = 'view_reports',
  CREATE_REPORTS = 'create_reports',
  EDIT_REPORTS = 'edit_reports',
  DELETE_REPORTS = 'delete_reports',
  VERIFY_REPORTS = 'verify_reports',
  
  // Comment Permissions
  ADD_COMMENTS = 'add_comments',
  EDIT_COMMENTS = 'edit_comments',
  DELETE_COMMENTS = 'delete_comments',
  
  // User Management
  VIEW_USERS = 'view_users',
  EDIT_USERS = 'edit_users',
  BAN_USERS = 'ban_users',
  
  // Admin Permissions
  VIEW_LOGS = 'view_logs',
  MANAGE_PERMISSIONS = 'manage_permissions',
  MANAGE_SETTINGS = 'manage_settings',
  
  // Appeal Permissions
  VIEW_APPEALS = 'view_appeals',
  HANDLE_APPEALS = 'handle_appeals',
  
  // Additional Features
  EXPORT_DATA = 'export_data',
  VIEW_STATISTICS = 'view_statistics',
  MANAGE_RATINGS = 'manage_ratings'
}

export interface PermissionGroup {
  id: string;
  name: string;
  color: string;
  permissions: Permission[];
  priority: number;
}

export interface UserPermissions {
  userId: string;
  groups: string[]; // Array of permission group IDs
  customPermissions: {
    granted: Permission[];
    denied: Permission[];
  };
}