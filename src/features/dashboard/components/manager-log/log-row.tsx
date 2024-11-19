import type { FunctionComponent } from 'react';
import { Avatar, Box, IconButton, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '@assets/icons/common/chevron-left.svg';
import { AppRoute } from '@shared/constants/app-route';
import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';
import { MODULE_ID_PREFIX } from '@shared/constants/managers-log';
import type { ApiType } from '@shared/types/utils/api';
import { replacePathSegments } from '@shared/utils/replace-path-segments';

export type LogRowProps = {
  taggedEntry: ApiType['TaggedEntry'];
};

export const LogRow: FunctionComponent<LogRowProps> = ({ taggedEntry }) => {
  const theme = useTheme();

  const router = useRouter();

  const {
    sectionId,
    managerLogId,
    facilityId,
    facilityName,
    createdAt,
    sectionName,
  } = taggedEntry;

  const handleOpenLog = () => {
    if (!facilityId || !managerLogId) {
      return;
    }

    const editUrl = replacePathSegments(AppRoute.ManagersLogDetail, {
      logId: managerLogId.toString(),
    });

    const logUrl = new URL(editUrl, window.location.origin);

    logUrl.searchParams.set('facilityId', facilityId.toString());

    logUrl.hash = MODULE_ID_PREFIX + String(sectionId ?? '');

    router.push(logUrl.toString());
  };

  return (
    <Box
      className="log-row"
      sx={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr auto',
        boxSizing: 'border-box',
        minHeight: 'calc(100% / 5)',
      }}
    >
      <Box sx={{ display: 'flex', py: 1.5, alignItems: 'center' }}>
        <Avatar sx={{ mt: 0.75, mr: 1.25, width: 32, height: 32 }} />
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, width: 140 }}
              noWrap
            >
              {facilityName}
            </Typography>
            <Typography
              noWrap
              sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}
            >
              {sectionName}
            </Typography>
          </Box>
          <Typography sx={{ mr: 3.5, fontSize: 14 }}>
            {dayjs(createdAt).format(US_SHORT_DATE_FORMAT)}
          </Typography>
        </Box>
      </Box>
      <IconButton
        size="icon-only"
        sx={{
          rotate: '180deg',
          color: theme.palette.azure,
        }}
        onClick={handleOpenLog}
      >
        <SvgIcon sx={{ fontSize: 14 }}>
          <ChevronLeftIcon />
        </SvgIcon>
      </IconButton>
    </Box>
  );
};
