
import { Router } from "express";

import {
  googleLoginController,
  loginController,
  registerController,
  devLoginController,
  logoutController,
  currentUserController,
} from "./auth.controller.js";

import { googleLoginSchema, loginSchema, registerSchema } from "./auth.schema.js";

import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authRateLimiter } from "../../middleware/rateLimit.middleware.js";

const router = Router();

router.post(
  "/google",
  authRateLimiter,
  validate(googleLoginSchema),
  googleLoginController
);

router.post(
  "/login",
  authRateLimiter,
  validate(loginSchema),
  loginController
);

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  registerController
);

router.post("/dev-login", devLoginController);

router.get("/me", authenticate, currentUserController);

router.post("/logout", authenticate, logoutController);

export default router;
