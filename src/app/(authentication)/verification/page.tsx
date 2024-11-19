'use client';

import { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { authApi } from '@features/authentication/api/auth-api';
import type { VerifyOtpSchemaFields } from '@features/authentication/form-validators/verify-otp-schema';
import { verifyOtpSchema } from '@features/authentication/form-validators/verify-otp-schema';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { AppRoute } from '@shared/constants/app-route';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { setAuthToken } from '@shared/services/set-auth-tokens';
import { MFAPurpose, MFAType } from '@shared/types/api/generated';

export default function PageVerification() {
  const searchParams = useSearchParams();

  const { revalidate } = useRevalidate();

  const router = useRouter();

  const theme = useTheme();

  const identifier = searchParams.get('identifier');
  const phone = searchParams.get('phone');
  const purpose = searchParams.get('purpose');

  const {
    handleSubmit,
    register,
    setError,
    setFocus,
    formState: { errors, isDirty },
  } = useForm<VerifyOtpSchemaFields>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const { trigger: sendOtp } = useMutation(
    API_CACHE_KEY.SEND_OTP,
    authApi.sendOtp,
  );

  const {
    trigger: verifyForgotPassword,
    isMutating: verifyingForgotPasswordLoading,
  } = useMutation(
    API_CACHE_KEY.VERIFY_FORGOT_PASSWORD,
    authApi.verifyForgotPassword,
    {
      onSuccess: (data) => {
        const { identifier: newIdentifier } = data.data;

        const queryParams = new URLSearchParams({
          identifier: newIdentifier,
        });

        router.push(`${AppRoute.ResetPassword}?${queryParams.toString()}`);
      },
      onError: (responseErrors) => {
        setError('otp', {
          type: 'custom',
          message: responseErrors.errors[0].error,
        });
      },
    },
  );

  const { trigger: verifyOtp, isMutating: verifyOtpLoading } = useMutation(
    API_CACHE_KEY.VERIFY_OTP,
    authApi.verifyOtp,
    {
      onError: (responseErrors) => {
        setError(
          'otp',
          {
            type: 'custom',
            message: responseErrors.errors[0].error,
          },
          { shouldFocus: true },
        );
      },
      onSuccess: (data) => {
        setAuthToken(data.data.token);

        router.push(AppRoute.Home);
      },
    },
  );

  useEffect(() => {
    setFocus('otp');
  }, [setFocus]);

  const handleSendOtp = useCallback(() => {
    if (!identifier || !purpose) {
      return;
    }

    switch (purpose) {
      case MFAPurpose.Login: {
        sendOtp({ purpose: MFAPurpose.Login, identifier, type: MFAType.Email });

        break;
      }

      case MFAPurpose.Reset: {
        sendOtp({ purpose: MFAPurpose.Reset, identifier, type: MFAType.Email });

        break;
      }

      default: {
        break;
      }
    }
  }, [identifier, purpose, sendOtp]);

  const handleSubmitOtp: SubmitHandler<VerifyOtpSchemaFields> = async (
    formData,
  ) => {
    if (!identifier) {
      return;
    }

    const { otp } = formData;

    switch (purpose) {
      case MFAPurpose.Login: {
        await verifyOtp({
          purpose: MFAPurpose.Login,
          identifier,
          otp: otp.toLowerCase(),
        });

        revalidate(API_CACHE_KEY.GET_USER_PROFILE);

        break;
      }

      case MFAPurpose.Reset: {
        verifyForgotPassword({
          identifier,
          otp: otp.toLowerCase(),
        });

        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <Box
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
          gridColumn: 1,
          textAlign: 'right',
          my: 'auto',
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
            Please Authenticate
            <br />
            With 2-Factor
            <br />
            Authentication
          </Typography>
        </Box>
      </Box>
      <Paper
        component="form"
        onSubmit={handleSubmit(handleSubmitOtp)}
        sx={{
          width: 360,
          backgroundColor: theme.palette.white,
          gridColumn: 2,
          p: 4,
          boxSizing: 'border-box',
          display: 'flex',
          flexFlow: 'column',
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            width: 340,
            p: 3,
          },
        }}
      >
        <Typography
          sx={{
            display: 'none',
            mb: 1.5,
            [theme.breakpoints.down('md')]: {
              display: 'block',
              fontSize: 18,
              fontWeight: 500,
            },
          }}
        >
          Please authorize With 2-Factor Authentication
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          As an additional layer of security,
          <br />
          we sent a one-time verification code to the number ending in {phone}
        </Typography>
        <FormControl
          sx={{
            width: 120,
            alignSelf: 'center',
            mb: 1.5,
            [theme.breakpoints.down('md')]: {
              width: 130,
            },
          }}
        >
          <TextField
            placeholder="000000"
            autoFocus
            error={Boolean(errors.otp)}
            inputProps={{
              maxLength: 6,
              style: {
                textAlign: 'center',
                textTransform: 'uppercase',
              },
            }}
            {...register('otp')}
          />
        </FormControl>
        <FormHelperText
          error={Boolean(errors.otp)}
          sx={{ mb: 1.5, mt: -1, textAlign: 'center' }}
        >
          {errors.otp?.message}
        </FormHelperText>
        <Typography sx={{ mb: 2 }}>
          <Typography component="span">
            Didn&apos;t receive the code?
          </Typography>
          <Button
            variant="link"
            sx={{ fontSize: 13, ml: 0.5 }}
            onClick={handleSendOtp}
          >
            Resend
          </Button>
        </Typography>

        <Typography sx={{ mb: 3.5 }}>
          <Typography component="span">Let’s try</Typography>{' '}
          <Button
            variant="link"
            sx={{ fontSize: 13 }}
            disabled
          >
            an alternative authentication method
          </Button>
        </Typography>
        <LoadingButton
          fullWidth
          type="submit"
          loading={verifyOtpLoading || verifyingForgotPasswordLoading}
          disabled={!isDirty}
        >
          Confirm
        </LoadingButton>
      </Paper>
    </Box>
  );
}
