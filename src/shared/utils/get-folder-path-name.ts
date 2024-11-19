import { AppRoute } from '@shared/constants/app-route';

export function getFolderPathName(url: string): AppRoute | null {
  const routeValue = Object.values(AppRoute).find((route) => {
    const dynamicRoute = route.replace(/\[.*?]/, '\\w+');

    const regex = new RegExp(`^${dynamicRoute}$`);

    return regex.test(url);
  });

  return routeValue ?? null;
}
