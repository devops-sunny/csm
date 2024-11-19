import dayjs from 'dayjs';
import type { DateRange } from 'react-day-picker';

import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';

export const stringifyDateRangeValue = (input?: DateRange): string => {
  if (!input) return '';

  const { from, to } = input;

  let dateRangeAsString = '';

  if (from && to) {
    const fromText = dayjs(from).format(US_SHORT_DATE_FORMAT);
    const toText = dayjs(to).format(US_SHORT_DATE_FORMAT);

    dateRangeAsString = `${fromText} - ${toText}`;
  }

  return dateRangeAsString;
};
