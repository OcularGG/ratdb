/**
 * Core type definitions for the Albion ratDB application
 * @module types
 */

/**
 * Permission levels available in the application
 * Follows a hierarchical structure where higher numbers include lower permissions
 */
export enum PermissionLevel {
  USER = 1,        // Basic user permissions
  MODERATOR = 2,   // Moderator permissions
  ADMIN = 3        // Administrator permissions
}

/**
 * Standard API response format
 * @template T - The type of data being returned
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * Base user interface containing common user properties
 */
export interface BaseUser {
  id: string;
  email: string;
  created_at: string;
  last_login?: string;
  permission_level: PermissionLevel;
  is_active: boolean;
}

/**
 * Report status types
 */
export type ReportStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'APPEALED';

/**
 * Base report interface containing common report properties
 */
export interface Report {
  id: number;
  rat_name: string;
  server: string;
  evidence: string;
  description: string;
  reporter_id: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
  verified_by?: string;
  verified_at?: string;
}

/**
 * Comment interface with all comment properties
 */
export interface Comment {
  id: string;
  report_id: number;
  user_id: string;
  parent_id?: string;
  content: string;
  raw_content: string;
  edited: boolean;
  hidden: boolean;
  hidden_reason?: string;
  hidden_by?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Activity log entry interface
 */
export interface ActivityLog {
  id: string;
  action_type: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  user_id?: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}