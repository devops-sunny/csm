'use client';

import type { PropsWithChildren } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';

import AppLogo from '@assets/illustrators/app-logo.svg';
import { AppRoute } from '@shared/constants/app-route';

export default function AuthenticationLayout({ children }: PropsWithChildren) {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        backgroundImage: 'url(/assets/images/auth-background.svg)',
        backgroundColor: theme.palette.cello,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr auto 1fr',
        gridTemplateRows: '1fr auto 1fr',
        boxSizing: 'border-box',
        py: 0,
        [theme.breakpoints.down('md')]: {
          py: 3,
        },
      }}
    >
      <Box
        sx={{
          color: theme.palette.periwinkle,
          gridRowStart: 1,
          gridColumnStart: 2,
          mt: 'auto',
          mx: 'auto',
        }}
      >
        <AppLogo />
      </Box>
      <Box
        sx={{
          gridColumn: '1 / 4',
          gridRow: '2 / 2',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          gridColumn: '1 / 4',
          gridRow: 3,
          mt: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          mx: 2,
          mb: 1.75,
          [theme.breakpoints.down('md')]: {
            flexFlow: 'column',
            textAlign: 'center',
            gap: 3,
            mb: 'auto',
            mt: 0,
            mx: 0,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            [theme.breakpoints.down('md')]: {
              flexFlow: 'column',
              gap: 1,
            },
          }}
        >
          {[
            {
              label: 'Terms of Use',
              href: AppRoute.TermsOfUse,
            },
            {
              label: 'Privacy Policy',
              href: AppRoute.PrivacyPolicy,
            },
            {
              label: 'Contact Us',
              href: AppRoute.ContactUs,
            },
          ].map(({ label, href }) => (
            <Button
              key={href}
              variant="link"
              target="_blank"
              LinkComponent={NextLink}
              disabled // Disable before adding the actual page
              href={href}
              sx={{
                textDecoration: 'none',
                fontWeight: 400,
                color: `${theme.palette.azure} !important`, // Disable before adding the actual page
                [theme.breakpoints.down('md')]: {
                  fontSize: 14,
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
        <Typography
          color={theme.palette.azure}
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: 14,
            },
          }}
        >
          {currentYear} The Business Shift
        </Typography>
      </Box>
    </Box>
  );
}
