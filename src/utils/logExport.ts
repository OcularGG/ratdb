import { loggingService } from '../services/LoggingService';
import { format } from 'date-fns';

interface ExportOptions {
  format: 'csv' | 'json';
  filters: {
    startDate?: Date;
    endDate?: Date;
    actionTypes?: string[];
    severity?: string[];
    resourceType?: string;
    resourceId?: string;
  };
}

export const exportLogs = async (options: ExportOptions) => {
  try {
    const { data } = await loggingService.getBulkLogs({
      ...options.filters,
      limit: 10000, // Adjust based on your needs
    });

    if (options.format === 'csv') {
      const csvContent = convertLogsToCSV(data);
      downloadFile(csvContent, 'text/csv', `activity_logs_${format(new Date(), 'yyyyMMdd')}.csv`);
    } else {
      const jsonContent = JSON.stringify(data, null, 2);
      downloadFile(jsonContent, 'application/json', `activity_logs_${format(new Date(), 'yyyyMMdd')}.json`);
    }
  } catch (error) {
    console.error('Error exporting logs:', error);
    throw error;
  }
};

const convertLogsToCSV = (logs: any[]) => {
  const headers = ['Timestamp', 'Action', 'Severity', 'Resource Type', 'Resource ID', 'User ID', 'IP Address'];
  const rows = logs.map(log => [
    format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
    log.action_type,
    log.severity,
    log.resource_type || '',
    log.resource_id || '',
    log.user_id || '',
    log.ip_address || ''
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
};

const downloadFile = (content: string, type: string, filename: string) => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};