import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import {
  createEditLogEntryAllowedTypeAtom,
  searchQueryAtom,
  showOnlyMyEntriesAtom,
} from '@features/managers-log-detail/states/common';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useMutateNewLogEntry = () => {
  const params = useParams();

  const showOnlyMyEntries = useAtomValue(showOnlyMyEntriesAtom);

  const searchQuery = useAtomValue(searchQueryAtom);

  const logId = params.logId as string;

  const { revalidate } = useRevalidate();

  return useMutation(
    API_CACHE_KEY.ADD_NEW_LOG,
    managerLogDetailApi.addNewLogEntry,
    {
      onSuccess: () => {
        revalidate([
          API_CACHE_KEY.GET_LOG_ENTRIES,
          logId,
          showOnlyMyEntries,
          searchQuery,
        ]);

        defaultStore.set(createEditLogEntryModalAtom, null);
        defaultStore.set(createEditLogEntryAllowedTypeAtom, []);
      },
    },
  );
};
