import React from 'react';
import * as Sentry from '@sentry/react';

interface FallbackProps {
  error?: Error;
  componentStack?: string;
  eventId?: string;
  resetError?: () => void;
}

export const ErrorFallback: React.FC<FallbackProps> = ({ 
  error,
  resetError 
}) => {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error?.message}</p>
      {resetError && (
        <button onClick={resetError}>
          Try again
        </button>
      )}
      <button
        onClick={() => Sentry.showReportDialog({ eventId: Sentry.lastEventId() })}
      >
        Report feedback
      </button>
    </div>
  );
};