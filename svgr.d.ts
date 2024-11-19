declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const component: FC<SVGProps<SVGElement>>;

  // eslint-disable-next-line local/no-default-export
  export default component;
}
