'use client';

import { useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { useMutateUpdateLogEntryTags } from '@features/managers-log-detail/hooks/api/use-mutate-update-log-entry-tags';
import { useRequestFacilityEmployees } from '@features/managers-log-detail/hooks/api/use-request-facility-employees';
import { mobileTagPeopleModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import type { TagPeopleModalAtom } from '@features/managers-log-detail/types/state';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export const MobileTagPeopleDrawer = () => {
  const entryDataRef = useRef<TagPeopleModalAtom | null>(null);

  const entryData = useAtomValue(mobileTagPeopleModalAtom);

  const searchParams = useSearchParams();

  const facilityId = searchParams.get('facilityId');

  const { data: getUserListResponse, isLoading: getUserListLoading } =
    useRequestFacilityEmployees(Number(facilityId));

  const { trigger: updateTags, isMutating: updateLoading } =
    useMutateUpdateLogEntryTags();

  useEffect(() => {
    if (entryData) {
      entryDataRef.current = entryData;
    }
  }, [entryData]);

  const handleUpdate = async () => {
    if (!entryData?.taggedUsers) return;

    const deletePromise = updateTags({
      managerLogEntryId: entryData.logEntryId,
      userIds: entryData.taggedUsers.map((user) => user.id),
    });

    toast.promise(deletePromise, {
      loading: 'Updating...',
      success: 'Updated!',
      error: 'Update failed!',
    });
  };

  const handleSelect = (selectedIds: number[]) => {
    const selectedUsers =
      getUserListResponse?.data.nodes.filter((user) =>
        selectedIds.includes(user.id),
      ) ?? [];

    defaultStore.set(mobileTagPeopleModalAtom, (prev) => {
      if (!prev) return null;

      prev.taggedUsers = selectedUsers;

      return prev;
    });
  };

  const open = Boolean(entryData);

  const allUsers = getUserListResponse?.data.nodes ?? [];

  const displayEntryData = entryData ?? entryDataRef.current;

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={() => {
        defaultStore.set(mobileTagPeopleModalAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(mobileTagPeopleModalAtom, entryData);
      }}
      title="Tag the People"
      footerActions={
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          maxWidth={380}
          gap={4}
        >
          <Button
            fullWidth
            onClick={() => {
              defaultStore.set(mobileTagPeopleModalAtom, null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            fullWidth
            loading={updateLoading}
            onClick={handleUpdate}
          >
            Save
          </LoadingButton>
        </Stack>
      }
    >
      {getUserListLoading && <LoadingIndicator />}
      {!getUserListLoading && entryData && (
        <SearchCheckbox
          visibleOptions={10}
          options={allUsers.map((user) => ({
            value: String(user.id),
            label: getNormalizeFullName(user.firstName, user.lastName),
          }))}
          checkedOptions={displayEntryData?.taggedUsers?.map((taggedUser) =>
            String(taggedUser.id),
          )}
          onSelect={(selectedOptions) => {
            const selectedIds = selectedOptions.map((option) =>
              Number(option.value),
            );

            handleSelect(selectedIds);
          }}
        />
      )}
    </MobileFullScreenDrawer>
  );
};
