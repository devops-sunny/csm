import { atomWithImmer } from 'jotai-immer';

export type InfiniteMutatorOptions = Partial<{
  fromPage: number;
  hasNewData: boolean;
}>;

export type InfiniteMutator = (
  options?: InfiniteMutatorOptions,
) => Promise<unknown>;

type InfiniteMutatorsState = Record<string, InfiniteMutator | undefined>;

export const infiniteMutatorsAtom = atomWithImmer<InfiniteMutatorsState>({});
