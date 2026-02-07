import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getFeed } from "@/lib/feed";
import type { Slant } from "@/lib/types";

const SLANT_COOKIE = "truth-tribune-slant";

export async function GET(request: NextRequest) {
  const slant = (request.cookies.get(SLANT_COOKIE)?.value ??
    request.nextUrl.searchParams.get("slant")) as Slant | undefined;
  if (slant !== "left" && slant !== "right") {
    return NextResponse.json(
      { error: "Missing slant. Choose Left or Right on the landing page." },
      { status: 401 }
    );
  }

  const section = request.nextUrl.searchParams.get("section") ?? undefined;

  try {
    const articles = await getFeed(slant, section);
    return NextResponse.json({ articles });
  } catch (e) {
    console.error("Feed error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Feed failed" },
      { status: 500 }
    );
  }
}
