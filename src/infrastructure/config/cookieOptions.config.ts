import { CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction, // Secure in production
  sameSite: isProduction ? "none" : "lax", // Cross-site support only in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};
