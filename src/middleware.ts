import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SLANT_COOKIE = "truth-tribune-slant";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/paper")) {
    const slant = request.cookies.get(SLANT_COOKIE)?.value;
    if (slant !== "left" && slant !== "right") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}
