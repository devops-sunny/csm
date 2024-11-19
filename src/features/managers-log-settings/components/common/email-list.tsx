import { type FunctionComponent } from 'react';
import type { SxProps } from '@mui/material';
import { FormControl, FormControlLabel, Checkbox, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { managersLogSettingsApi } from '@features/managers-log-settings/api/managers-log-settings-api';
import { useRequestLogSetting } from '@features/managers-log-settings/hooks/api/use-lazy-request-log-setting';
import {
  selectedFacilityIdAtom,
  subscriberIdsAtom,
} from '@features/managers-log-settings/states/common';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRequest } from '@shared/hooks/api/core/use-request';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { UserType } from '@shared/types/api/generated';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export type EmailListProps = {
  sx?: SxProps<Theme>;
};

export const EmailList: FunctionComponent<EmailListProps> = ({ sx }) => {
  const theme = useTheme();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const subscriberIds = useAtomValue(subscriberIdsAtom);

  const { revalidate } = useRevalidate();

  const { data: getFacilityEmployeeResponse, isLoading: getUserListLoading } =
    useRequest(
      [API_CACHE_KEY.GET_FACILITY_EMPLOYEES, selectedFacilityId],
      () =>
        managersLogSettingsApi.getUserList({
          filter: {
            facilityId: selectedFacilityId,
            userType: UserType.Manager,
          },
          metadata: { size: -1, page: 1 },
        }),
      { skip: !selectedFacilityId },
    );

  const { isLoading: getSettingLoading } = useRequestLogSetting();

  const {
    trigger: updateLogSettingSubscribers,
    isMutating: updateLogSubscribersLoading,
  } = useMutation(
    API_CACHE_KEY.UPDATE_SETTING_SUBSCRIBERS,
    managersLogSettingsApi.updateSubscribers,
    {
      onSuccess: () => {
        revalidate([API_CACHE_KEY.GET_MANAGER_LOG_SETTING, selectedFacilityId]);
      },
    },
  );

  const handleChangeSubscriber = (subscriberId: number, checked: boolean) => {
    if (!selectedFacilityId) return;

    let updatePromise;

    if (checked) {
      const newUserIds = [...subscriberIds, subscriberId];

      updatePromise = updateLogSettingSubscribers({
        facilityId: Number(selectedFacilityId),
        userIds: newUserIds,
      });

      defaultStore.set(subscriberIdsAtom, newUserIds);
    } else {
      const newUserIds = subscriberIds.filter((id) => id !== subscriberId);

      updatePromise = updateLogSettingSubscribers({
        facilityId: Number(selectedFacilityId),
        userIds: newUserIds,
      });

      defaultStore.set(subscriberIdsAtom, newUserIds);
    }

    toast.promise(updatePromise, {
      loading: 'Updating',
      success: 'Updated',
      error: 'Failed to update',
    });
  };

  const allUsers = getFacilityEmployeeResponse?.data.nodes;

  const getLoading = getSettingLoading || getUserListLoading;

  if (!selectedFacilityId) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        position: 'relative',
        gap: 2.5,
        ...sx,
      }}
    >
      {getLoading && (
        <LoadingIndicator
          sx={{
            [theme.breakpoints.down('md')]: {
              mt: 2,
            },
          }}
        />
      )}
      {!getLoading &&
        allUsers?.map((user) => {
          const isSubscribed = subscriberIds.includes(user.id);

          return (
            <FormControl
              disabled={updateLogSubscribersLoading || getSettingLoading}
              key={user.id}
              sx={{
                [theme.breakpoints.down('md')]: {
                  borderBottom: '1px solid',
                  py: 2,
                  px: 3,
                  borderColor: theme.palette.blueHaze,
                },
              }}
            >
              <FormControlLabel
                checked={isSubscribed}
                onChange={(_event, checked) =>
                  handleChangeSubscriber(user.id, checked)
                }
                control={<Checkbox />}
                label={getNormalizeFullName(user.firstName, user.lastName)}
                sx={{
                  [theme.breakpoints.down('md')]: {
                    justifyContent: 'space-between',
                    flexFlow: 'row-reverse',
                  },
                }}
              />
            </FormControl>
          );
        })}
    </Box>
  );
};
