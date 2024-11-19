import { atomWithImmer } from 'jotai-immer';

import type { ImageViewModalState } from '@shared/types/state';

export const imageViewModalAtom = atomWithImmer<ImageViewModalState>({
  open: false,
  mediaList: [],
});

export const openNewFeedbackDrawerAtom = atomWithImmer(false);

export const openMobileNewFeedbackDrawerAtom = atomWithImmer(false);

export const mobileOpenFeedbackDrawerAtom = atomWithImmer(false);

export const openFeedbackDrawerAtom = atomWithImmer(false);
