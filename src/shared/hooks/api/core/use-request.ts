import useSWR from 'swr';

import type { UseRequest } from '@shared/libs/swr/types/use-request';

export const useRequest: UseRequest = (key, fetcher, options = {}) => {
  const cacheKey = options.skip ? null : key;

  const swrResponse = useSWR(cacheKey, fetcher, options);

  return { ...swrResponse };
};
