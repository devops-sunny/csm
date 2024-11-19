import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/employees-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { EmployeeSortBy, SortOrder } from '@shared/types/api/generated';

export const MobileSortBySelect = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const handleSelect = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');

    defaultStore.set(queryParamsAtom, (prev) => {
      prev.metadata.sortBy = sortBy as EmployeeSortBy;
      prev.metadata.sortOrder = sortOrder as SortOrder;
    });
  };

  return (
    <MobileDrawerSelect
      title="Sort by"
      options={[
        {
          value: `${EmployeeSortBy.Name}-${SortOrder.Desc}`,
          label: 'Sort by Name A > Z',
        },
        {
          value: `${EmployeeSortBy.Name}-${SortOrder.Asc}`,
          label: 'Sort by Name Z > A',
        },
        {
          value: `${EmployeeSortBy.FacilityName}-${SortOrder.Asc}`,
          label: 'Sort by facility A > Z',
        },
        {
          value: `${EmployeeSortBy.FacilityName}-${SortOrder.Desc}`,
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
