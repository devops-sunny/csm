import { atomWithImmer } from 'jotai-immer';

export const mobileOpenNewUploadDrawerAtom = atomWithImmer<boolean>(false);

export const mobileOpenFacilitySelectDrawerAtom = atomWithImmer<boolean>(false);

export const openChatDrawerAtom = atomWithImmer<{
  mediaId?: number;
  mediaName?: string;
} | null>(null);

export const openMobileChatDrawerAtom = atomWithImmer<{
  mediaId?: number;
  mediaName?: string;
} | null>(null);

export const openDeleteMediaModalAtom = atomWithImmer<boolean>(false);

export const mobileOpenDeleteMediaModalAtom = atomWithImmer<boolean>(false);
