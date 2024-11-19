import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { downloadFileFromResponse } from '@shared/services/download-file-from-response';
import { nativeFetch } from '@shared/services/native-fetch';
import { SendVia } from '@shared/types/api/generated';

type CreateReportPayload = {
  facilities: number[];
  startDate: Date;
  sendVia: SendVia;
};

type UseCreateReportInput = Partial<{
  onSuccess: () => void;
}>;

export const useCreateReport = ({ onSuccess }: UseCreateReportInput = {}) => {
  const [payload, setPayload] = useState<CreateReportPayload>({
    facilities: [],
    startDate: new Date(),
    sendVia: SendVia.Download,
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const createReport = async () => {
    try {
      setLoading(true);

      const formattedDate = dayjs(payload.startDate).format('YYYY-MM-DD');

      const response = await nativeFetch('/api/log/reports', {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          startDate: formattedDate,
        }),
      });

      const selectedSendVia = payload.sendVia;

      if (selectedSendVia === SendVia.Download) {
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileNameFromResponse = contentDisposition?.split('filename=')[1];

        await downloadFileFromResponse({
          response,
          fileName:
            fileNameFromResponse ?? `facilities-report-${formattedDate}.pdf`,
        });
      } else {
        const { message } = await response.json();

        toast.success(message);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePayload = (payloadPart: Partial<CreateReportPayload>) => {
    if (errorMessage) setErrorMessage('');

    setPayload((prev) => ({
      ...prev,
      ...payloadPart,
    }));
  };

  return {
    loading,
    errorMessage,
    payload,
    updatePayload,
    createReport,
  };
};
