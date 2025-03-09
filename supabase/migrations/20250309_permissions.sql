-- Create permission groups table
CREATE TABLE permission_groups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    permissions TEXT[] NOT NULL,
    priority INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user permissions table
CREATE TABLE user_permissions (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    group_ids UUID[] NOT NULL DEFAULT '{}',
    granted_permissions TEXT[] NOT NULL DEFAULT '{}',
    denied_permissions TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create default permission groups
INSERT INTO permission_groups (name, color, permissions, priority) VALUES
    ('Admin', '#ff0000', ARRAY[
        'view_reports', 'create_reports', 'edit_reports', 'delete_reports', 'verify_reports',
        'add_comments', 'edit_comments', 'delete_comments',
        'view_users', 'edit_users', 'ban_users',
        'view_logs', 'manage_permissions', 'manage_settings',
        'view_appeals', 'handle_appeals',
        'export_data', 'view_statistics', 'manage_ratings'
    ], 1000),
    ('Moderator', '#00ff00', ARRAY[
        'view_reports', 'create_reports', 'edit_reports', 'verify_reports',
        'add_comments', 'edit_comments', 'delete_comments',
        'view_users', 'ban_users',
        'view_appeals', 'handle_appeals',
        'view_statistics'
    ], 500),
    ('Verified User', '#0000ff', ARRAY[
        'view_reports', 'create_reports',
        'add_comments',
        'view_statistics'
    ], 100);