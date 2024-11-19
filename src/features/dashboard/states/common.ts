import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { atomWithImmer } from 'jotai-immer';

dayjs.extend(isoWeek);

export const selectedPeriodAtom = atomWithImmer<{
  from: string;
  to: string;
}>({
  from: dayjs().startOf('week').format('YYYY-MM-DD'),
  to: dayjs().endOf('week').format('YYYY-MM-DD'),
});

export const selectedFacilityIdsAtom = atomWithImmer<number[] | null>(null);
