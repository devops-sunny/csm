'use client';

import {
  type PropsWithChildren,
  type FunctionComponent,
  type ReactNode,
} from 'react';
import type { SwipeableDrawerProps } from '@mui/material';
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Typography,
  useTheme,
} from '@mui/material';

import ChevronDownIcon from '@assets/icons/common/chevron-down.svg';

export type MobileBottomDrawerProps = SwipeableDrawerProps &
  PropsWithChildren<{
    title?: string;
    showCloseArrow?: boolean;
    closeIcon?: ReactNode;
    anchorGap?: number;
    noHeader?: boolean;
  }>;

export const MobileDrawer: FunctionComponent<MobileBottomDrawerProps> = ({
  title,
  showCloseArrow = true,
  closeIcon,
  anchorGap = 0,
  anchor,
  onClose,
  noHeader,
  children,
  sx,
  ...restDrawerProps
}) => {
  const theme = useTheme();

  return (
    <SwipeableDrawer
      sx={{
        height: '100%',
        borderRadius: 0,
        zIndex: theme.zIndex.appBar,
        display: 'none',
        '& .MuiDrawer-paper': {
          borderRadius: 0,
          backgroundColor: 'transparent',
          overflow: 'unset',
          [anchor as string]: anchorGap,
        },
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
        ...sx,
      }}
      onClose={onClose}
      anchor={anchor}
      {...restDrawerProps}
    >
      {!noHeader && (
        <Box
          sx={{
            backgroundColor: theme.palette.azure,
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            px: 2,
          }}
        >
          {showCloseArrow && (
            <IconButton
              size="icon-only"
              onClick={onClose}
              sx={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {closeIcon ?? <ChevronDownIcon />}
            </IconButton>
          )}
          <Typography
            sx={{
              fontSize: 18,
              lineHeight: '20px',
              textAlign: 'center',
              width: '100%',
              color: theme.palette.white,
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ backgroundColor: theme.palette.catskillWhite }}>
        {children}
      </Box>
    </SwipeableDrawer>
  );
};
