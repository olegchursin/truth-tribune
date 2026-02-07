import { NextResponse } from "next/server";
import { fetchAndRewriteAllNews } from "@/lib/jobs/fetch-and-rewrite";

export const maxDuration = 300; // 5 minutes
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const results = await fetchAndRewriteAllNews();
    return NextResponse.json({
      ...results,
      ok: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { 
        success: false,
        error: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
