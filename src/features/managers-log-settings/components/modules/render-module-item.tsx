import type { FunctionComponent } from 'react';

import { MobileModuleItem } from '@features/managers-log-settings/components/modules/mobile-module-item';
import { ModuleItem } from '@features/managers-log-settings/components/modules/module-item';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import type { ApiType } from '@shared/types/utils/api';

export type RenderModuleItemProps = {
  module: ApiType['Module'];
  index: number;
};

export const RenderModuleItem: FunctionComponent<RenderModuleItemProps> = ({
  index,
  module,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileModuleItem
        index={index}
        module={module}
      />
    );
  }

  return (
    <ModuleItem
      index={index}
      module={module}
    />
  );
};
