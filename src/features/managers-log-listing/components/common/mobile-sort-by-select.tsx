import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { MangerLogSortBy, SortOrder } from '@shared/types/api/generated';

export const MobileSortBySelect = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const handleSelect = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');

    defaultStore.set(queryParamsAtom, (prev) => {
      prev.metadata.sortBy = sortBy as MangerLogSortBy;
      prev.metadata.sortOrder = sortOrder as SortOrder;
    });
  };

  return (
    <MobileDrawerSelect
      title="Sort by"
      options={[
        {
          value: `${MangerLogSortBy.CreatedAt}-${SortOrder.Desc}`,
          label: 'Sort by date A > Z',
        },
        {
          value: `${MangerLogSortBy.CreatedAt}-${SortOrder.Asc}`,
          label: 'Sort by date Z > A',
        },
        {
          value: `${MangerLogSortBy.FacilityName}-${SortOrder.Asc}`,
          label: 'Sort by facility A > Z',
        },
        {
          value: `${MangerLogSortBy.FacilityName}-${SortOrder.Desc}`,
          label: 'Sort by facility Z > A',
        },
      ]}
      value={`${queryParams.metadata.sortBy}-${queryParams.metadata.sortOrder}`}
      onChange={handleSelect}
      TriggerComponent={({ onOpen, selectedOption }) => (
        <AnchorInput
          onClick={onOpen}
          value={selectedOption?.label}
        />
      )}
    />
  );
};
