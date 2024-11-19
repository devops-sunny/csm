import type { FC, SVGProps } from 'react';

import type { AppRoute } from '@shared/constants/app-route';

export type AppNavItem = {
  id: string;
  title: string;
  path: AppRoute;
  icon: FC<SVGProps<SVGElement>>;
  disabled: boolean;
};

export enum UploadFileType {
  General = 'general',
  Log = 'log',
}
