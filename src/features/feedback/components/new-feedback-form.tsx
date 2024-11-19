import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { feedbackApi } from '@features/feedback/api/feedback-api';
import type { NewFeedbackFields } from '@features/feedback/form-validators/new-feedback-schema';
import { newFeedbackSchema } from '@features/feedback/form-validators/new-feedback-schema';
import { feedbackSearchTextAtom } from '@features/feedback/states/common';
import { FacilitySelect } from '@shared/components/common/facility-select';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';
import {
  openMobileNewFeedbackDrawerAtom,
  openNewFeedbackDrawerAtom,
} from '@shared/states/modals-drawers';
import { ContactByType, FeedbackType } from '@shared/types/api/generated';

export const NewFeedbackForm = () => {
  const theme = useTheme();

  const { revalidateInfinitePage } = useRevalidate();

  const searchText = useAtomValue(feedbackSearchTextAtom);

  const { trigger: addFeedback, isMutating } = useMutation(
    API_CACHE_KEY.ADD_FEEDBACK,
    feedbackApi.createFeedback,
    {
      onSuccess: () => {
        revalidateInfinitePage([API_CACHE_KEY.GET_FEEDBACK_LIST, searchText], {
          hasNewData: true,
        });

        defaultStore.set(openNewFeedbackDrawerAtom, false);
        defaultStore.set(openMobileNewFeedbackDrawerAtom, false);
      },
    },
  );

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NewFeedbackFields>({
    resolver: zodResolver(newFeedbackSchema),
    defaultValues: {
      feedbackType: FeedbackType.App,
      isAnonymous: false,
    },
  });

  watch(['isAnonymous', 'feedbackType']);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'isAnonymous' && Boolean(value)) {
        setValue('contactBy', undefined);
      }

      if (name === 'feedbackType') {
        setValue('facilityId', undefined);
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const handleSubmitFeedback: SubmitHandler<NewFeedbackFields> = async (
    formData,
  ) => {
    const addPromise = addFeedback(formData);

    toast.promise(addPromise, {
      loading: 'Sending feedback...',
      success: 'Feedback sent successfully',
      error: 'Failed to send feedback',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitFeedback)}
      sx={{ height: 1, display: 'flex', flexFlow: 'column' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          gap: 1,
          width: 1,
          py: 1.5,
          px: 2,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.catskillWhite,
        }}
      >
        <Typography>Choose a type of feedback</Typography>
        <FormControl sx={{ flex: 1 }}>
          <Select
            value={getValues('feedbackType')}
            onChange={(event) => {
              const { value } = event.target;

              setValue('feedbackType', value as FeedbackType);
            }}
          >
            <MenuItem value={FeedbackType.App}>App Feedback</MenuItem>
            <MenuItem value={FeedbackType.Work}>Work Feedback</MenuItem>
          </Select>
        </FormControl>
        {getValues('feedbackType') === FeedbackType.Work && (
          <FormControl>
            <FacilitySelect
              placeholder="Facility Name"
              value={getValues('facilityId')}
              onChange={(value) => setValue('facilityId', value)}
            />
            <FormHelperText error={Boolean(errors.facilityId)}>
              {errors.facilityId?.message}
            </FormHelperText>
          </FormControl>
        )}
      </Box>
      <Box
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          flexFlow: 'column',
          flex: 1,
        }}
      >
        <FormControl
          fullWidth
          sx={{ mb: 2, flex: 1 }}
        >
          <Typography>Message</Typography>
          <TextField
            placeholder="Please Input Your Message"
            multiline
            sx={{
              height: '100%',
              minHeight: 100,
              boxSizing: 'border-box',
              '.MuiOutlinedInput-root': {
                height: 1,
              },
            }}
            InputProps={{
              sx: {
                height: '100%',
                alignItems: 'start',
              },
            }}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
            {...register('message')}
          />
        </FormControl>
        <FormControlLabel
          name="isAnonymous"
          label="Send anonymously"
          checked={getValues('isAnonymous')}
          onChange={(_event, checked) => {
            setValue('isAnonymous', checked);
          }}
          control={<Checkbox />}
        />
        {!getValues('isAnonymous') && (
          <>
            <Typography sx={{ mt: 3, fontWeight: 500 }}>
              Choose a way of possible contact:
            </Typography>
            <FormControl sx={{ mb: 0.5, ml: -1 }}>
              <RadioGroup
                row
                value={getValues('contactBy')}
                onChange={(event) => {
                  const { value } = event.target;
                  setValue('contactBy', value as ContactByType);
                }}
              >
                <FormControlLabel
                  value={ContactByType.Email}
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value={ContactByType.Phone}
                  control={<Radio />}
                  label="Phone"
                />
              </RadioGroup>
              <FormHelperText
                error={Boolean(errors.contactBy)}
                sx={{ pl: 1 }}
              >
                {errors.contactBy?.message}
              </FormHelperText>
            </FormControl>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: 1,
          p: 2,
          mt: 'auto',
          height: 80,
          boxSizing: 'border-box',
          borderTop: '1px solid',
          borderColor: theme.palette.catskillWhite,
          [theme.breakpoints.down('md')]: {
            bgcolor: theme.palette.cello,
          },
        }}
      >
        <Button
          fullWidth
          onClick={() => {
            defaultStore.set(openNewFeedbackDrawerAtom, false);
            defaultStore.set(openMobileNewFeedbackDrawerAtom, false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          fullWidth
          type="submit"
          loading={isMutating}
        >
          Send
        </LoadingButton>
      </Box>
    </Box>
  );
};
