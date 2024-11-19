import type { ReasonPhrases } from 'http-status-codes';
import { getStatusCode } from 'http-status-codes';

export type NextApiError = { error: string };

type NextApiErrorResponseInput = {
  reason: ReasonPhrases;
  errors: NextApiError[];
};

export function NextApiErrorResponse(input: NextApiErrorResponseInput) {
  const { reason, errors } = input;

  return new Response(JSON.stringify({ errors }), {
    status: getStatusCode(reason),
    statusText: reason,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
