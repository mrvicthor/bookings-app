import z from "zod";

export const userSchema = z.object({
  usernme: z.string(),
  email: z.string(),
  role: z.string(),
});

export type userInput = z.TypeOf<typeof userSchema> | any;
