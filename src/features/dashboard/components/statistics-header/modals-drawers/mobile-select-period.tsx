import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import { StatisticPeriod } from '@features/dashboard/components/types/common';
import { selectedPeriodAtom } from '@features/dashboard/states/common';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileSelectPeriod = () => {
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
    <MobileDrawerSelect
      title="Sort by"
      options={[
        { label: 'This week', value: StatisticPeriod.ThisWeek },
        { label: 'Last week', value: StatisticPeriod.LastWeek },
        { label: 'Last 30 days', value: StatisticPeriod.Last30Days },
      ]}
      onChange={(value) => handleChange(value as StatisticPeriod)}
      value={selected}
      TriggerComponent={({ onOpen, selectedOption }) => (
        <AnchorInput
          onClick={onOpen}
          value={selectedOption?.label}
          placeholder="Sort by"
          sx={{
            display: 'none',
            flex: 1,
            '.MuiInputBase-root': {
              width: 1,
            },
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        />
      )}
    />
  );
};
