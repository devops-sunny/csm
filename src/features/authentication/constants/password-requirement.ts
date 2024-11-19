import type { PasswordRequirements } from '@features/authentication/types/password-requirement';

export const PASSWORD_REQUIREMENTS: PasswordRequirements = [
  { label: 'At least 12 characters', regex: /^.{12,}$/ },
  {
    label: 'Uppercase and lowercase letters included',
    regex: /^(?=.*[a-z])(?=.*[A-Z])/,
  },
  { label: 'Letters and numbers included', regex: /^(?=.*[A-Za-z])(?=.*\d)/ },
  {
    label: 'At least one special character, e.g. @[#',
    regex: /^(?=.*[\W_])/,
  },
];
