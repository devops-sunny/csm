'use client';

import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationLoadModule } from '@features/managers-log-settings/hooks/api/use-mutation-load-module';
import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import { mobileLoadModuleModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileLoadModuleDrawer = () => {
  const [fromFacilityId, setFromFacilityId] = useState<number>();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const theme = useTheme();

  const open = useAtomValue(mobileLoadModuleModalAtom);

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

    defaultStore.set(mobileLoadModuleModalAtom, false);
  };

  return (
    <MobileFullScreenDrawer
      open={Boolean(open)}
      onClose={() => {
        defaultStore.set(mobileLoadModuleModalAtom, false);
      }}
      onOpen={() => {
        defaultStore.set(mobileLoadModuleModalAtom, false);
      }}
      title="Load Setup"
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
            variant="contained"
            onClick={() => {
              defaultStore.set(mobileLoadModuleModalAtom, false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            fullWidth
            disabled={getAllFacilityLoading}
            loading={loadModuleLoading}
            onClick={handleLoadModule}
          >
            Create
          </LoadingButton>
        </Stack>
      }
    >
      <RadioGroup
        value={fromFacilityId}
        onChange={(event) => setFromFacilityId(Number(event.target.value))}
      >
        {facilities?.map((facility) => (
          <FormControlLabel
            key={facility.id}
            sx={{
              height: 54,
              px: 2,
              borderBottom: 'solid 1px',
              borderColor: theme.palette.blueHaze,
              flexFlow: 'row-reverse',
              justifyContent: 'space-between',
            }}
            control={<Radio />}
            value={facility.id}
            label={facility.facilityName}
          />
        ))}
      </RadioGroup>
    </MobileFullScreenDrawer>
  );
};
