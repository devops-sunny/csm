import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Business Shift',
    short_name: 'TBS',
    icons: [
      {
        src: '/pwa/app-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/pwa/app-screenshot-narrow.png',
        type: 'image/png',
        sizes: '540x720',
      },
      {
        src: '/pwa/app-screenshot-wide.png',
        type: 'image/jpg',
        sizes: '720x540',
        form_factor: 'wide',
      } as NonNullable<MetadataRoute.Manifest['screenshots']>[0],
    ],
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
  };
}
