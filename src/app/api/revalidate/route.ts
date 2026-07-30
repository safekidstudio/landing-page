import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function POST() {
  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
