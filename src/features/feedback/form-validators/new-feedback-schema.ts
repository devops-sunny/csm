import { z } from 'zod';

import { ContactByType, FeedbackType } from '@shared/types/api/generated';

export const newFeedbackSchema = z
  .object({
    feedbackType: z.nativeEnum(FeedbackType),
    message: z
      .string()
      .min(1, 'This field is required')
      .max(255, 'Max 255 characters'),
    facilityId: z.number().optional(),
    contactBy: z.nativeEnum(ContactByType).optional(),
    isAnonymous: z.boolean(),
  })
  .superRefine(({ feedbackType, isAnonymous, contactBy, facilityId }, ctx) => {
    if (!isAnonymous && !contactBy) {
      ctx.addIssue({
        code: 'custom',
        message: 'This field is required',
        path: ['contactBy'],
      });
    }

    if (feedbackType === 'WORK' && !facilityId) {
      ctx.addIssue({
        code: 'custom',
        message: 'This field is required',
        path: ['facilityId'],
      });
    }
  });

export type NewFeedbackFields = z.infer<typeof newFeedbackSchema>;
