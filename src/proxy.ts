import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: Request) {
  return intlMiddleware(request as any);
}

export const config = {
  // Match all pathnames except for
  // - API routes (/api)
  // - Static files (/_next, /images, favicon.ico, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
