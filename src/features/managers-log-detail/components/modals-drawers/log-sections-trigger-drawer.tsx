import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import ListIcon from '@assets/icons/common/list.svg';
import { useRequestLogEntries } from '@features/managers-log-detail/hooks/api/use-request-log-entries';
import { mobileActiveModuleIdAtom } from '@features/managers-log-detail/states/common';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { MODULE_ID_PREFIX } from '@shared/constants/managers-log';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const LogSectionsTriggerDrawer = () => {
  const mobileActiveModuleId = useAtomValue(mobileActiveModuleIdAtom);

  const router = useRouter();

  const { data: logEntryResponse } = useRequestLogEntries();

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      const moduleId = hash.replace(`#${MODULE_ID_PREFIX}`, '');

      if (moduleId !== mobileActiveModuleId?.toString()) {
        defaultStore.set(mobileActiveModuleIdAtom, Number(moduleId));
      }
    } else {
      const modules = logEntryResponse?.data.modules ?? [];

      if (modules.length > 0 && mobileActiveModuleId === null) {
        defaultStore.set(mobileActiveModuleIdAtom, modules[0].id);
      }
    }
    // should only work in the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logEntryResponse?.data.modules]);

  const handleOnSelect = (moduleId: string) => {
    defaultStore.set(mobileActiveModuleIdAtom, Number(moduleId));

    router.push(`#${MODULE_ID_PREFIX}${moduleId}`);
  };

  const modules = logEntryResponse?.data.modules ?? [];

  return (
    <MobileDrawerSelect
      title="Log Sections"
      options={modules.map((module) => ({
        value: module.id.toString(),
        label: module.headerTitle,
      }))}
      value={mobileActiveModuleId?.toString()}
      onChange={handleOnSelect}
      TriggerComponent={({ onOpen }) => (
        <IconButton onClick={onOpen}>
          <ListIcon />
        </IconButton>
      )}
    />
  );
};
