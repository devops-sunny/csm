import type { ApiType } from '@shared/types/utils/api';

export type TagPeopleModalAtom = {
  logEntryId: number;
  taggedUsers?: ApiType['LogUser'][];
};
