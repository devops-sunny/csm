import { atomWithImmer } from 'jotai-immer';

import type { LogEntryType } from '@shared/types/api/generated';

export const createEditLogEntryAllowedTypeAtom = atomWithImmer<LogEntryType[]>(
  [],
);

export const showOnlyMyEntriesAtom = atomWithImmer(false);

export const searchQueryAtom = atomWithImmer('');

export const activeModuleAtom = atomWithImmer<{
  activeBy: 'click' | 'scroll';
  id: number;
} | null>(null);

export const mobileActiveModuleIdAtom = atomWithImmer<number | null>(null);
