'use client';

import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';

import { AppRoute } from '@shared/constants/app-route';

export default function PageError() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        width: 1,
        backgroundImage: 'url(/assets/images/auth-background.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        fontSize={48}
        sx={{
          maxWidth: '90%',
          width: 1,
          textAlign: 'center',
          color: 'white',
          [theme.breakpoints.down('md')]: {
            fontSize: 32,
          },
        }}
      >
        400 | Something Went Wrong
      </Typography>
      <Box
        sx={{
          flex: 1,
          width: 1,
          position: 'absolute',
          bottom: 16,
          display: 'flex',
          mx: 2,
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            textAlign: 'center',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ml: 2,
            [theme.breakpoints.down('md')]: {
              ml: 0,
              justifyContent: 'center',
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
          color="azure"
          sx={{
            mr: 2,
            [theme.breakpoints.down('md')]: {
              mr: 0,
            },
          }}
        >
          2024 The Business Shift
        </Typography>
      </Box>
    </Box>
  );
}
