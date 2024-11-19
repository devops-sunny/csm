'use client';

import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationLoadModule } from '@features/managers-log-settings/hooks/api/use-mutation-load-module';
import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import { loadModuleModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const LoadModuleModal = () => {
  const [fromFacilityId, setFromFacilityId] = useState<number>();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const theme = useTheme();

  const open = useAtomValue(loadModuleModalAtom);

  const { data: getAllFacilityResponse, isLoading: getAllFacilityLoading } =
    useRequestAllFacility();

  const { trigger: loadModule, isMutating: loadModuleLoading } =
    useMutationLoadModule();

  const facilities = getAllFacilityResponse?.data;

  const handleLoadModule = async () => {
    if (!fromFacilityId || !selectedFacilityId) return;

    const loadPromise = loadModule({
      facilityId: selectedFacilityId,
      loadFromFacilityId: fromFacilityId,
    });

    await toast.promise(loadPromise, {
      loading: 'Loading modules...',
      success: 'Loaded!',
      error: 'Load failed!',
    });

    defaultStore.set(loadModuleModalAtom, false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 54,
          py: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          Load Setup
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 450,
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            my: 3,
            mx: 8,
          }}
        >
          <Typography>
            Please choose a facility to copy the setup from.
          </Typography>
          <FormControl sx={{ mt: 2.5, width: 250, mx: 'auto' }}>
            <FormLabel component="legend">Select Location</FormLabel>
            <Select
              defaultValue={0}
              value={fromFacilityId}
              onChange={(event) =>
                setFromFacilityId(event.target.value as number)
              }
            >
              <MenuItem
                disabled
                value={0}
              >
                Select Location
              </MenuItem>
              {facilities?.map((facility) => (
                <MenuItem
                  key={facility.id}
                  value={Number(facility.id)}
                >
                  {facility.facilityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(loadModuleModalAtom, false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          disabled={getAllFacilityLoading}
          onClick={handleLoadModule}
          loading={loadModuleLoading}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
