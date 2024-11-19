import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import type { UseLazyRequest } from '@shared/libs/swr/types/use-lazy-request';

export const useLazyRequest: UseLazyRequest = (key, fetcher, options = {}) => {
  const [cachedKey, setCachedKey] = useState(null as typeof key);

  const [currentParams, setCurrentParams] = useState(
    undefined as Parameters<typeof fetcher>[0],
  );

  useEffect(() => {
    const hasTriggered = currentParams !== undefined;

    if (hasTriggered) setCachedKey(key);
    /* eslint-disable-next-line react-hooks/exhaustive-deps --
      currentParams is the only thing that indicates a trigger has happened */
  }, [currentParams]);

  const { mutate, ...swrValues } = useSWR(
    cachedKey,
    () => fetcher(currentParams),
    options,
  );

  const trigger = useCallback((params?: Parameters<typeof fetcher>[0]) => {
    const defaultParams = { ...options.defaultParams } as typeof currentParams;

    setCurrentParams((current) => params ?? current ?? defaultParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- defaultParams should not change
  }, []);

  return { trigger, mutate, ...swrValues };
};
