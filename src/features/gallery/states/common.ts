import { atomWithImmer } from 'jotai-immer';

import { GalleryTabs } from '@features/gallery/constants/common';

export const activeTabAtom = atomWithImmer<GalleryTabs>(
  GalleryTabs.ManagersLogGallery,
);

export const selectedFacilityIdsAtom = atomWithImmer<number[] | null>(null);

export const selectedDateRangeAtom = atomWithImmer<{
  from?: string;
  to?: string;
}>({ from: undefined, to: undefined });

export const editModeActiveAtom = atomWithImmer<boolean>(false);

export const selectedMediaIdsAtom = atomWithImmer<number[]>([]);
