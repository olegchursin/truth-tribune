import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const taskResults = new Map<string, string>();

export function getTaskResult(taskId: string): string | undefined {
  return taskResults.get(taskId);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      taskId?: string;
      data?: { taskId?: string; response?: { resultImageUrl?: string } };
      response?: { resultImageUrl?: string };
    };
    const taskId = body.taskId ?? body.data?.taskId;
    const url =
      body.data?.response?.resultImageUrl ?? body.response?.resultImageUrl;
    if (typeof taskId === "string" && typeof url === "string") {
      taskResults.set(taskId, url);
    }
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true });
}
