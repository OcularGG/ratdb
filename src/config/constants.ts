/**
 * Application-wide constants
 * Last updated: 2025-03-09 18:31:08 UTC
 * @module config/constants
 */

/**
 * Environment-specific configuration
 */
export const CONFIG = {
  APP_NAME: 'Albion ratDB',
  API_URL: import.meta.env.VITE_API_URL,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

/**
 * Application-wide validation rules
 */
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  REPORT: {
    DESCRIPTION_MIN_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 2000,
    EVIDENCE_REQUIRED: true,
  },
} as const;

/**
 * API endpoints
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    RESET_PASSWORD: '/auth/reset-password',
  },
  REPORTS: {
    BASE: '/reports',
    CREATE: '/reports/create',
    VERIFY: '/reports/verify',
    APPEAL: '/reports/appeal',
  },
  COMMENTS: {
    BASE: '/comments',
    REPORT: '/comments/report',
    MODERATE: '/comments/moderate',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    PERMISSIONS: '/users/permissions',
  },
} as const;

/**
 * UI-related constants
 */
export const UI = {
  THEME: {
    DARK_MODE_KEY: 'darkMode',
    DEFAULT_DARK: false,
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 25,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },
  ANIMATIONS: {
    DURATION: 300,
  },
  BREAKPOINTS: {
    MOBILE: 600,
    TABLET: 960,
    DESKTOP: 1280,
  },
} as const;

/**
 * Error messages
 */
export const ERRORS = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: {
    REQUIRED: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PASSWORD: 'Password does not meet requirements.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  },
} as const;

/**
 * Time-related constants (in milliseconds)
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
  WEEK: 604800000,
  MONTH: 2592000000,
} as const;