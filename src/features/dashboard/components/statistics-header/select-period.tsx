import { useState } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { StatisticPeriod } from '@features/dashboard/components/types/common';
import { selectedPeriodAtom } from '@features/dashboard/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

dayjs.extend(isoWeek);

export const SelectPeriod = () => {
  const [selected, setSelected] = useState<StatisticPeriod>(
    StatisticPeriod.ThisWeek,
  );

  const theme = useTheme();

  const handleChange = (period: StatisticPeriod) => {
    setSelected(period);

    switch (period) {
      case StatisticPeriod.ThisWeek: {
        defaultStore.set(selectedPeriodAtom, {
          from: dayjs().startOf('week').format('YYYY-MM-DD'),
          to: dayjs().endOf('week').format('YYYY-MM-DD'),
        });

        break;
      }

      case StatisticPeriod.LastWeek: {
        defaultStore.set(selectedPeriodAtom, {
          from: dayjs().startOf('month').format('YYYY-MM-DD'),
          to: dayjs().endOf('month').format('YYYY-MM-DD'),
        });

        break;
      }

      case StatisticPeriod.Last30Days: {
        defaultStore.set(selectedPeriodAtom, {
          from: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
          to: dayjs().format('YYYY-MM-DD'),
        });

        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <FormControl
      sx={{
        flex: 1,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      <Select
        value={selected}
        onChange={(event) =>
          handleChange(event.target.value as StatisticPeriod)
        }
      >
        <MenuItem value={StatisticPeriod.ThisWeek}>This week</MenuItem>
        <MenuItem value={StatisticPeriod.LastWeek}>This month</MenuItem>
        <MenuItem value={StatisticPeriod.Last30Days}>
          30 Days Up to Date
        </MenuItem>
      </Select>
    </FormControl>
  );
};
