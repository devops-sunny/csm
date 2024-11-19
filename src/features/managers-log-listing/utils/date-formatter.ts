import dayjs from 'dayjs';

import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';

export const dateFormatter = (formattingDate?: Date): string => {
  if (!formattingDate) {
    return '';
  }

  const isToday = dayjs(formattingDate).isSame(new Date(), 'day');

  const isYesterday = dayjs(formattingDate).isSame(
    dayjs().subtract(1, 'day'),
    'day',
  );

  if (isToday) {
    return 'Today';
  }

  if (isYesterday) {
    return 'Yesterday';
  }

  return dayjs(formattingDate).format(US_SHORT_DATE_FORMAT);
};
