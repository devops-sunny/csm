'use client';

import type { FunctionComponent } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

import { INFO_AND_FILTERS_BAR_HEIGHT } from '@features/managers-log-detail/constants/layout';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import {
  searchQueryAtom,
  showOnlyMyEntriesAtom,
} from '@features/managers-log-detail/states/common';
import { SearchInput } from '@shared/components/common/search-input';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export type InfoAndFiltersBarProps = {
  sx?: SxProps<Theme>;
};

export const InfoAndFiltersBar: FunctionComponent<InfoAndFiltersBarProps> = ({
  sx,
}) => {
  const theme = useTheme();

  const searchQuery = useAtomValue(searchQueryAtom);

  const showOnlyMyEntries = useAtomValue(showOnlyMyEntriesAtom);

  const { data: getLogDetailResponse } = useRequestLogDetail();

  const logDetail = getLogDetailResponse?.data;

  return (
    <Box
      sx={{
        width: 1,
        height: INFO_AND_FILTERS_BAR_HEIGHT,
        backgroundColor: theme.palette.catskillWhite,
        [theme.breakpoints.down('md')]: {
          position: 'fixed',
          backgroundColor: theme.palette.white,
          top: APP_MOBILE_HEADER_HEIGHT,
          zIndex: theme.zIndex.appBar,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          px: 3,
          height: 1,
          boxSizing: 'border-box',
          [theme.breakpoints.down('md')]: {
            flexFlow: 'row-reverse',
            boxShadow: '0px 4px 12px 0px #0000001A',
            px: 2.75,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {logDetail && (
            <>
              <Typography
                variant="h2"
                noWrap
                sx={{
                  [theme.breakpoints.down('md')]: {
                    display: 'none',
                  },
                }}
              >
                {logDetail.facilityName}
              </Typography>
              <Divider
                orientation="vertical"
                sx={{
                  mx: 2.5,
                  width: '1px',
                  height: 18,
                  [theme.breakpoints.down('md')]: {
                    display: 'none',
                  },
                }}
              />
              <Typography
                variant="body2"
                noWrap
                sx={{
                  [theme.breakpoints.down('md')]: {
                    fontWeight: 400,
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontSize: 12,
                    textAlign: 'right',
                    [theme.breakpoints.down('md')]: {
                      fontSize: 12,
                    },
                  }}
                >
                  {dayjs(logDetail.createdAt).format('dddd')}
                </Typography>
                {dayjs(logDetail.createdAt).format('MMMM D, YYYY')}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            gap: 3.5,
            ml: 'auto',
            [theme.breakpoints.down('md')]: {
              justifyContent: 'flex-start',
            },
          }}
        >
          <FormControl
            sx={{
              maxWidth: 250,
              width: 1,
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <SearchInput
              value={searchQuery}
              onChange={(value) => {
                defaultStore.set(searchQueryAtom, value);
              }}
            />
          </FormControl>
          <FormControl sx={{ flexShrink: 0 }}>
            <FormControlLabel
              checked={showOnlyMyEntries}
              onChange={(_event, checked) =>
                defaultStore.set(showOnlyMyEntriesAtom, checked)
              }
              control={<Checkbox />}
              label="Only my entries"
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
