import { z } from 'zod';

export const usernameValidation = z.string()
    .min(2, "Username must have altleast 2 charcaters")
    .max(20, "Username must have atmost 20 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must contain only letters, numbers and underscores");

export const signInSchema = z.object({
    username: usernameValidation,
    password: z.string().min(6, {message: "Password must have atleast 6 characters"})
})