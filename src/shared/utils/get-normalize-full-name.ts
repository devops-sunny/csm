import { startCase } from 'lodash';

export const getNormalizeFullName = (
  firstName?: string | null,
  lastName?: string | null,
) => {
  if (!firstName && !lastName) {
    return '—';
  }

  const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  return startCase(fullName.toLowerCase());
};
