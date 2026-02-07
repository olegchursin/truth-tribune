const NANOBANANA_BASE = "https://api.nanobananaapi.ai/api/v1/nanobanana";

async function createTask(
  apiKey: string,
  prompt: string,
  callBackUrl: string
): Promise<string> {
  const res = await fetch(`${NANOBANANA_BASE}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      type: "TEXTTOIAMGE",
      image_size: "16:9",
      callBackUrl,
      numImages: 1,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Nano Banana create: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { code: number; data?: { taskId?: string } };
  const taskId = data.data?.taskId;
  if (!taskId) throw new Error("Nano Banana: no taskId in response");
  return taskId;
}

async function getTaskResult(
  apiKey: string,
  taskId: string
): Promise<{ success: boolean; resultImageUrl?: string }> {
  const res = await fetch(
    `${NANOBANANA_BASE}/record-info?taskId=${encodeURIComponent(taskId)}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );
  if (!res.ok) return { success: false };
  const json = (await res.json()) as {
    code: number;
    data?: {
      successFlag?: number;
      response?: { resultImageUrl?: string };
    };
  };
  const successFlag = json.data?.successFlag;
  const url = json.data?.response?.resultImageUrl;
  if (successFlag === 1 && url) return { success: true, resultImageUrl: url };
  return { success: false };
}

const POLL_INTERVAL_MS = 2000;
const MAX_WAIT_MS = 15000;

export async function generateImage(
  apiKey: string,
  headline: string,
  callbackBaseUrl: string
): Promise<string | null> {
  const prompt = `${headline}. Black and white newspaper photograph, photojournalism style.`;
  const callBackUrl = `${callbackBaseUrl.replace(/\/$/, "")}/api/nanobanana/callback`;
  const taskId = await createTask(apiKey, prompt, callBackUrl);
  const deadline = Date.now() + MAX_WAIT_MS;
  while (Date.now() < deadline) {
    const result = await getTaskResult(apiKey, taskId);
    if (result.success && result.resultImageUrl) return result.resultImageUrl;
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  return null;
}

function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

export async function getArticleImage(
  apiKey: string,
  slant: string,
  headline: string,
  callbackBaseUrl: string
): Promise<string | null> {
  const cacheKey = `img-${slant}-${simpleHash(headline)}`;
  const { unstable_cache } = await import("next/cache");
  return unstable_cache(
    () => generateImage(apiKey, headline, callbackBaseUrl),
    [cacheKey],
    { revalidate: 86400, tags: ["images"] }
  )();
}
