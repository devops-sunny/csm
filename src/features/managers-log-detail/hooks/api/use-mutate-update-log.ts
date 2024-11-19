import { useParams } from 'next/navigation';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';

export const useMutateUpdateLog = () => {
  const { revalidate } = useRevalidate();

  const params = useParams();

  const logId = params.logId as string;

  return useMutation(API_CACHE_KEY.UPDATE_LOG, managerLogDetailApi.updateLog, {
    onSuccess: () => {
      revalidate([API_CACHE_KEY.GET_LOG_DETAIL, logId]);
    },
  });
};
