import { AppRoute } from '@shared/constants/app-route';

export const US_SHORT_DATE_FORMAT = 'MM/DD/YYYY';

export const PAGE_TITLE_BY_PATH = {
  [AppRoute.ManagersLog]: 'Manager’s Log',
  [AppRoute.ManagersLogDetail]: 'Manager’s Log',
  [AppRoute.ManagersLogSettings]: 'Manager’s Log',
  [AppRoute.Dashboard]: 'Dashboard',
  [AppRoute.Employees]: 'Employees',
  [AppRoute.Gallery]: 'Gallery',
} as const;

export const ACCEPT_IMAGE_TYPES = 'image/*';
