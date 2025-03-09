/**
 * Helper functions for the Albion ratDB application
 * @module utils/helpers
 */

import { format } from 'date-fns';
import DOMPurify from 'dompurify';

/**
 * Formats a date string to the application's standard format
 * @param date - Date to format
 * @param includeTime - Whether to include time in the formatted string
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date, includeTime = true): string => {
  const formatString = includeTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
  return format(new Date(date), formatString);
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Validates an email address format
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Time to wait in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Checks if user has required permission level
 * @param userLevel - User's permission level
 * @param requiredLevel - Required permission level
 * @returns Boolean indicating if user has required permission
 */
export const hasPermission = (
  userLevel: number,
  requiredLevel: number
): boolean => {
  return userLevel >= requiredLevel;
};

/**
 * Local storage wrapper with error handling
 */
export const storage = {
  /**
   * Sets an item in local storage
   * @param key - Storage key
   * @param value - Value to store
   */
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  /**
   * Gets an item from local storage
   * @param key - Storage key
   * @param defaultValue - Default value if key doesn't exist
   * @returns Stored value or default value
   */
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  },

  /**
   * Removes an item from local storage
   * @param key - Storage key to remove
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  },
};