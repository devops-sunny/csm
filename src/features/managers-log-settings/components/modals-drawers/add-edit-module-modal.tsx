'use client';

import { useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

import { AddEditModuleForm } from '@features/managers-log-settings/components/common/add-edit-module-form';
import { addEditModuleAtom } from '@features/managers-log-settings/states/common';
import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';
import type { ApiType } from '@shared/types/utils/api';

export const AddEditModuleModal = () => {
  const addEditModuleRef = useRef<Partial<ApiType['Module']> | null>(null);

  const theme = useTheme();

  const addEditModule = useAtomValue(addEditModuleAtom);

  const open = Boolean(addEditModule);

  useEffect(() => {
    if (addEditModule) {
      addEditModuleRef.current = addEditModule;
    }
  }, [addEditModule]);

  const editModule = addEditModule ?? addEditModuleRef.current;

  const isAdd = !editModule?.id;

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
          {isAdd ? 'New Module' : editModule.headerTitle}
        </Typography>
        {!isAdd && (
          <Typography
            sx={{ color: theme.palette.white, fontSize: 11, fontWeight: 500 }}
          >
            Updated:
            <br />
            {dayjs(editModule.updatedAt).format(US_SHORT_DATE_FORMAT)}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          width: 450,
          boxSizing: 'border-box',
          m: 0,
        }}
      >
        <AddEditModuleForm stateAtom={addEditModuleAtom} />
      </DialogContent>
    </Dialog>
  );
};
