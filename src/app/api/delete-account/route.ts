import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, confirm } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!confirm) {
      return NextResponse.json(
        { error: "You must confirm the deletion request." },
        { status: 400 },
      );
    }

    // Mock processing deletion request (e.g. saving to DB, triggering email, etc.)
    // In a real environment, you would call a service here.
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async delay

    return NextResponse.json({
      success: true,
      message: "Account deletion request successfully received.",
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}
