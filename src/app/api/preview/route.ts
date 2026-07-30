import { redirectToPreviewURL } from "@prismicio/next";
import type { NextRequest } from "next/server";

import { createClient, linkResolver } from "../../../prismicio";

export async function GET(request: NextRequest) {
  const client = createClient();

  return await redirectToPreviewURL({ client, request, linkResolver });
}
