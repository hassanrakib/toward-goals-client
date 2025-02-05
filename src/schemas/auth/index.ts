import { z } from "zod";

export const signInCredentialsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .toLowerCase(),

  password: z.string().trim().min(1, { message: "Password is required" }),
});
