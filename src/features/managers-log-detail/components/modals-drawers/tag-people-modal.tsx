'use client';

import { useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { useMutateUpdateLogEntryTags } from '@features/managers-log-detail/hooks/api/use-mutate-update-log-entry-tags';
import { useRequestFacilityEmployees } from '@features/managers-log-detail/hooks/api/use-request-facility-employees';
import { tagPeopleModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import type { TagPeopleModalAtom } from '@features/managers-log-detail/types/state';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export const TagPeopleModal = () => {
  const entryDataRef = useRef<TagPeopleModalAtom | null>(null);

  const theme = useTheme();

  const searchParams = useSearchParams();

  const entryData = useAtomValue(tagPeopleModalAtom);

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

    defaultStore.set(tagPeopleModalAtom, (prev) => {
      if (!prev) return null;

      prev.taggedUsers = selectedUsers;

      return prev;
    });
  };

  const open = Boolean(entryData);

  const allUsers = getUserListResponse?.data.nodes ?? [];

  const displayEntryData = entryData ?? entryDataRef.current;

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          flexFlow: 'row',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          Tag the people
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 400,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
        }}
      >
        {getUserListLoading && <LoadingIndicator />}
        {!getUserListLoading && (
          <SearchCheckbox
            visibleOptions={10}
            sx={{
              borderRadius: 0,
            }}
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
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          onClick={() => {
            defaultStore.set(tagPeopleModalAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          loading={updateLoading}
          onClick={handleUpdate}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
