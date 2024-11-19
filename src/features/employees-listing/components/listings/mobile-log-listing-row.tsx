'use client';

import type { FunctionComponent } from 'react';
import { WbSunny } from '@mui/icons-material';
import type { SxProps } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { mobileDeleteLogIdAtom } from '@features/managers-log-listing/states/common';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';
import { replacePathSegments } from '@shared/utils/replace-path-segments';

export type MobileListingRowProps = {
  sx?: SxProps<Theme>;
  log: ApiType['LogResponse'];
};

export const MobileListingRow: FunctionComponent<MobileListingRowProps> = ({
  sx,
  log,
}) => {
  const theme = useTheme();

  const router = useRouter();

  const {
    id,
    facilityId,
    facilityName,
    createdAt,
    temprature,
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
    <Accordion
      sx={{
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
        borderRadius: 1,
        ...sx,
      }}
    >
      <AccordionSummary
        sx={{
          '.MuiAccordionSummary-content': {
            my: 1.25,
            alignItems: 'center',
            gap: 2,
          },
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
          }}
        />
        <Typography
          fontWeight={500}
          fontSize={14}
          noWrap
        >
          {facilityName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: '1px solid',
          borderColor: theme.palette.catskillWhite,
          mx: 2,
          p: 0,
          pt: 3.5,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto',
            gap: 3,
            mx: 1,
            alignItems: 'center',
          }}
        >
          <Box sx={{ gridColumnStart: 1, gridRowStart: 1 }}>
            <Typography>Date</Typography>
            <Typography>
              {dayjs(createdAt).format('ddd, MMM D, YYYY')}
            </Typography>
          </Box>
          <Box sx={{ gridColumnStart: 1, gridRowStart: 2 }}>
            <Typography>Open</Typography>
            <Box>
              {open?.map((item) => {
                const fullName = getNormalizeFullName(
                  item.firstName,
                  item.lastName,
                );

                return <Typography key={item.id}>{fullName}</Typography>;
              }) ?? '—'}
            </Box>
          </Box>
          <Box sx={{ gridColumnStart: 1, gridRowStart: 3 }}>
            <Typography>Mid</Typography>
            <Box>
              {mid?.map((item) => {
                const fullName = getNormalizeFullName(
                  item.firstName,
                  item.lastName,
                );

                return <Typography key={item.id}>{fullName}</Typography>;
              }) ?? '—'}
            </Box>
          </Box>
          <Box sx={{ gridColumnStart: 1, gridRowStart: 4 }}>
            <Typography>Close</Typography>
            <Box>
              {close?.map((item) => {
                const fullName = getNormalizeFullName(
                  item.firstName,
                  item.lastName,
                );

                return <Typography key={item.id}>{fullName}</Typography>;
              }) ?? '—'}
            </Box>
          </Box>
          <Stack
            gap={1}
            sx={{
              gridColumnStart: 2,
              gridRowStart: 1,
              gridRowEnd: 3,
              mb: 'auto',
            }}
          >
            <Typography>Weather</Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
            >
              <WbSunny sx={{ color: theme.palette.azure }} />
              <Typography>{temprature ?? '—'}</Typography>
            </Stack>
          </Stack>
          <Button
            variant="link"
            onClick={handleOpenLog}
            sx={{
              gridColumnStart: 1,
              gridRowStart: 5,
              color: theme.palette.shark,
            }}
          >
            Open Log
          </Button>
          <Button
            variant="link"
            sx={{
              color: theme.palette.salmonPearl,
              gridColumnStart: 2,
              gridRowStart: 5,
              ml: 'auto',
            }}
            onClick={() => {
              defaultStore.set(mobileDeleteLogIdAtom, id);
            }}
          >
            Delete Log
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
