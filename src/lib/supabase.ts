/**
 * Supabase client configuration and type-safe database interface
 * Last updated: 2025-03-09 18:31:08 UTC
 * @module lib/supabase
 */

import { createClient } from '@supabase/supabase-js';
import { CONFIG } from '../config/constants';
import type { Database } from '../types/database';

/**
 * Initialize Supabase client with type safety
 */
export const supabase = createClient<Database>(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-application-name': CONFIG.APP_NAME,
      },
    },
  }
);

/**
 * Helper function to handle Supabase errors consistently
 * @param error - Error object from Supabase
 * @returns Formatted error message
 */
export const handleSupabaseError = (error: any): string => {
  if (CONFIG.IS_PRODUCTION) {
    // In production, don't expose detailed error messages
    console.error('Database error:', error);
    return 'An error occurred while processing your request.';
  }
  
  return error.message || 'Unknown database error';
};

/**
 * Type-safe database queries with error handling
 */
export const db = {
  /**
   * Executes a select query with proper error handling
   * @param table - Table name
   * @param query - Query configuration
   * @returns Query result or error
   */
  select: async <T>(
    table: keyof Database['public']['Tables'],
    query: {
      columns?: string;
      filters?: Record<string, any>;
      pagination?: { page: number; pageSize: number };
      orderBy?: { column: string; ascending?: boolean };
    }
  ): Promise<{ data: T[] | null; error: string | null; count: number | null }> => {
    try {
      let queryBuilder = supabase
        .from(table)
        .select(query.columns || '*', { count: 'exact' });

      // Apply filters
      if (query.filters) {
        Object.entries(query.filters).forEach(([key, value]) => {
          queryBuilder = queryBuilder.eq(key, value);
        });
      }

      // Apply pagination
      if (query.pagination) {
        const { page, pageSize } = query.pagination;
        const start = page * pageSize;
        const end = start + pageSize - 1;
        queryBuilder = queryBuilder.range(start, end);
      }

      // Apply ordering
      if (query.orderBy) {
        queryBuilder = queryBuilder.order(
          query.orderBy.column,
          { ascending: query.orderBy.ascending ?? true }
        );
      }

      const { data, error, count } = await queryBuilder;

      if (error) throw error;

      return { data, error: null, count };
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(error),
        count: null,
      };
    }
  },

  /**
   * Inserts a record with proper error handling
   * @param table - Table name
   * @param data - Data to insert
   * @returns Inserted record or error
   */
  insert: async <T>(
    table: keyof Database['public']['Tables'],
    data: Record<string, any>
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      return { data: result as T, error: null };
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(error),
      };
    }
  },

  /**
   * Updates a record with proper error handling
   * @param table - Table name
   * @param id - Record ID
   * @param data - Data to update
   * @returns Updated record or error
   */
  update: async <T>(
    table: keyof Database['public']['Tables'],
    id: string | number,
    data: Record<string, any>
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: result as T, error: null };
    } catch (error) {
      return {
        data: null,
        error: handleSupabaseError(error),
      };
    }
  },

  /**
   * Deletes a record with proper error handling
   * @param table - Table name
   * @param id - Record ID
   * @returns Success status or error
   */
  delete: async (
    table: keyof Database['public']['Tables'],
    id: string | number
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: handleSupabaseError(error),
      };
    }
  },
};

/**
 * Real-time subscription helper
 * @param table - Table name
 * @param callback - Callback function
 * @returns Subscription cleanup function
 */
export const subscribeToTable = (
  table: keyof Database['public']['Tables'],
  callback: (payload: any) => void
) => {
  const subscription = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};