'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Typography,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { managerLogDetailApi } from '@features/managers-log-detail/api/manager-log-detail-api';
import {
  searchQueryAtom,
  showOnlyMyEntriesAtom,
} from '@features/managers-log-detail/states/common';
import {
  deleteEntryIdModalAtom,
  mobileDeleteEntryIdModalAtom,
} from '@features/managers-log-detail/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const DeleteLogEntry = () => {
  const theme = useTheme();

  const logEntryIdDesktop = useAtomValue(deleteEntryIdModalAtom);

  const logEntryIdMobile = useAtomValue(mobileDeleteEntryIdModalAtom);

  const { revalidate } = useRevalidate();

  const params = useParams();

  const showOnlyMyEntries = useAtomValue(showOnlyMyEntriesAtom);

  const searchQuery = useAtomValue(searchQueryAtom);

  const logId = params.logId as string;

  const handleHideModal = () => {
    defaultStore.set(deleteEntryIdModalAtom, null);
    defaultStore.set(mobileDeleteEntryIdModalAtom, null);
  };

  const { trigger: deleteLogEntry, isMutating: deleteLoading } = useMutation(
    API_CACHE_KEY.DELETE_LOG_ENTRY,
    managerLogDetailApi.deleteLogEntry,
    {
      onSuccess: () => {
        handleHideModal();

        revalidate([
          API_CACHE_KEY.GET_LOG_ENTRIES,
          logId,
          showOnlyMyEntries,
          searchQuery,
        ]);
      },
    },
  );

  const handleDelete = async () => {
    const logEntryId = logEntryIdDesktop ?? logEntryIdMobile;

    if (!logEntryId) return;

    const deletePromise = deleteLogEntry({
      entryId: logEntryId.toString(),
    });

    toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: 'Deleted!',
      error: 'Delete failed!',
    });
  };

  return (
    <Box sx={{ height: 1, display: 'flex', flexFlow: 'column' }}>
      <DialogContent
        sx={{
          width: 400,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
          height: 1,
          [theme.breakpoints.down('md')]: {
            width: '100%',
          },
        }}
      >
        <Typography sx={{ p: 3 }}>
          Are you sure you want to delete this log entry? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          gap: 2,
          mt: 'auto',
          [theme.breakpoints.down('md')]: {
            bgcolor: theme.palette.cello,
            gap: 4,
          },
        }}
      >
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={handleHideModal}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          loading={deleteLoading}
          onClick={handleDelete}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Box>
  );
};
