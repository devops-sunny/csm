import type { FunctionComponent } from 'react';
import { useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  SwipeableDrawer,
  type BoxProps,
  type SwipeableDrawerProps,
  type Theme,
} from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import CloseIcon from '@assets/icons/app-side-bar/close-icon.svg';
import LogoutIcon from '@assets/icons/app-side-bar/logout-icon.svg';
import { APP_SIDE_NAVS, APP_SIDE_NAV_WIDTH } from '@shared/constants/app-nav';
import { AppRoute } from '@shared/constants/app-route';
import {
  APP_SIDE_PANEL_ITEM_HEIGHT,
  APP_SIDE_PANEL_PLACEHOLDER_WIDTH,
} from '@shared/constants/layout';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { clearAuthToken } from '@shared/services/clear-auth-tokens';
import { openAppSidePanelAtom, selfProfileData } from '@shared/states/common';
import type { AppNavItem } from '@shared/types/common';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export type AppSidePanelProps = {
  sx?: SxProps<Theme>;
};

export const AppSidePanel: FunctionComponent<AppSidePanelProps> = ({ sx }) => {
  const theme = useTheme();

  const openRef = useRef(false);

  const router = useRouter();

  const isMobile = useIsMobile();

  const open = useAtomValue(openAppSidePanelAtom);

  const selfProfile = useAtomValue(selfProfileData);

  const pathname = usePathname();

  const isRootPath = pathname.split('/').length === 2;

  useEffect(() => {
    if (open && !openRef.current) {
      openRef.current = true;
    }
  }, [open]);

  if (!isRootPath) {
    return null;
  }

  const handleToggleOpen = () => {
    defaultStore.set(openAppSidePanelAtom, (prev) => !prev);
  };

  const NavContainer = isMobile ? SwipeableDrawer : Box;

  const navContainerProps = {
    ...(isMobile
      ? {
          open,
          onClose: handleToggleOpen,
          onOpen: handleToggleOpen,
          PaperProps: {
            sx: {
              width: APP_SIDE_NAV_WIDTH,
              borderRadius: 0,
              overflow: 'auto',
              height: 1,
            },
          },
        }
      : {
          position: 'relative',
        }),
  } as SwipeableDrawerProps & BoxProps;

  return (
    <NavContainer {...navContainerProps}>
      <Box
        sx={{
          width: APP_SIDE_PANEL_PLACEHOLDER_WIDTH,
          minHeight: `${APP_SIDE_NAVS.length * APP_SIDE_PANEL_ITEM_HEIGHT}px`,
          height: 1,
          cursor: 'pointer',
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      />
      <Box
        sx={{
          zIndex: theme.zIndex.appBar,
          position: 'absolute',
          inset: 0,
          overflowX: 'hidden',
          display: 'flex',
          justifySelf: 'stretch',
          flexFlow: 'column',
          backgroundColor: theme.palette.oxfordBlue,
          boxSizing: 'border-box',
          width: APP_SIDE_PANEL_PLACEHOLDER_WIDTH,
          transition: theme.transitions.easing.easeInOut,
          transitionDuration: `${theme.transitions.duration.standard}ms`,
          '&:hover': {
            width: APP_SIDE_NAV_WIDTH,
          },
          [theme.breakpoints.down('md')]: {
            width: APP_SIDE_NAV_WIDTH,
            height: 1,
            overflow: 'auto',
            display: open || openRef.current ? 'flex' : 'none',
          },
          ...sx,
        }}
      >
        <Box
          sx={{
            px: 2,
            pb: 3,
            pt: 6,
            position: 'relative',
            display: 'none',
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <IconButton
            size="icon-only"
            sx={{
              color: theme.palette.blackCoralPearl,
              position: 'absolute',
              left: 16,
              top: 48,
            }}
            onClick={handleToggleOpen}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            src={selfProfile?.profilePicture ?? ''}
            sx={{ width: 64, height: 64 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 500,
              lineHeight: 1.725,
              color: theme.palette.blackCoralPearl,
              mb: 2,
              mt: 1.5,
            }}
          >
            {getNormalizeFullName(
              selfProfile?.firstName,
              selfProfile?.lastName,
            )}
          </Typography>
          <Divider
            sx={{ borderColor: theme.palette.blackCoralPearl, width: '100%' }}
          />
        </Box>
        {APP_SIDE_NAVS.map((item: AppNavItem) => {
          const Icon = item.icon;

          const isActive = pathname === item.path;

          return (
            <Button
              disabled={item.disabled}
              key={item.id}
              LinkComponent={NextLink}
              href={item.path}
              variant="text"
              onClick={handleToggleOpen}
              sx={{
                width: APP_SIDE_NAV_WIDTH,
                justifyContent: 'start',
                height: 37,
                py: 3.25,
                color: theme.palette.blackCoralPearl,
                '&.MuiButton-root.Mui-disabled': {
                  opacity: 0.3,
                  color: theme.palette.blackCoralPearl,
                },
                ':hover': {
                  color: theme.palette.blueberry,
                  '.active-indicator': {
                    backgroundColor: theme.palette.blueberry,
                  },
                  '.menu-title': {
                    color: theme.palette.white,
                    transition: 'color 0.3s',
                  },
                },
                ...(isActive && {
                  color: theme.palette.blueberry,
                  '.active-indicator': {
                    backgroundColor: theme.palette.blueberry,
                  },
                  '.menu-title': {
                    color: theme.palette.white,
                  },
                }),
                [theme.breakpoints.down('md')]: {
                  py: 1.5,
                },
              }}
            >
              <Box
                component="span"
                className="active-indicator"
                sx={{
                  height: 37,
                  width: 3,
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.3s',
                  borderRadius: 20,
                  mr: 1.5,
                }}
              />
              <Icon />
              <Typography
                className="menu-title"
                sx={{
                  ml: 3,
                  textWrap: 'nowrap',
                  color: theme.palette.blackCoralPearl,
                  fontSize: 14,
                  [theme.breakpoints.down('md')]: {
                    fontSize: 16,
                  },
                }}
              >
                {item.title}
              </Typography>
            </Button>
          );
        })}
        <Box
          display={{ xs: 'block', md: 'none' }}
          sx={{
            mt: 'auto',
            pt: 3,
            px: 2,
          }}
        >
          <Divider
            sx={{
              borderColor: theme.palette.blackCoralPearl,
              mx: 'auto',
              mt: 4,
              mb: 3,
            }}
          />

          <Button
            variant="text"
            sx={{
              display: 'flex',
              gap: 3,
              color: theme.palette.blackCoralPearl,
              mb: 3,
            }}
            onClick={() => {
              clearAuthToken();
              router.push(AppRoute.Login);
            }}
          >
            <LogoutIcon />
            <Typography
              variant="h3"
              sx={{ fontWeight: 400, color: theme.palette.blackCoralPearl }}
            >
              Logout
            </Typography>
          </Button>
        </Box>
      </Box>
    </NavContainer>
  );
};
