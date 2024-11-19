'use client';

import type { FunctionComponent } from 'react';
import { Paper, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Draggable } from 'react-beautiful-dnd';

import { addEditModuleAtom } from '@features/managers-log-settings/states/common';
import { deleteModuleIdModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { ContextMenu } from '@shared/components/common/context-menu';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export type ModuleItemProps = {
  sx?: SxProps<Theme>;
  index: number;
  module: ApiType['Module'];
};

export const ModuleItem: FunctionComponent<ModuleItemProps> = ({
  sx,
  index,
  module,
}) => {
  const theme = useTheme();

  const { id, order, headerTitle } = module;

  return (
    <Draggable
      draggableId={id.toString()}
      index={index}
    >
      {(provided) => (
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            pl: 2.5,
            pr: 1.5,
            minHeight: 48,
            mb: 1.5,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
            ...sx,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Typography
            fontWeight={500}
            pr={2}
            py={1}
          >
            {order}. {headerTitle}
          </Typography>
          <ContextMenu
            menuItems={[
              {
                label: 'Edit',
                onClick: () => {
                  defaultStore.set(addEditModuleAtom, module);
                },
              },
              {
                label: 'Delete',
                onClick: () => {
                  defaultStore.set(deleteModuleIdModalAtom, id);
                },
              },
            ]}
          />
        </Paper>
      )}
    </Draggable>
  );
};
