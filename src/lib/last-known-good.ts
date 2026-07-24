const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);

interface LastKnownGoodGlobal {
  __wycliffeLastKnownGood?: Map<string, unknown>;
  __wycliffeLastKnownGoodWarning?: number;
}

const sharedGlobal = globalThis as typeof globalThis & LastKnownGoodGlobal;
const values = (sharedGlobal.__wycliffeLastKnownGood ??= new Map());

export function isTransientContentError(error: unknown): boolean {
  if (error instanceof TypeError && error.message === "fetch failed") return true;
  if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) return true;
  if (!error || typeof error !== "object") return false;

  const response = "response" in error ? error.response : undefined;
  if (
    response &&
    typeof response === "object" &&
    "status" in response &&
    typeof response.status === "number" &&
    RETRYABLE_STATUS.has(response.status)
  ) {
    return true;
  }

  const cause = "cause" in error ? error.cause : undefined;
  const code = cause && typeof cause === "object" && "code" in cause ? cause.code : undefined;
  return typeof code === "string" && (code.startsWith("UND_ERR_") || code === "ECONNRESET" || code === "ETIMEDOUT");
}

function warnAboutStaleContent(error: unknown) {
  const now = Date.now();
  if (now - (sharedGlobal.__wycliffeLastKnownGoodWarning ?? 0) < 60_000) return;
  sharedGlobal.__wycliffeLastKnownGoodWarning = now;

  const message = error instanceof Error ? error.message : "unknown upstream error";
  console.warn(`[content] Directus is temporarily unavailable; serving last-known-good content (${message}).`);
}

export function withLastKnownGood<Args extends unknown[], Result>(
  name: string,
  query: (...args: Args) => Promise<Result>,
  coldFallback?: (...args: Args) => Promise<Result>,
) {
  return async (...args: Args): Promise<Result> => {
    const key = `${name}:${JSON.stringify(args)}`;
    try {
      const result = await query(...args);
      values.set(key, result);
      return result;
    } catch (error) {
      if (!isTransientContentError(error)) throw error;
      if (!values.has(key) && coldFallback) values.set(key, await coldFallback(...args));
      if (!values.has(key)) throw error;
      warnAboutStaleContent(error);
      return values.get(key) as Result;
    }
  };
}

export function clearLastKnownGoodForTests() {
  values.clear();
  sharedGlobal.__wycliffeLastKnownGoodWarning = 0;
}
