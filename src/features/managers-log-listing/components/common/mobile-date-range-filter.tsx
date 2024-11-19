import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import type { DateRange } from 'react-day-picker';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { BaseDateRangeTrigger } from '@shared/components/common/date-range-picker/base-date-range-trigger';
import { MobileDrawerDateRangePicker } from '@shared/components/common/date-range-picker/mobile-drawer-date-range-picker';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { stringifyDateRangeValue } from '@shared/utils/stringify-date-range-value';

export const MobileDateRangeFilter = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const handleSelectDateRange = ({ from, to }: DateRange) => {
    const parsedFrom = from
      ? dayjs(from).startOf('day').toISOString()
      : undefined;

    const parsedTo = to ? dayjs(to).endOf('day').toISOString() : undefined;

    defaultStore.set(queryParamsAtom, (prev) => {
      prev.filter.startDateFilter = parsedFrom;
      prev.filter.endDateFilter = parsedTo;
    });
  };

  const from = queryParams.filter.startDateFilter
    ? new Date(queryParams.filter.startDateFilter)
    : undefined;

  const to = queryParams.filter.endDateFilter
    ? new Date(queryParams.filter.endDateFilter)
    : undefined;

  return (
    <MobileDrawerDateRangePicker
      dateRangePickerProps={{
        value: { from, to },
        onChange: handleSelectDateRange,
      }}
      TriggerComponent={({ openDrawer }) => (
        <BaseDateRangeTrigger
          value={stringifyDateRangeValue({ from, to })}
          placeholder="Select Date Range"
          onClick={openDrawer}
          onClear={() =>
            handleSelectDateRange({ from: undefined, to: undefined })
          }
        />
      )}
    />
  );
};
