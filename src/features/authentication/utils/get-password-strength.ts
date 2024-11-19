import { PASSWORD_REQUIREMENTS } from '@features/authentication/constants/password-requirement';

export const getPasswordStrength = (password: string) => {
  let strength = 0;

  PASSWORD_REQUIREMENTS.forEach((requirement) => {
    if (requirement.regex.test(password)) {
      strength += 1;
    }
  });

  return strength;
};
