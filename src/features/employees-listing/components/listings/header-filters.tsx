'use client';

import type { FunctionComponent } from 'react';
import { Article, Print, Settings } from '@mui/icons-material';
import type { SxProps } from '@mui/material';
import { Box, Button, FormControl, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { useAtomValue } from 'jotai';
import NextLink from 'next/link';

import { FacilityFilter } from '@features/employees-listing/components/common/facility-filter';
import { SortBySelect } from '@features/employees-listing/components/common/sort-by-select';
import {
  DESKTOP_EMPLOYEE_TABLE_MIN_WIDTH,
  EMPLOYEE_LIST_HEADER_FILTER_HEIGHT,
} from '@features/employees-listing/constants/layout';
import { queryParamsAtom } from '@features/employees-listing/states/filters';
import {
  openNewReportModalAtom,
} from '@features/employees-listing/states/modals-drawers';
import { SearchInput } from '@shared/components/common/search-input';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { DepartmentFilter } from '@features/employees-listing/components/common/department-filter';

export type HeaderFiltersProps = {
  sx?: SxProps<Theme>;
};

export const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  sx,
}) => {
  const theme = useTheme();

  const queryParams = useAtomValue(queryParamsAtom);

  return (
    <Box
      sx={{
        py: 1,
        px: 1.25,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        minWidth: DESKTOP_EMPLOYEE_TABLE_MIN_WIDTH,
        height: EMPLOYEE_LIST_HEADER_FILTER_HEIGHT,
        backgroundColor: theme.palette.catskillWhite,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <FormControl sx={{ minWidth: 180 }}>
        <SortBySelect />
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <FacilityFilter />
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <DepartmentFilter />
      </FormControl>
      <FormControl sx={{ minWidth: 250 }}>
        <SearchInput
          value={queryParams.filter.searchQuery}
          onChange={(value) => {
            defaultStore.set(queryParamsAtom, {
              ...queryParams,
              filter: {
                ...queryParams.filter,
                searchQuery: value,
              },
            });
          }}
        />
      </FormControl>
      <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
        <Button
          sx={{ minWidth: 155 }}
          startIcon={<Article />}
          onClick={() => {
            defaultStore.set(openNewReportModalAtom, true);
          }}
        >
          New Log
        </Button>
      </Box>
    </Box>
  );
};
