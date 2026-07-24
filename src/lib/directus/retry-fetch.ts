const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
const RETRY_DELAYS_MS = [250, 750];
const ATTEMPT_TIMEOUT_MS = 5_000;

function requestMethod(input: RequestInfo | URL, init?: RequestInit): string {
  return (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
}

function retryDelay(response: Response | undefined, attempt: number): number {
  const retryAfter = response?.headers.get("Retry-After");
  const retryAfterSeconds = retryAfter ? Number(retryAfter) : Number.NaN;
  if (Number.isFinite(retryAfterSeconds)) return Math.min(retryAfterSeconds * 1_000, 2_000);
  return RETRY_DELAYS_MS[attempt] + Math.floor(Math.random() * 100);
}

function requestSignal(input: RequestInfo | URL, init?: RequestInit): AbortSignal {
  const signals = [AbortSignal.timeout(ATTEMPT_TIMEOUT_MS)];
  const inherited = init?.signal ?? (input instanceof Request ? input.signal : undefined);
  if (inherited) signals.push(inherited);
  return AbortSignal.any(signals);
}

/** Retry only idempotent reads, with a bounded deadline for every attempt. */
export const fetchWithRetry: typeof fetch = async (input, init) => {
  const method = requestMethod(input, init);
  const canRetry = method === "GET" || method === "HEAD";

  for (let attempt = 0; ; attempt += 1) {
    let response: Response | undefined;
    try {
      response = await fetch(input, { ...init, signal: requestSignal(input, init) });
      if (!canRetry || !RETRYABLE_STATUS.has(response.status) || attempt === RETRY_DELAYS_MS.length) {
        return response;
      }
    } catch (error) {
      if (!canRetry || attempt === RETRY_DELAYS_MS.length) throw error;
    }

    await response?.body?.cancel();
    await new Promise((resolve) => setTimeout(resolve, retryDelay(response, attempt)));
  }
};
