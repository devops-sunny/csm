'use client';

import type { FunctionComponent } from 'react';
import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Droppable } from 'react-beautiful-dnd';

import { RenderModuleItem } from '@features/managers-log-settings/components/modules/render-module-item';
import type { ApiType } from '@shared/types/utils/api';

export type ModuleColumnProps = {
  column: {
    id: string;
    modules: ApiType['Module'][];
  };
  lastColumn?: boolean;
};

export const ModuleColumn: FunctionComponent<ModuleColumnProps> = ({
  column: { modules, id },
  lastColumn,
}) => {
  const theme = useTheme();

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Box
          sx={{
            [theme.breakpoints.down('md')]: {
              pb: lastColumn ? 8 : 0,
            },
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {modules.map((module, index) => (
            <RenderModuleItem
              key={module.id}
              index={index}
              module={module}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
