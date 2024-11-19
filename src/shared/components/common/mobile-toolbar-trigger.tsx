'use client';

import { type FunctionComponent, type ReactNode } from 'react';
import { Button, Typography, useTheme } from '@mui/material';

export type MobileToolbarTriggerProps = {
  onClick?: () => void;
  active?: boolean;
  text: string;
  Icon: ReactNode;
};

export const MobileToolbarTrigger: FunctionComponent<
  MobileToolbarTriggerProps
> = ({ onClick, active, text, Icon }) => {
  const theme = useTheme();

  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 'fit-content',
        gap: 0.25,
        height: 40,
        color: theme.palette.azure,
        '& svg': {
          flexShrink: 0,
          transition: 'color 0.2s',
          ...(active && {
            color: theme.palette.blueberry,
          }),
        },
        '&:active': {
          color: theme.palette.blueberry,
        },
      }}
    >
      {Icon}
      <Typography
        sx={{
          lineHeight: 1,
          letterSpacing: 0.25,
          color: 'inherit',
          transition: 'color 0.2s',
          mt: 0.5,
          ...(active && {
            color: theme.palette.white,
          }),
          [theme.breakpoints.down('md')]: {
            fontSize: 12,
          },
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};
