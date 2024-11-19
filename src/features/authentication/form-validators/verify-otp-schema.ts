import { z } from 'zod';

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'The code must be 6 characters long.'),
});

export type VerifyOtpSchemaFields = z.infer<typeof verifyOtpSchema>;
