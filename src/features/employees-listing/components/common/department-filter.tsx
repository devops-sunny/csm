import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/employees-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';
import { useRequestAllDepartment } from '@shared/hooks/api/common/use-request-all-department';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const DepartmentFilter = () => {
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
    <SearchCheckbox
      hasCheckAll
      visibleOptions={5}
      options={departmentsOptions}
      checkedOptions={queryParams.filter.departmentIds?.map((departmentId) =>
        departmentId.toString(),
      )}
      onSelect={(options) => {
        const selectedDepartmentIds = options.map((option) =>
          Number(option.value),
        );

        handleSelect(selectedDepartmentIds);
      }}
      TriggerComponent={({ selectedOptions, onOpen }) => {
        let output = '';

        if (selectedOptions.length > 0) {
          output = `${selectedOptions[0].label}`;
        }

        if (selectedOptions.length > 1) {
          output = `${output} [+${selectedOptions.length - 1}]`;
        }

        if (selectedOptions.length === departmentsOptions?.length) {
          output = 'All Departments';
        }

        return (
          <AnchorInput
            fullWidth
            placeholder="Select Department"
            value={output}
            disabled={requestDepartmentsLoading}
            onClick={requestDepartmentsLoading ? () => {} : onOpen}
          />
        );
      }}
    />
  );
};
