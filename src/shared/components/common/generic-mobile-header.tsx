import type { FunctionComponent } from 'react';
import { IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/system';
import { Box } from '@mui/system';

import ChevronDownIcon from '@assets/icons/common/chevron-down.svg';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';

export type GenericMobileHeaderProps = {
  onBack: () => void;
  title?: string;
  sx?: SxProps<Theme>;
};

export const GenericMobileHeader: FunctionComponent<
  GenericMobileHeaderProps
> = ({ onBack, title, sx }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: APP_MOBILE_HEADER_HEIGHT,
        py: 0,
        px: 2,
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'grid',
        gap: 2,
        backgroundColor: theme.palette.cello,
        gridTemplateColumns: '1fr auto 1fr',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <IconButton
        onClick={onBack}
        size="icon-only"
        sx={{
          rotate: '90deg',
          color: theme.palette.azure,
          '&:hover': {
            color: theme.palette.azure,
          },
        }}
      >
        <ChevronDownIcon />
      </IconButton>
      <Typography
        sx={{
          color: theme.palette.white,
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
        noWrap
      >
        {title}
      </Typography>
    </Box>
  );
};
