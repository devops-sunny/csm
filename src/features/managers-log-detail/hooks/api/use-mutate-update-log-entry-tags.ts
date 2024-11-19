import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import {
  searchQueryAtom,
  showOnlyMyEntriesAtom,
} from '@features/managers-log-detail/states/common';
import {
  tagPeopleModalAtom,
  mobileTagPeopleModalAtom,
} from '@features/managers-log-detail/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useMutateUpdateLogEntryTags = () => {
  const params = useParams();

  const showOnlyMyEntries = useAtomValue(showOnlyMyEntriesAtom);

  const searchQuery = useAtomValue(searchQueryAtom);

  const logId = params.logId as string;

  const { revalidate } = useRevalidate();

  return useMutation(
    API_CACHE_KEY.UPDATE_TAGS,
    managerLogDetailApi.updateLogEntryTags,
    {
      onSuccess: () => {
        revalidate([
          API_CACHE_KEY.GET_LOG_ENTRIES,
          logId,
          showOnlyMyEntries,
          searchQuery,
        ]);

        defaultStore.set(tagPeopleModalAtom, null);
        defaultStore.set(mobileTagPeopleModalAtom, null);
      },
    },
  );
};
