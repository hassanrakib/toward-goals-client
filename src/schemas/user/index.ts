import { z } from "zod";
import { isAlphanumeric, isLowercase, isStrongPassword } from "validator";
import { isEmailAvailable, isUsernameAvaliable } from "@/utils/auth";

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(5, { message: "Username must be at least 5 characters long" })
    .regex(/^[a-z]/, {
      message: "Username must start with a lowercase letter",
    })
    .refine((username: string) => isLowercase(username), {
      message: "Username can not contain uppercase letters",
    })
    .refine((username: string) => isAlphanumeric(username), {
      message: "Username can not contain special characters",
    })
    .refine(async (username: string) => await isUsernameAvaliable(username), {
      message: "Username is not available",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be a valid email address" })
    .toLowerCase()
    .refine(async (email: string) => await isEmailAvailable(email), {
      message: "Email already used",
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((password: string) => isStrongPassword(password), {
      message: "Password must be strong",
    }),
});
