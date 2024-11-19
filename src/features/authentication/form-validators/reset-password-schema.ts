import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: z.string().min(1, 'This field is required'),
  repeatPassword: z.string().min(1, 'This field is required'),
});

export type ResetPasswordSchemaFields = z.infer<typeof resetPasswordSchema>;
