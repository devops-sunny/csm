'use client';

import { useEffect } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { authApi } from '@features/authentication/api/auth-api';
import type { ForgotPasswordSchemaFields } from '@features/authentication/form-validators/forgot-password-schema';
import { forgotPasswordSchema } from '@features/authentication/form-validators/forgot-password-schema';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { MFAPurpose, MFAType } from '@shared/types/api/generated';

export default function PageForgotPassword() {
  const theme = useTheme();

  const router = useRouter();

  const searchParams = useSearchParams();

  const loginEmail = searchParams.get('identifier');

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ForgotPasswordSchemaFields>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { trigger: forgotPassword, isMutating } = useMutation(
    API_CACHE_KEY.FORGOT_PASSWORD,
    authApi.forgotPassword,
    {
      onError: () => {
        setError('email', {
          type: 'custom',
          message: 'Incorrect email',
        });
      },
      onSuccess: (data) => {
        const { identifier, phone } = data.data;

        if (!identifier || !phone) {
          toast.error('Incorrect email');

          return;
        }

        const queryParams = new URLSearchParams({
          identifier,
          purpose: MFAPurpose.Reset,
          phone,
        });

        router.push(`${AppRoute.Verification}?${queryParams.toString()}`);
      },
    },
  );

  useEffect(() => {
    if (!loginEmail) return;

    setValue('email', loginEmail, { shouldDirty: true });
  }, [loginEmail, setValue]);

  const handleReset: SubmitHandler<ForgotPasswordSchemaFields> = async (
    formData,
  ) => {
    const { email } = formData;

    forgotPassword({ email, type: MFAType.Email });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleReset)}
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
            Password recovery
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
            Please provide your email
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
          Password Recovery
          <br />
          Please provide your email
        </Typography>
        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <TextField
            autoFocus
            placeholder="email@example.com"
            sx={{ mb: 1.5 }}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormControl>
        <LoadingButton
          fullWidth
          disabled={!isDirty}
          loading={isMutating}
          type="submit"
        >
          Reset Password
        </LoadingButton>
      </Paper>
    </Box>
  );
}
