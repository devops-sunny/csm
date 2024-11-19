import { atomWithImmer } from 'jotai-immer';

import type { ApiType } from '@shared/types/utils/api';

export const openAppSidePanelAtom = atomWithImmer(false);

export const appLoadingAtom = atomWithImmer(false);

export const selfProfileData = atomWithImmer<ApiType['UserNode'] | null>(null);
