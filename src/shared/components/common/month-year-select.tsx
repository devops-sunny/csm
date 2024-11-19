import type { FunctionComponent } from 'react';
import type { Theme } from '@emotion/react';
import { FormControl, Select, MenuItem } from '@mui/material';
import type { SxProps } from '@mui/system';
import { Box } from '@mui/system';

export type MonthYearSelectProps = {
  sx?: SxProps<Theme>;
  value?: Date;
  onChange?: (date: Date) => void;
  dropdownZIndex?: number;
};

export const MonthYearSelect: FunctionComponent<MonthYearSelectProps> = ({
  sx,
  value,
  onChange,
  dropdownZIndex = 1500,
}) => {
  const currentYear = new Date().getFullYear();

  const currentMonth = new Date().getMonth();

  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => 1970 + i,
  );

  const handleChange = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        gap: 1,
        justifyContent: 'stretch',
        mb: 2,
        ...sx,
      }}
    >
      <FormControl fullWidth>
        <Select
          MenuProps={{
            sx: { zIndex: dropdownZIndex },
          }}
          value={value?.getMonth() ?? currentMonth}
          onChange={(event) => {
            handleChange(
              new Date(
                value?.getFullYear() ?? currentYear,
                event.target.value as number,
              ),
            );
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => {
            const month = new Date(1970, index).toLocaleString('default', {
              month: 'long',
            });

            return (
              <MenuItem
                key={month}
                value={index}
                data-testid="month-selection"
              >
                {month}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          MenuProps={{
            sx: { zIndex: dropdownZIndex },
          }}
          value={value?.getFullYear() ?? currentYear}
          onChange={(event) => {
            handleChange(
              new Date(
                event.target.value as number,
                value?.getMonth() ?? currentMonth,
              ),
            );
          }}
        >
          {years.map((year) => (
            <MenuItem
              key={year}
              value={year}
              data-testid="year-selection"
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
