'use client';

import type { FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { deleteLogIdAtom } from '@features/managers-log-listing/states/common';
import { ContextMenu } from '@shared/components/common/context-menu';
import { RenderWeatherIcon } from '@shared/components/common/render-weather-icon';
import { AppRoute } from '@shared/constants/app-route';
import type { Weather } from '@shared/constants/managers-log';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';
import { replacePathSegments } from '@shared/utils/replace-path-segments';

export type ListingRowProps = {
  sx?: SxProps<Theme>;
  log: ApiType['LogResponse'];
};

export const ListingRow: FunctionComponent<ListingRowProps> = ({ sx, log }) => {
  const theme = useTheme();

  const router = useRouter();

  const {
    id,
    facilityId,
    facilityName,
    createdAt,
    temprature,
    weather,
    open,
    mid,
    close,
  } = log;

  if (!id || !facilityId) {
    return null;
  }

  const handleOpenLog = () => {
    const queryParams = new URLSearchParams({
      facilityId: facilityId.toString(),
    });

    const editUrl = replacePathSegments(AppRoute.ManagersLogDetail, {
      logId: id.toString(),
    });

    router.push(`${editUrl}?${queryParams.toString()}`);
  };

  return (
    <Box
      sx={{
        py: 1.25,
        px: 1.5,
        display: 'grid',
        gridTemplateColumns:
          'minmax(300px, auto) 200px 200px 200px 200px 200px',
        alignItems: 'center',
        gap: 1.5,
        minHeight: 64,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Typography
          fontWeight={500}
          noWrap
        >
          {facilityName}
        </Typography>
      </Box>
      <Typography>{dayjs(createdAt).format('ddd, MMM D, YYYY')}</Typography>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          alignItems: 'center',
          gap: 2,
        }}
      >
        <RenderWeatherIcon
          sx={{ minWidth: 24 }}
          weather={weather as Weather}
        />
        <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
          {temprature ?? '—'}
        </Typography>
      </Box>
      <Box>
        {open?.map((item) => {
          const fullName = getNormalizeFullName(item.firstName, item.lastName);

          return (
            <Typography
              key={item.id}
              textTransform="capitalize"
            >
              {fullName.toLowerCase()}
            </Typography>
          );
        }) ?? '—'}
      </Box>
      <Box>
        {mid?.map((item) => {
          const fullName = getNormalizeFullName(item.firstName, item.lastName);

          return (
            <Typography
              key={item.id}
              textTransform="capitalize"
            >
              {fullName.toLowerCase()}
            </Typography>
          );
        }) ?? '—'}
      </Box>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{ alignItems: 'center', gap: 2 }}
      >
        <Box>
          {close?.map((item) => {
            const fullName = getNormalizeFullName(
              item.firstName,
              item.lastName,
            );

            return (
              <Typography
                key={item.id}
                textTransform="capitalize"
              >
                {fullName.toLowerCase()}
              </Typography>
            );
          }) ?? '—'}
        </Box>
        <ContextMenu
          sx={{ ml: 'auto' }}
          menuItems={[
            {
              label: 'Open Log',
              onClick: handleOpenLog,
            },
            {
              label: 'Delete',
              onClick: () => {
                defaultStore.set(deleteLogIdAtom, id);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};
