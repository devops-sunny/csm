import type { AppRoute } from '@shared/constants/app-route';

export const replacePathSegments = (
  pathname: AppRoute,
  replacements: { [key: string]: string },
): string => {
  let updatedPathname = pathname as string;

  Object.entries(replacements).forEach(([segment, replacement]) => {
    const regex = new RegExp(`\\[${segment}\\]`, 'g');
    updatedPathname = updatedPathname.replace(regex, replacement);
  });

  return updatedPathname;
};
