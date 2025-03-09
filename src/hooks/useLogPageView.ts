import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loggingService } from '../services/LoggingService';
import { useAuth } from '../contexts/AuthContext';

export const useLogPageView = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const logPageView = async () => {
      await loggingService.log({
        action_type: 'PAGE_VIEW',
        user_id: user?.id,
        resource_type: 'route',
        resource_id: location.pathname,
        metadata: {
          search: location.search,
          hash: location.hash,
          referrer: document.referrer,
        },
      });
    };

    logPageView();
  }, [location, user]);
};