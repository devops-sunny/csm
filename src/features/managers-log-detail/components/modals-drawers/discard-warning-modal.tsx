import type { FunctionComponent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type DiscardWarningModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DiscardWarningModal: FunctionComponent<
  DiscardWarningModalProps
> = ({ open, onConfirm, onCancel }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      sx={{
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.25,
          height: 54,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          Discard changes?
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 420,
          height: 150,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
        }}
      >
        <Typography sx={{ m: 2 }}>
          Are you sure you want to discard the changes you&apos;ve made?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 7, height: 58, boxSizing: 'border-box' }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ px: 7 }}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
