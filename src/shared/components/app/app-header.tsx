import {
  Box,
  Divider,
  IconButton,
  Paper,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import ChatIcon from '@assets/icons/app-header/chat-icon.svg';
import FeedbackIcon from '@assets/icons/app-header/feedback-icon.svg';
import MenuIcon from '@assets/icons/app-header/menu-icon.svg';
import NotificationIcon from '@assets/icons/app-header/notification-icon.svg';
import { CurrentUser } from '@shared/components/app/current-user';
import {
  APP_HEADER_HEIGHT,
  APP_MOBILE_HEADER_HEIGHT,
} from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { openAppSidePanelAtom, selfProfileData } from '@shared/states/common';
import {
  openFeedbackDrawerAtom,
  mobileOpenFeedbackDrawerAtom,
} from '@shared/states/modals-drawers';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';
import { getTitleFromPath } from '@shared/utils/get-title-from-path';

export const AppHeader = () => {
  const theme = useTheme();

  const pathname = usePathname();

  const selfProfile = useAtomValue(selfProfileData);

  const headerTitle = getTitleFromPath(pathname);

  const isRootPath = pathname.split('/').length === 2;

  return (
    <Paper
      sx={{
        flexShrink: 0,
        height: APP_HEADER_HEIGHT,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.white,
        borderRadius: 0,
        pr: 1.25,
        pl: 1.5,
        zIndex: theme.zIndex.appBar,
        [theme.breakpoints.down('md')]: {
          backgroundColor: theme.palette.cello,
          px: 0,
          height: APP_MOBILE_HEADER_HEIGHT,
          alignItems: 'center',
          pt: 0,
          pb: 0,
          display: 'flex',
          position: 'fixed',
          width: '100%',
          top: 0,
          ...(!isRootPath && {
            display: 'none',
          }),
        },
      }}
    >
      <Box
        position="relative"
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <Image
          src="/assets/illustrators/app-logo.svg"
          alt="app-logo"
          height={40}
          priority
          width={100}
          quality={100}
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        }}
      >
        <IconButton
          size="icon-only"
          sx={{ p: 3 }}
          onClick={() => defaultStore.set(openAppSidePanelAtom, true)}
        >
          <SvgIcon sx={{ color: theme.palette.azure }}>
            <MenuIcon />
          </SvgIcon>
        </IconButton>
        <IconButton
          size="icon-only"
          sx={{ p: 3 }}
          onClick={() => {
            defaultStore.set(mobileOpenFeedbackDrawerAtom, true);
          }}
        >
          <SvgIcon sx={{ color: theme.palette.azure }}>
            <FeedbackIcon />
          </SvgIcon>
        </IconButton>
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'uppercase',
          color: theme.palette.shark,
          flexGrow: 1,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          [theme.breakpoints.down('md')]: {
            fontSize: 16,
            color: theme.palette.white,
          },
        }}
      >
        {headerTitle}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <IconButton
          size="icon-only"
          sx={{
            p: 3,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
          onClick={() => {
            defaultStore.set(openFeedbackDrawerAtom, true);
          }}
        >
          <SvgIcon sx={{ color: theme.palette.azure }}>
            <FeedbackIcon />
          </SvgIcon>
        </IconButton>
        <Divider
          orientation="vertical"
          sx={{
            height: 18,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        />
        <IconButton
          size="icon-only"
          sx={{ p: 3 }}
        >
          <SvgIcon sx={{ color: theme.palette.azure }}>
            <ChatIcon />
          </SvgIcon>
        </IconButton>
        <IconButton
          size="icon-only"
          sx={{ p: 3 }}
        >
          <SvgIcon sx={{ color: theme.palette.azure }}>
            <NotificationIcon />
          </SvgIcon>
        </IconButton>
        <Divider
          orientation="vertical"
          sx={{
            height: 18,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        />
        <CurrentUser
          fullName={getNormalizeFullName(
            selfProfile?.firstName,
            selfProfile?.lastName,
          )}
        />
      </Box>
    </Paper>
  );
};
