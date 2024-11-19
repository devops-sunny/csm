import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import type { DialogProps } from '@mui/material';
import {
  Box,
  DialogActions,
  DialogTitle,
  SwipeableDrawer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { GenericMobileHeader } from '@shared/components/common/generic-mobile-header';
import {
  APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
  APP_MOBILE_HEADER_HEIGHT,
} from '@shared/constants/layout';

export type MobileFullScreenDrawerProps = PropsWithChildren &
  DialogProps & {
    onClose: () => void;
    onOpen: () => void;
    footerActions?: ReactNode;
  };

export const MobileFullScreenDrawer: FunctionComponent<
  MobileFullScreenDrawerProps
> = ({ children, onClose, footerActions, ...dialogProps }) => {
  const theme = useTheme();

  const { sx, onOpen, ...restDialogProps } = dialogProps;

  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={onOpen}
      anchor="right"
      SwipeAreaProps={{
        sx: {
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      }}
      sx={{
        '& > .MuiPaper-root': {
          maxHeight: '100dh',
          display: 'grid',
          gridTemplateRows: `${APP_MOBILE_HEADER_HEIGHT}px auto ${footerActions ? APP_MOBILE_FOOTER_ACTIONS_HEIGHT : 0}px`,
          borderRadius: 0,
          width: 1,
        },
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
        ...sx,
      }}
      {...restDialogProps}
    >
      <DialogTitle
        sx={{
          width: 1,
          zIndex: 1,
          p: 0,
        }}
      >
        <GenericMobileHeader
          onBack={onClose}
          title={dialogProps.title}
        />
      </DialogTitle>
      <Box
        sx={{
          width: 1,
          height: 1,
          backgroundColor: theme.palette.white,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
      {footerActions && (
        <DialogActions
          sx={{
            mt: 'auto',
            backgroundColor: theme.palette.cello,
            height: APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
            width: 1,
          }}
        >
          {footerActions}
        </DialogActions>
      )}
    </SwipeableDrawer>
  );
};
