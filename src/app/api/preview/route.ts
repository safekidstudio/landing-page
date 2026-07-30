import { redirectToPreviewURL } from "@prismicio/next";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { createClient, linkResolver } from "../../../prismicio";

export async function GET(request: NextRequest) {
  const client = createClient();

  const response = await redirectToPreviewURL({
    client,
    request,
    linkResolver,
  });

  const cookieStore = await cookies();

  // Set Next.js Draft Mode bypass cookies to SameSite=None; Secure so they work in iframes
  const bypassCookie = cookieStore.get("__prerender_bypass");
  if (bypassCookie) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: bypassCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  const nextPreviewDataCookie = cookieStore.get("__next_preview_data");
  if (nextPreviewDataCookie) {
    cookieStore.set({
      name: "__next_preview_data",
      value: nextPreviewDataCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  // Handle Prismic's preview cookie if present, without setting httpOnly=true so client-side JS can read it
  const prismicPreviewCookie = cookieStore.get("io.prismic.preview");
  if (prismicPreviewCookie) {
    cookieStore.set({
      name: "io.prismic.preview",
      value: prismicPreviewCookie.value,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  return response;
}
