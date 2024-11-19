import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/employees-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerCheckbox } from '@shared/components/common/mobile-drawer-checkbox';
import { useRequestAllDepartment } from '@shared/hooks/api/common/use-request-all-department';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileDepartmentFilter = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const {
    data: requestDepartmentsResponse,
    isLoading: requestDepartmentsLoading,
  } = useRequestAllDepartment();

  const handleSelect = (departmentIds: number[]) => {
    defaultStore.set(queryParamsAtom, (prev) => {
      prev.filter.departmentIds = departmentIds;
    });
  };

  const departments = requestDepartmentsResponse?.data;

  const departmentsOptions = departments?.map((department) => ({
    value: department.id?.toString() ?? '',
    label: department.departmentName?.toString() ?? '',
  }));

  return (
    <MobileDrawerCheckbox
      hasCheckAll
      title="Select location"
      options={departmentsOptions}
      checkedOptions={queryParams.filter.departmentIds?.map((departmentId) =>
        departmentId.toString(),
      )}
      onChange={(options) => {
        const selectedDepartmentIds = options.map(Number);

        handleSelect(selectedDepartmentIds);
      }}
      TriggerComponent={({ onOpen, checkedOptions }) => {
        let output = '';

        if (checkedOptions.length > 0) {
          output = `${checkedOptions[0].label}`;
        }

        if (checkedOptions.length > 1) {
          output = `${output} [+${checkedOptions.length - 1}]`;
        }

        if (checkedOptions.length === departmentsOptions?.length) {
          output = 'All Departments';
        }

        return (
          <AnchorInput
            onClick={onOpen}
            placeholder="Select Departments"
            value={output}
            disabled={requestDepartmentsLoading}
          />
        );
      }}
    />
  );
};
