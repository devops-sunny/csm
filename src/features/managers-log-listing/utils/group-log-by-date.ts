import dayjs from 'dayjs';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

type LogGroup = Record<string, ApiType['LogResponse'][] | null>;

export const groupLogBySortType = (
  logs: ApiType['LogResponse'][],
): LogGroup => {
  const queryParams = defaultStore.get(queryParamsAtom);

  const sortType = queryParams.metadata.sortBy;

  switch (sortType) {
    case 'createdAt': {
      const groupedLogs = logs.reduce<LogGroup>((acc, log) => {
        const date = dayjs(log.createdAt).format('MMMM D');

        const existingLogs = acc[date];

        if (existingLogs) {
          existingLogs.push(log);
        } else {
          acc[date] = [log];
        }

        return acc;
      }, {});

      return groupedLogs;
    }

    case 'facilityName': {
      const groupedLogs = logs.reduce<LogGroup>((acc, log) => {
        const { facilityName } = log;

        if (!facilityName) {
          return acc;
        }

        const existingLogs = acc[facilityName];

        if (existingLogs) {
          existingLogs.push(log);
        } else {
          acc[facilityName] = [log];
        }

        return acc;
      }, {});

      return groupedLogs;
    }

    default: {
      return {};
    }
  }
};
