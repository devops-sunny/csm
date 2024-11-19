'use client';

import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';

import { AddEditModuleForm } from '@features/managers-log-settings/components/common/add-edit-module-form';
import { mobileAddEditModuleAtom } from '@features/managers-log-settings/states/common';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export const MobileAddEditModuleDrawer = () => {
  const addEditModuleRef = useRef<Partial<ApiType['Module']> | null>(null);

  const addEditModule = useAtomValue(mobileAddEditModuleAtom);

  const open = Boolean(addEditModule);

  useEffect(() => {
    if (addEditModule) {
      addEditModuleRef.current = addEditModule;
    }
  }, [addEditModule]);

  const editModule = addEditModule ?? addEditModuleRef.current;

  const isAdd = !editModule?.id;

  return (
    <MobileFullScreenDrawer
      open={Boolean(open)}
      onClose={() => {
        defaultStore.set(mobileAddEditModuleAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(mobileAddEditModuleAtom, null);
      }}
      title={isAdd ? 'New Module' : editModule.headerTitle}
    >
      <AddEditModuleForm stateAtom={mobileAddEditModuleAtom} />
    </MobileFullScreenDrawer>
  );
};
