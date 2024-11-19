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
import { useRouter } from 'next/navigation';

import { fillingSettingWarnModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const FillingSettingWarnModal = () => {
  const theme = useTheme();

  const router = useRouter();

  const open = useAtomValue(fillingSettingWarnModalAtom);

  const handleConfirm = () => {
    defaultStore.set(fillingSettingWarnModalAtom, false);

    router.push(AppRoute.ManagersLog);
  };

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
          Warning
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
        <Typography sx={{ p: 3 }}>
          The weather and assignees fields are required. Please finish filling
          out these fields.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(fillingSettingWarnModalAtom, false);
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ px: 7 }}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
