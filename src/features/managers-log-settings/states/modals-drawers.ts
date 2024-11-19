import { atomWithImmer } from 'jotai-immer';

export const loadModuleModalAtom = atomWithImmer<boolean>(false);

export const mobileDeleteModuleIdModalAtom = atomWithImmer<number | null>(null);

export const deleteModuleIdModalAtom = atomWithImmer<number | null>(null);

export const mobileLoadModuleModalAtom = atomWithImmer<boolean>(false);
