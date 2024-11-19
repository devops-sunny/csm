// eslint-disable-next-line no-restricted-imports
import type useSWR from 'swr';

export type SWRKey = Parameters<typeof useSWR>[0];

export type ApiError = {
  errors: {
    error: string;
  }[];
  timestamp: string;
};
