'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { authApi } from '@features/authentication/api/auth-api';
import type { LoginSchemaFields } from '@features/authentication/form-validators/login-schema';
import { loginSchema } from '@features/authentication/form-validators/login-schema';
import { PasswordInput } from '@shared/components/common/password-input';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { MFAPurpose } from '@shared/types/api/generated';

export default function PageLogin() {
  const theme = useTheme();

  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    getValues,
    formState: { errors, isDirty },
  } = useForm<LoginSchemaFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { trigger, isMutating } = useMutation(
    API_CACHE_KEY.LOGIN,
    authApi.logIn,
    {
      onError: (responseErrors) => {
        setError('password', {
          type: 'custom',
          message: responseErrors.errors[0].error,
        });
      },
      onSuccess: (data) => {
        const { identifier, phone } = data.data;

        const queryParams = new URLSearchParams({
          identifier,
          purpose: MFAPurpose.Login,
          phone,
        });

        router.push(`${AppRoute.Verification}?${queryParams.toString()}`);
      },
    },
  );

  const handleLogin: SubmitHandler<LoginSchemaFields> = (formData) => {
    const { identifier, password } = formData;

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const normalizedPassword = password.trim();

    trigger({
      identifier: normalizedIdentifier,
      password: normalizedPassword,
    });
  };

  const forgotPasswordLink = `${AppRoute.ForgotPassword}?identifier=${encodeURIComponent(
    getValues('identifier'),
  )}`;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        height: 1,
        width: 1,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr auto 1fr',
        [theme.breakpoints.down('md')]: {
          gap: 0,
        },
      }}
    >
      <Box
        sx={{
          textAlign: 'right',
          my: 'auto',
          gridColumn: 1,
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            fontSize={28}
            fontWeight={500}
            color={theme.palette.periwinkle}
          >
            Log into
            <br />
            your account
          </Typography>
          <Divider
            sx={{
              width: 24,
              my: 3.5,
              mx: 'auto',
              borderWidth: 2,
              borderColor: theme.palette.azure,
            }}
          />
          <Typography
            fontSize={18}
            fontWeight={500}
            color={theme.palette.white}
          >
            Alpha Version 1.0
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{
          width: 360,
          backgroundColor: theme.palette.white,
          gridColumn: 2,
          p: 4,
          boxSizing: 'border-box',
          display: 'flex',
          flexFlow: 'column',
          [theme.breakpoints.down('md')]: {
            width: 340,
            p: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: 'center',
            display: 'none',
            mb: 1,
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        >
          Log into your account
        </Typography>
        <FormControl
          fullWidth
          sx={{ mb: 1.5 }}
        >
          <FormLabel>Email</FormLabel>
          <TextField
            autoFocus
            type="email"
            placeholder="email"
            error={Boolean(errors.identifier)}
            helperText={errors.identifier?.message}
            {...register('identifier')}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Password</FormLabel>
          <PasswordInput
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>
        <Typography
          component={NextLink}
          href={forgotPasswordLink}
          sx={{
            textAlign: 'right',
            fontWeight: 500,
            mb: 2.25,
            mt: 1.5,
            width: 'fit-content',
            ml: 'auto',
          }}
        >
          Forgot Password?
        </Typography>
        <LoadingButton
          fullWidth
          disabled={!isDirty}
          loading={isMutating}
          type="submit"
        >
          Login
        </LoadingButton>
      </Paper>
    </Box>
  );
}
