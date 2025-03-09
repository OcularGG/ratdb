interface ExportOptions {
  format: 'csv' | 'json';
  dateRange?: { start: string; end: string };
  includeVerifiedOnly?: boolean;
}

export const exportReports = async (options: ExportOptions) => {
  try {
    let query = supabase
      .from('rat_reports')
      .select('*');

    if (options.includeVerifiedOnly) {
      query = query.eq('verified', true);
    }

    if (options.dateRange) {
      query = query
        .gte('report_timestamp', options.dateRange.start)
        .lte('report_timestamp', options.dateRange.end);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (options.format === 'csv') {
      return convertToCSV(data);
    }

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
};