'use client';

import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

export default function OfflinePage() {
  const theme = useTheme();

  const handleClickTryAgain = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/assets/images/auth-background.svg)',
        backgroundSize: 'cover',
        width: '100dvw',
        height: '100dvh',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Stack
        sx={{
          color: theme.palette.white,
          display: 'grid',
          placeItems: 'center',
          mx: 5,
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: 30,
            fontWeight: 500,
            color: theme.palette.white,
            mb: 1,
          }}
        >
          Whoops!!!
        </Typography>
        <Typography
          textAlign="center"
          sx={{ color: theme.palette.white, fontSize: 14, mb: 5 }}
        >
          You are offline.
          <br />
          Please check your internet connection and try again.
        </Typography>
        <Button
          sx={{
            minWidth: 320,
            mx: 'auto',
            textTransform: 'uppercase',
          }}
          onClick={handleClickTryAgain}
        >
          Try Again
        </Button>
      </Stack>
    </Box>
  );
}
