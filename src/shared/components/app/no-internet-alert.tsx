'use client';

import { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import toast from 'react-hot-toast';

export const NoInternetAlert = () => {
  const theme = useTheme();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);

      toast.dismiss(); // Dismiss any existing network error toasts
    };

    const handleOffline = () => {
      setIsOnline(false);

      toast.error('Network error: No internet connection');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Box
      sx={{
        borderRadius: 1,
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        p: 2,
        backgroundColor: theme.palette.salmonPearl,
        color: theme.palette.white,
        zIndex: theme.zIndex.snackbar,
        whiteSpace: 'nowrap',
        display: isOnline ? 'none' : 'block',
      }}
    >
      No internet connection
    </Box>
  );
};
