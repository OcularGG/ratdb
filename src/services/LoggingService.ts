import { supabase } from '../lib/supabaseClient';

export type LogActionType =
  | 'REPORT_CREATE'
  | 'REPORT_UPDATE'
  | 'REPORT_VIEW'
  | 'REPORT_VERIFY'
  | 'REPORT_APPEAL'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_REGISTER'
  | 'USER_UPDATE'
  | 'ADMIN_ACTION'
  | 'SEARCH_PERFORMED'
  | 'EXPORT_DATA'
  | 'RATING_SUBMIT'
  | 'COMMENT_ADD'
  | 'COMMENT_UPDATE'
  | 'COMMENT_DELETE';

export type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

interface LogEntry {
  action_type: LogActionType;
  severity?: LogSeverity;
  user_id?: string;
  resource_type?: string;
  resource_id?: string;
  old_values?: any;
  new_values?: any;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
}

class LoggingService {
  private static instance: LoggingService;
  private sessionId: string;

  private constructor() {
    this.sessionId = crypto.randomUUID();
  }

  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  private async getClientInfo() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return {
        ip_address: data.ip,
        user_agent: navigator.userAgent,
      };
    } catch (error) {
      console.error('Error getting client info:', error);
      return {
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
      };
    }
  }

  public async log(entry: LogEntry): Promise<void> {
    try {
      const clientInfo = await this.getClientInfo();
      
      const logEntry = {
        ...entry,
        ...clientInfo,
        session_id: this.sessionId,
        severity: entry.severity || 'INFO',
      };

      const { error } = await supabase
        .from('activity_logs')
        .insert([logEntry]);

      if (error) throw error;
    } catch (error) {
      console.error('Error creating log entry:', error);
      // Fallback to console logging if database logging fails
      console.log('Log Entry:', entry);
    }
  }

  public async getBulkLogs(options: {
    startDate?: Date;
    endDate?: Date;
    actionTypes?: LogActionType[];
    severity?: LogSeverity[];
    userId?: string;
    resourceType?: string;
    resourceId?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('activity_logs')
      .select('*', { count: 'exact' });

    if (options.startDate) {
      query = query.gte('created_at', options.startDate.toISOString());
    }
    if (options.endDate) {
      query = query.lte('created_at', options.endDate.toISOString());
    }
    if (options.actionTypes?.length) {
      query = query.in('action_type', options.actionTypes);
    }
    if (options.severity?.length) {
      query = query.in('severity', options.severity);
    }
    if (options.userId) {
      query = query.eq('user_id', options.userId);
    }
    if (options.resourceType) {
      query = query.eq('resource_type', options.resourceType);
    }
    if (options.resourceId) {
      query = query.eq('resource_id', options.resourceId);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(
        options.offset || 0,
        (options.offset || 0) + (options.limit || 50) - 1
      );

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, count };
  }

  public async getAuditTrail(resourceType: string, resourceId: string) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  public async getUserActivity(userId: string) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data;
  }
}

export const loggingService = LoggingService.getInstance();