import { CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
  httpOnly: true, // For network access only
  secure: isProduction, // For http and https
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};
