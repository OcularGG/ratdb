/**
 * Alert context provider for managing application-wide notifications
 * Last updated: 2025-03-09 18:32:13 UTC
 * @author OcularGG
 * @module contexts/AlertContext
 */

import React, { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

interface AlertContextType {
  showAlert: (message: string, severity?: AlertSeverity) => void;
  closeAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

/**
 * Alert provider component
 * @component
 */
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('info');

  /**
   * Show alert with message and optional severity
   */
  const showAlert = (message: string, severity: AlertSeverity = 'info') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  /**
   * Close current alert
   */
  const closeAlert = () => {
    setOpen(false);
  };

  const value = {
    showAlert,
    closeAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeAlert} severity={severity} elevation={6} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

/**
 * Hook to use alert context
 * @returns Alert context value
 * @throws Error if used outside of AlertProvider
 */
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};