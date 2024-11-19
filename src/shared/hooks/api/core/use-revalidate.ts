import { useSWRConfig, unstable_serialize } from 'swr';

import { defaultStore } from '@shared/libs/jotai/default-store';
import type { SWRKey } from '@shared/libs/swr/types/common';
import type { InfiniteMutatorOptions } from '@shared/states/swr';
import { infiniteMutatorsAtom } from '@shared/states/swr';

export const useRevalidate = () => {
  const { mutate } = useSWRConfig();

  return {
    revalidate: (key: SWRKey) => mutate(key),
    revalidateInfinitePage: (key: SWRKey, options?: InfiniteMutatorOptions) => {
      const infiniteMutators = defaultStore.get(infiniteMutatorsAtom);

      const serializedKey = unstable_serialize(key);

      const matchedMutator = infiniteMutators[serializedKey];

      matchedMutator?.(options);
    },
  };
};
