'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, FormControl, FormLabel, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { authApi } from '@features/authentication/api/auth-api';
import { PasswordStrengthMeter } from '@features/authentication/components/password-strength-meter';
import { PASSWORD_REQUIREMENTS } from '@features/authentication/constants/password-requirement';
import {
  resetPasswordSchema,
  type ResetPasswordSchemaFields,
} from '@features/authentication/form-validators/reset-password-schema';
import { getPasswordStrength } from '@features/authentication/utils/get-password-strength';
import { PasswordInput } from '@shared/components/common/password-input';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { setAuthToken } from '@shared/services/set-auth-tokens';

export default function PageResetPassword() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const theme = useTheme();

  const identifier = searchParams.get('identifier');

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isDirty },
  } = useForm<ResetPasswordSchemaFields>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  const { trigger: resetPassword, isMutating } = useMutation(
    API_CACHE_KEY.FORGOT_PASSWORD,
    authApi.resetPassWord,
    {
      onSuccess: (data) => {
        toast.success('Password has been reset');

        setAuthToken(data.data.accessToken);

        router.push(AppRoute.Dashboard);
      },
    },
  );

  const isMatchingPassword = password === repeatPassword;

  const passwordStrength = getPasswordStrength(password);

  const isStrongPassword = passwordStrength === PASSWORD_REQUIREMENTS.length;

  const handleReset: SubmitHandler<ResetPasswordSchemaFields> = (formData) => {
    if (!identifier) {
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError('repeatPassword', {
        type: 'custom',
        message: 'Passwords do not match',
      });

      return;
    }

    resetPassword({
      password,
      identifier,
    });
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
            Create a new
            <br />
            password
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{
          width: 380,
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
          Create a new password
        </Typography>
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel>Password</FormLabel>
          <PasswordInput
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>
        <PasswordStrengthMeter
          password={password}
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 3 }}>
          <FormLabel component="legend">Repeat Password</FormLabel>
          <PasswordInput
            error={Boolean(errors.repeatPassword)}
            helperText={errors.repeatPassword?.message}
            {...register('repeatPassword')}
          />
        </FormControl>
        <LoadingButton
          fullWidth
          type="submit"
          loading={isMutating}
          disabled={!isDirty || !isMatchingPassword || !isStrongPassword}
        >
          Confirm
        </LoadingButton>
      </Paper>
    </Box>
  );
}
