import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';

export type LoadingIndicatorProps = {
  sx?: SxProps<Theme>;
  fullScreen?: boolean;
  centered?: boolean;
};

export const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
  sx,
  fullScreen = false,
  centered = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 40,
        minWidth: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: fullScreen ? 'fixed' : 'absolute',
        ...(centered && {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }),
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.azure,

          ...sx,
        }}
      />
    </Box>
  );
};
