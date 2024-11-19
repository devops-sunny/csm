import useSWRMutation from 'swr/mutation';

import type { SWRKey } from '@shared/libs/swr/types/common';
import type { UseMutation } from '@shared/libs/swr/types/use-mutation';

export const useMutation: UseMutation = (key, fetcher, options = {}) => {
  const mutateCallback = (
    _: SWRKey,
    { arg }: { arg: Parameters<typeof fetcher>[0] },
  ) => fetcher(arg);

  const mutateResponse = useSWRMutation(key, mutateCallback, options);

  return { ...mutateResponse };
};
