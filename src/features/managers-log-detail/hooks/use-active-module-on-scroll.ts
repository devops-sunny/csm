import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { useDebounceCallback } from 'usehooks-ts';

import {
  activeModuleAtom,
  mobileActiveModuleIdAtom,
} from '@features/managers-log-detail/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useActiveModuleOnScroll = (orderedModules: { id: number }[]) => {
  const inViewModuleIdsRef = useRef<number[]>([]);

  const activeModule = useAtomValue(activeModuleAtom);

  const handleScroll = useDebounceCallback((e) => {
    const containerElement = e.target as HTMLElement;

    const inViewModuleIds = inViewModuleIdsRef.current;

    if (inViewModuleIds.length !== 0 && activeModule?.activeBy === 'scroll') {
      const reachedTop = containerElement.scrollTop <= 60;

      const scrollDistance = Math.floor(
        containerElement.scrollHeight - containerElement.scrollTop,
      );

      const reachedBottom = scrollDistance === containerElement.clientHeight;

      const inViewModuleMiddleIndex = Math.floor(inViewModuleIds.length / 2);

      let nextActiveModuleId = inViewModuleIds[inViewModuleMiddleIndex];

      if (reachedTop) {
        nextActiveModuleId = inViewModuleIds[0] ?? 0;
      }

      if (reachedBottom) {
        nextActiveModuleId = inViewModuleIds.at(-1) ?? 0;
      }

      defaultStore.set(mobileActiveModuleIdAtom, nextActiveModuleId);

      defaultStore.set(activeModuleAtom, (prev) => ({
        ...prev,
        id: nextActiveModuleId,
        activeBy: 'scroll',
      }));

      return;
    }

    if (activeModule?.activeBy === 'click') {
      defaultStore.set(activeModuleAtom, (prev) => ({
        ...prev,
        activeBy: 'scroll',
      }));
    }
  }, 50);

  const handleModuleInViewChange = (inView: boolean, moduleId: number) => {
    if (inView) {
      const nextInViewModuleIds = orderedModules
        .filter(
          (m) => inViewModuleIdsRef.current.includes(m.id) || m.id === moduleId,
        )
        .map((m) => m.id);

      inViewModuleIdsRef.current = nextInViewModuleIds;

      return;
    }

    const nextInViewModuleIds = inViewModuleIdsRef.current.filter(
      (id) => id !== moduleId,
    );

    inViewModuleIdsRef.current = nextInViewModuleIds;
  };

  return { handleScroll, handleModuleInViewChange };
};
