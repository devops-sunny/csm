import { atomWithImmer } from 'jotai-immer';

export const mobileToolbarOptionPanelAtom = atomWithImmer(false);

export const mobileOpenNewEmployeePanelAtom = atomWithImmer(false);

export const deleteLogIdAtom = atomWithImmer<number | null>(null);

export const mobileDeleteLogIdAtom = atomWithImmer<number | null>(null);
