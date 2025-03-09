-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for log types
CREATE TYPE log_action_type AS ENUM (
    'REPORT_CREATE',
    'REPORT_UPDATE',
    'REPORT_VIEW',
    'REPORT_VERIFY',
    'REPORT_APPEAL',
    'USER_LOGIN',
    'USER_LOGOUT',
    'USER_REGISTER',
    'USER_UPDATE',
    'ADMIN_ACTION',
    'SEARCH_PERFORMED',
    'EXPORT_DATA',
    'RATING_SUBMIT',
    'COMMENT_ADD',
    'COMMENT_UPDATE',
    'COMMENT_DELETE'
);

-- Create enum for log severity
CREATE TYPE log_severity AS ENUM (
    'INFO',
    'WARNING',
    'ERROR',
    'CRITICAL'
);

-- Create activity logs table
CREATE TABLE activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    action_type log_action_type NOT NULL,
    severity log_severity DEFAULT 'INFO',
    user_id UUID REFERENCES auth.users(id),
    ip_address TEXT,
    user_agent TEXT,
    resource_type TEXT, -- e.g., 'report', 'user', 'comment'
    resource_id TEXT,   -- ID of the affected resource
    old_values JSONB,   -- Previous state for update operations
    new_values JSONB,   -- New state for create/update operations
    metadata JSONB,     -- Additional contextual information
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    session_id TEXT     -- To track user session
);

-- Create indexes for better query performance
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_activity_logs_resource ON activity_logs(resource_type, resource_id);

-- Create view for admin dashboard
CREATE VIEW admin_activity_summary AS
SELECT 
    date_trunc('hour', created_at) as time_bucket,
    action_type,
    severity,
    count(*) as action_count
FROM activity_logs
GROUP BY time_bucket, action_type, severity
ORDER BY time_bucket DESC;

-- Create function to clean old logs
CREATE OR REPLACE FUNCTION clean_old_logs(days_to_keep INTEGER)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM activity_logs
    WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL
    AND severity = 'INFO'
    AND action_type NOT IN ('REPORT_CREATE', 'REPORT_VERIFY', 'REPORT_APPEAL');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;