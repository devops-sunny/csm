import type { DropResult } from 'react-beautiful-dnd';

import { moduleColumnConfigAtom } from '@features/managers-log-settings/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const handleModuleDrop = ({ source, destination }: DropResult) => {
  const moduleColumnConfig = defaultStore.get(moduleColumnConfigAtom);

  if (destination === undefined || destination === null || !moduleColumnConfig)
    return null;

  const dropSourceId = source.droppableId as keyof typeof moduleColumnConfig;

  const dropDestinationId =
    destination.droppableId as keyof typeof moduleColumnConfig;

  const sourceIndex = source.index;
  const destinationIndex = destination.index;

  if (dropSourceId === dropDestinationId && sourceIndex === destinationIndex)
    return null;

  const sourceColumn = moduleColumnConfig[dropSourceId];

  const destinationColumn = moduleColumnConfig[dropDestinationId];

  const isDropSameColumn = dropSourceId === dropDestinationId;

  if (isDropSameColumn) {
    const newSourceModules = sourceColumn.modules.filter(
      (_: unknown, index: number) => index !== source.index,
    );

    newSourceModules.splice(
      destination.index,
      0,
      sourceColumn.modules[source.index],
    );

    const newCol = {
      id: sourceColumn.id,
      modules: newSourceModules,
    };

    defaultStore.set(moduleColumnConfigAtom, (prev) => ({
      ...prev,
      [newCol.id]: newCol,
    }));

    return null;
  }

  const newSourceModules = sourceColumn.modules.filter(
    (_: unknown, idx: number) => idx !== source.index,
  );

  const newSourceColumn = {
    id: sourceColumn.id,
    modules: newSourceModules,
  };

  const newDestinationModules = [...destinationColumn.modules];

  newDestinationModules.splice(
    destination.index,
    0,
    sourceColumn.modules[source.index],
  );

  const newEndCol = {
    id: destinationColumn.id,
    modules: newDestinationModules,
  };

  defaultStore.set(moduleColumnConfigAtom, (prev) => ({
    ...prev,
    [newSourceColumn.id]: newSourceColumn,
    [newEndCol.id]: newEndCol,
  }));

  return null;
};
