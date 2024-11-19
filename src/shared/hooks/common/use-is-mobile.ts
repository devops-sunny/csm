'use client';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * DO NOT USE THIS HOOK IN THE SERVER SIDE OR STYLING - CLIENT LOGIC ONLY
 * @returns {boolean} isMobile
 */
export const useIsMobile = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'));
};
