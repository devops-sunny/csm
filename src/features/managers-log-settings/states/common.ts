import { atomWithImmer } from 'jotai-immer';

import type {
  AddEditModuleAtom,
  ModuleColumnConfig,
} from '@features/managers-log-settings/types/modules';

export const addEditModuleAtom = atomWithImmer<AddEditModuleAtom>(null);

export const mobileAddEditModuleAtom = atomWithImmer<AddEditModuleAtom>(null);

export const selectedFacilityIdAtom = atomWithImmer<number | null>(null);

export const moduleColumnConfigAtom = atomWithImmer<ModuleColumnConfig | null>(
  null,
);

export const subscriberIdsAtom = atomWithImmer<number[]>([]);
