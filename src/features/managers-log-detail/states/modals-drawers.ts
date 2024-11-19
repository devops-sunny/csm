import { atomWithImmer } from 'jotai-immer';

import type { TagPeopleModalAtom } from '@features/managers-log-detail/types/state';
import type { ApiType } from '@shared/types/utils/api';

export const tagPeopleModalAtom = atomWithImmer<TagPeopleModalAtom | null>(
  null,
);

export const deleteEntryIdModalAtom = atomWithImmer<number | null>(null);

export const mobileDeleteEntryIdModalAtom = atomWithImmer<number | null>(null);

export const mobileFillingSettingWarnDrawerAtom = atomWithImmer(false);

export const mobileOpenSearchDrawerAtom = atomWithImmer(false);

export const mobileTagPeopleModalAtom =
  atomWithImmer<TagPeopleModalAtom | null>(null);

export const fillingSettingWarnModalAtom = atomWithImmer(false);

export const createEditLogEntryModalAtom = atomWithImmer<
  ApiType['ManagerLogEntry'] | null
>(null);

export const openMobileFilterDrawer = atomWithImmer(false);
