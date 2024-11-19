'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

import { FloatingActions } from '@features/managers-log-settings/components/common/floating-actions';
import { ModuleColumn } from '@features/managers-log-settings/components/modules/module-column';
import { useRequestLogSetting } from '@features/managers-log-settings/hooks/api/use-lazy-request-log-setting';
import { useMutationUpdateModuleBulk } from '@features/managers-log-settings/hooks/api/use-mutation-update-module-bulk';
import { handleModuleDrop } from '@features/managers-log-settings/services/handle-module-drop';
import { moduleColumnConfigAtom } from '@features/managers-log-settings/states/common';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export const DraggableModules = () => {
  const theme = useTheme();

  const moduleColumn = useAtomValue(moduleColumnConfigAtom);

  const { isLoading: getSettingLoading } = useRequestLogSetting();

  const { trigger: updateModuleBulk } = useMutationUpdateModuleBulk();

  const handleDragEnd = async (dropResult: DropResult) => {
    handleModuleDrop(dropResult);

    const savedModuleColumn = defaultStore.get(moduleColumnConfigAtom);

    if (!savedModuleColumn) {
      return;
    }

    const allModules = Object.values(savedModuleColumn).reduce<
      ApiType['Module'][]
    >((acc, column) => [...acc, ...column.modules], []);

    const mappedAllModules = allModules.map((module, index) => ({
      logModuleId: module.id,
      order: index + 1,
    }));

    await updateModuleBulk(mappedAllModules);
  };

  const allModules = Object.values(moduleColumn ?? {});

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {!getSettingLoading && !moduleColumn && (
          <Box sx={{ gridColumnStart: 1, gridColumnEnd: 3 }} />
        )}
        {getSettingLoading && (
          <Box
            sx={{
              position: 'relative',
              gridColumnStart: 1,
              gridColumnEnd: 3,
              [theme.breakpoints.down('md')]: {
                mt: 10,
              },
            }}
          >
            <LoadingIndicator />
          </Box>
        )}
        {!getSettingLoading &&
          allModules.map((column, index) => (
            <ModuleColumn
              key={column.id}
              column={column}
              lastColumn={index === allModules.length - 1}
            />
          ))}
      </DragDropContext>
      <FloatingActions />
    </>
  );
};
