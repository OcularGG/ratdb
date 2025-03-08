import * as Sentry from '@sentry/react';

export const handleApiError = (error: any, context: string) => {
  Sentry.withScope((scope) => {
    scope.setExtra('context', context);
    scope.setLevel('error');
    Sentry.captureException(error);
  });
};

// Example usage in API call
export const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    handleApiError(error, 'fetchData');
    throw error;
  }
};