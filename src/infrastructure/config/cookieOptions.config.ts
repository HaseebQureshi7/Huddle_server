import { CookieOptions } from "express";

const isDevelopment = process.env.NODE_ENV === "development";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: !isDevelopment, // Secure in production
  sameSite: !isDevelopment ? "none" : "lax", // Cross-site support only in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};
