import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Select, Typography, MenuItem } from '@mui/material';
import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { MangerLogSortBy, SortOrder } from '@shared/types/api/generated';

export const SortBySelect = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const handleSelect = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');

    defaultStore.set(queryParamsAtom, (prev) => {
      prev.metadata.sortBy = sortBy as MangerLogSortBy;
      prev.metadata.sortOrder = sortOrder as SortOrder;
    });
  };

  return (
    <Select
      value={`${queryParams.metadata.sortBy}-${queryParams.metadata.sortOrder}`}
      onChange={({ target: { value } }) => {
        handleSelect(value as string);
      }}
      renderValue={() => (
        <Typography>
          <Typography
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {queryParams.metadata.sortBy === MangerLogSortBy.CreatedAt &&
              'Sort by date'}
            {queryParams.metadata.sortBy === MangerLogSortBy.FacilityName &&
              'Sort by facility'}
            {queryParams.metadata.sortOrder === SortOrder.Desc && (
              <ArrowUpward sx={{ ml: 'auto', height: 16 }} />
            )}
            {queryParams.metadata.sortOrder === SortOrder.Asc && (
              <ArrowDownward sx={{ ml: 'auto', height: 16 }} />
            )}
          </Typography>
        </Typography>
      )}
    >
      <MenuItem value={`${MangerLogSortBy.CreatedAt}-${SortOrder.Desc}`}>
        Sort by date
        <ArrowUpward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${MangerLogSortBy.CreatedAt}-${SortOrder.Asc}`}>
        Sort by date
        <ArrowDownward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${MangerLogSortBy.FacilityName}-${SortOrder.Desc}`}>
        Sort by facility <ArrowUpward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${MangerLogSortBy.FacilityName}-${SortOrder.Asc}`}>
        Sort by facility <ArrowDownward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
    </Select>
  );
};
