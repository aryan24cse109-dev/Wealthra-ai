
import { env } from "../../config/env.js";

import {
  googleLogin,
  devLogin,
  emailPasswordLogin,
  emailPasswordRegister,
  logoutSession,
  getAuthenticatedUser,
} from "./auth.service.js";

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: env.SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  };
}

export async function googleLoginController(req, res, next) {
  try {
    const result = await googleLogin(
      req.body.credential,
      req.body.accountCategory,
      {
        ip: req.ip,
        userAgent: req.get("user-agent"),
      }
    );

    res.cookie(env.SESSION_COOKIE_NAME, result.token, cookieOptions());

    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function devLoginController(req, res, next) {
  try {
    const { email = "demo@bizpilot.test", accountCategory = "BUSINESS", fullName = "Demo User" } = req.body || {};
    const result = await devLogin(
      email,
      accountCategory,
      fullName,
      {
        ip: req.ip,
        userAgent: req.get("user-agent"),
      }
    );

    res.cookie(env.SESSION_COOKIE_NAME, result.token, cookieOptions());

    return res.status(200).json({
      success: true,
      message: "Development login successful.",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const result = await emailPasswordLogin(
      req.body.emailOrUsername,
      req.body.password,
      {
        ip: req.ip,
        userAgent: req.get("user-agent"),
      }
    );

    res.cookie(env.SESSION_COOKIE_NAME, result.token, cookieOptions());

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function registerController(req, res, next) {
  try {
    const result = await emailPasswordRegister(
      req.body,
      {
        ip: req.ip,
        userAgent: req.get("user-agent"),
      }
    );

    res.cookie(env.SESSION_COOKIE_NAME, result.token, cookieOptions());

    return res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req, res, next) {
  try {
    await logoutSession(req.user.id, req.sessionId);

    res.clearCookie(env.SESSION_COOKIE_NAME, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function currentUserController(req, res, next) {
  try {
    const user = await getAuthenticatedUser(req.user.id);

    return res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}
