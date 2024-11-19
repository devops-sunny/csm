import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Select, Typography, MenuItem } from '@mui/material';
import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/employees-listing/states/filters';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { EmployeeSortBy, SortOrder } from '@shared/types/api/generated';

export const SortBySelect = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const handleSelect = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');

    defaultStore.set(queryParamsAtom, (prev) => {
      prev.metadata.sortBy = sortBy as EmployeeSortBy;
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
            {queryParams.metadata.sortBy === EmployeeSortBy.Name &&
              'Sort by name'}
            {queryParams.metadata.sortBy === EmployeeSortBy.FacilityName &&
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
      <MenuItem value={`${EmployeeSortBy.Name}-${SortOrder.Desc}`}>
        Sort by name
        <ArrowUpward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${EmployeeSortBy.Name}-${SortOrder.Asc}`}>
        Sort by name
        <ArrowDownward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${EmployeeSortBy.FacilityName}-${SortOrder.Desc}`}>
        Sort by facility <ArrowUpward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
      <MenuItem value={`${EmployeeSortBy.FacilityName}-${SortOrder.Asc}`}>
        Sort by facility <ArrowDownward sx={{ ml: 'auto', height: 16 }} />
      </MenuItem>
    </Select>
  );
};
