import { initializeSentry } from './utils/sentry';
import * as Sentry from '@sentry/react';

// Initialize Sentry
initializeSentry();

// Wrap your app with Sentry's error boundary
const App = Sentry.withProfiler(() => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    <YourAppComponent />
  </Sentry.ErrorBoundary>
));