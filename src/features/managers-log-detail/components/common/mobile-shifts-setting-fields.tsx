import { useState, useEffect } from 'react';
import { FormControl, FormLabel } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';

import { ShiftUpdateKey } from '@features/managers-log-detail/constants/common';
import { useMutateUpdateLog } from '@features/managers-log-detail/hooks/api/use-mutate-update-log';
import { useRequestFacilityEmployees } from '@features/managers-log-detail/hooks/api/use-request-facility-employees';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerCheckbox } from '@shared/components/common/mobile-drawer-checkbox';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export const MobileShiftsSettingFields = () => {
  const [openUserIds, setOpenUserIds] = useState<string[]>([]);
  const [midUserIds, setMidUserIds] = useState<string[]>([]);
  const [closeUserIds, setCloseUserIds] = useState<string[]>([]);

  const params = useParams();

  const searchParams = useSearchParams();

  const facilityId = searchParams.get('facilityId');

  const logId = params.logId as string;

  const { data: getUserListResponse, isLoading: getUserListLoading } =
    useRequestFacilityEmployees(Number(facilityId));

  const { data: getLogDetailResponse, isLoading: getLogDetailLoading } =
    useRequestLogDetail();

  const { trigger: updateLog, isMutating: updateLogLoading } =
    useMutateUpdateLog();

  const allUsers = getUserListResponse?.data.nodes ?? [];

  const logDetail = getLogDetailResponse?.data;

  useEffect(() => {
    setOpenUserIds(logDetail?.open?.map((user) => String(user.id)) ?? []);
    setMidUserIds(logDetail?.mid?.map((user) => String(user.id)) ?? []);
    setCloseUserIds(logDetail?.close?.map((user) => String(user.id)) ?? []);
  }, [logDetail]);

  if (!logId) {
    return null;
  }

  const handleChangeShifts = (updateKey: ShiftUpdateKey, userIds: string[]) => {
    updateLog({ logId: Number(logId), [updateKey]: userIds.map(Number) });

    switch (updateKey) {
      case ShiftUpdateKey.Open: {
        setOpenUserIds(userIds);

        break;
      }

      case ShiftUpdateKey.Mid: {
        setMidUserIds(userIds);

        break;
      }

      case ShiftUpdateKey.Close: {
        setCloseUserIds(userIds);

        break;
      }

      default: {
        break;
      }
    }
  };

  return [
    {
      label: 'Open',
      userIds: openUserIds,
      updateKey: ShiftUpdateKey.Open,
    },
    {
      label: 'Mid',
      userIds: midUserIds,
      updateKey: ShiftUpdateKey.Mid,
    },
    {
      label: 'Close',
      userIds: closeUserIds,
      updateKey: ShiftUpdateKey.Close,
    },
  ].map(({ label, userIds, updateKey }) => (
    <FormControl key={label}>
      <FormLabel>{label}</FormLabel>
      <MobileDrawerCheckbox
        disabled={getUserListLoading || getLogDetailLoading || updateLogLoading}
        title="Select Employee"
        options={allUsers.map((user) => ({
          value: String(user.id),
          label: getNormalizeFullName(user.firstName, user.lastName),
        }))}
        checkedOptions={userIds.map((id) => id)}
        onChange={(options) => {
          handleChangeShifts(updateKey, options);
        }}
        TriggerComponent={({ onOpen, checkedOptions }) => {
          let output = '';

          if (checkedOptions.length > 0) {
            output = `${checkedOptions[0].label}`;
          }

          if (checkedOptions.length > 1) {
            output = `${output} [+${checkedOptions.length - 1}]`;
          }

          return (
            <AnchorInput
              fullWidth
              placeholder="Select Employee"
              value={output}
              disabled={
                getUserListLoading || getLogDetailLoading || updateLogLoading
              }
              autoComplete="off"
              onClick={getUserListLoading ? () => {} : onOpen}
            />
          );
        }}
      />
    </FormControl>
  ));
};
