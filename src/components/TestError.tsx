import React from 'react';

export const TestError: React.FC = () => {
  const throwError = () => {
    throw new Error('Test error for Sentry');
  };

  return (
    <button onClick={throwError}>
      Test Sentry Error
    </button>
  );
};