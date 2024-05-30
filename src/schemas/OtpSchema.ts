import { z } from 'zod';

export const otpSchema = z.object({
  otp: z.string().length(6, "Username must be exactly 6 characters long")
    .regex(/^\d{6}$/, "Username must contain exactly 6 digits")
})
