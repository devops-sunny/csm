import type { ApiType } from '@shared/types/utils/api';

export type AddEditModuleAtom = Partial<ApiType['Module']> | null;

export type ModuleColumnConfig = {
  col1: {
    id: string;
    modules: ApiType['Module'][];
  };
  col2: {
    id: string;
    modules: ApiType['Module'][];
  };
};
