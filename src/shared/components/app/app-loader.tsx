import { LinearProgress } from '@mui/material';
import { useAtomValue } from 'jotai';

import { appLoadingAtom } from '@shared/states/common';

export const AppLoader = () => {
  const loading = useAtomValue(appLoadingAtom);

  return (
    <LinearProgress
      sx={{
        borderRadius: 0,
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        width: '1',
        display: loading ? 'block' : 'none',
        '. MuiLinearProgress-bar': {
          borderRadius: 0,
          border: 'none',
        },
      }}
    />
  );
};
