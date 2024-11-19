import dynamic from 'next/dynamic';
import type { ToasterProps } from 'react-hot-toast';

import { useIsMobile } from '@shared/hooks/common/use-is-mobile';

const Toaster = dynamic<ToasterProps>(
  () => import('react-hot-toast').then((module) => module.Toaster),
  {
    ssr: false,
  },
);

export const ToasterPlaceholder = () => {
  const isMobile = useIsMobile();

  return (
    <Toaster
      toastOptions={{
        position: isMobile ? 'top-center' : 'bottom-right',
        style: {
          fontSize: 16,
          padding: '0.5rem 1rem',
          fontFamily: 'var(--poppins)',
        },
      }}
    />
  );
};
