import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initializeSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      tracesSampleRate: 1.0,
      
      // Set sampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      sampleRate: 1.0,
      
      // Only send errors in production
      enabled: process.env.NODE_ENV === 'production',
      
      // Configure environment
      environment: process.env.NODE_ENV,
      
      // Set maxBreadcrumbs to control how many console logs/network requests to track
      maxBreadcrumbs: 50,

      // Adjust this value to control how many errors to send
      maxValueLength: 250
    });
  }
};