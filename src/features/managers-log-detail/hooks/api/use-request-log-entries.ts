import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import {
  searchQueryAtom,
  showOnlyMyEntriesAtom,
} from '@features/managers-log-detail/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

export const useRequestLogEntries = () => {
  const params = useParams();

  const showOnlyMyEntries = useAtomValue(showOnlyMyEntriesAtom);

  const searchQuery = useAtomValue(searchQueryAtom);

  const logId = params.logId as string;

  return useRequest(
    [API_CACHE_KEY.GET_LOG_ENTRIES, logId, showOnlyMyEntries, searchQuery],
    () =>
      managerLogDetailApi.getLogEntries({
        managerLogId: logId,
        onlyMine: showOnlyMyEntries,
        search: searchQuery,
      }),
    { revalidateOnMount: true },
  );
};
