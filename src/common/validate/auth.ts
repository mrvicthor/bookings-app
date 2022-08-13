import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export const signUpSchema = loginSchema.extend({
  username: z.string(),
});

export type IsLogin = z.infer<typeof loginSchema>;
export type IsSignUp = z.infer<typeof signUpSchema>;
