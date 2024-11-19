import { useParams } from 'next/navigation';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

export const useRequestLogDetail = () => {
  const params = useParams();

  const logId = params.logId as string;

  return useRequest(
    [API_CACHE_KEY.GET_LOG_DETAIL, logId],
    () => managerLogDetailApi.getLogDetail({ logId }),
    { revalidateOnMount: true },
  );
};
