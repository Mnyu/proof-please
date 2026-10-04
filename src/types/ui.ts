import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters'),
  email: z.email('Please enter a valid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(20, 'password must be at most 20 characters.'),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.email('Please enter a valid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(20, 'password must be at most 20 characters.'),
});
export type SignInInput = z.infer<typeof SignInSchema>;

export const ProofPleaseSchema = z.object({
  reelUrl: z.string(),
});
export type ProofPlease = z.infer<typeof ProofPleaseSchema>;
