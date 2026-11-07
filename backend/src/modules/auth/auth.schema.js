
import { z } from "zod";

export const googleLoginSchema = z.object({
  credential: z.string().min(20).max(10000),

  accountCategory: z
    .enum(["BUSINESS", "CLIENT"])
    .optional(),
});

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1).max(255),
  password: z.string().min(1).max(128),
});

export const registerSchema = z.object({
  email: z.string().email().max(255),
  fullName: z.string().min(1).max(150),
  username: z.string().min(3).max(50).regex(/^[a-z0-9_]+$/, "Username must be lowercase alphanumeric or underscore"),
  password: z.string().min(8).max(128),
  accountCategory: z.enum(["BUSINESS", "CLIENT"]),
});
