import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationAddModule } from '@features/managers-log-settings/hooks/api/use-mutation-add-module';
import { useMutationUpdateModule } from '@features/managers-log-settings/hooks/api/use-mutation-update-module';
import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import type { AddEditModuleAtom } from '@features/managers-log-settings/types/modules';

export const useAddEditModuleForm = (currentModule: AddEditModuleAtom) => {
  const addController = useMutationAddModule();
  const updateController = useMutationUpdateModule();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const allowedTypes = currentModule?.allowedTypes ?? [];

  const { id, facilityId, headerTitle } = currentModule ?? {};

  const submit = async () => {
    if (!selectedFacilityId) return;

    const isAdd = !id;

    if (isAdd) {
      const addPromise = addController.trigger({
        allowedTypes,
        header: headerTitle,
        facilityId: Number(selectedFacilityId),
      });

      await toast.promise(addPromise, {
        loading: 'Adding module...',
        success: 'Added!',
        error: 'Failed to add!',
      });
    } else {
      const editPromise = updateController.trigger({
        moduleId: Number(id),
        allowedTypes,
        header: headerTitle,
        facilityId,
      });

      await toast.promise(editPromise, {
        loading: 'Updating...',
        success: 'Updated!',
        error: 'Failed to update!',
      });
    }
  };

  return {
    submit,
    isSubmitting: addController.isMutating || updateController.isMutating,
  };
};
