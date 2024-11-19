import { PAGE_TITLE_BY_PATH } from '@shared/constants/common';
import { getFolderPathName } from '@shared/utils/get-folder-path-name';

export const getTitleFromPath = (pathname: string) => {
  const folderPathName = getFolderPathName(pathname);

  const headerTitle =
    PAGE_TITLE_BY_PATH[folderPathName as keyof typeof PAGE_TITLE_BY_PATH];

  return headerTitle;
};
