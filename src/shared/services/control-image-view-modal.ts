import { defaultStore } from '@shared/libs/jotai/default-store';
import { imageViewModalAtom } from '@shared/states/modals-drawers';
import type { ImageViewModalState } from '@shared/types/state';

export const openImageViewModal = (
  params: Omit<ImageViewModalState, 'open'>,
) => {
  defaultStore.set(imageViewModalAtom, { open: true, ...params });
};

export const closeImageViewModal = () => {
  defaultStore.set(imageViewModalAtom, {
    open: false,
    initialSlideIdx: 0,
    mediaList: [],
  });
};
