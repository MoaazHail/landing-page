import "server-only";

import type { Locale } from "@/i18n/routing";
import type { ApiSuccess } from "@/lib/types/content";
import { CONTENT_REVALIDATE_SECONDS, API_TIMEOUT_MS } from "@/lib/constants/site";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function buildUrl(path: string, locale: Locale) {
  const base = process.env.API_URL;
  if (!base) throw new ApiError("API_URL is not configured");

  const url = new URL(path.replace(/^\//, ""), base.endsWith("/") ? base : `${base}/`);
  url.searchParams.set("locale", locale);
  return url;
}

/** GET a localized CMS resource. Responses are cached and tagged per resource. */
export async function apiGet<T>(path: string, locale: Locale, tags: string[]): Promise<T> {
  const url = buildUrl(path, locale);
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags },
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });

  if (!res.ok) throw new ApiError(`GET ${url.pathname} failed`, res.status);

  const body = (await res.json()) as ApiSuccess<T>;
  return body.data;
}

/**
 * Resolves to `null` instead of throwing so a failing, non-critical section
 * disappears without taking the rest of the landing page down.
 */
export async function orNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    console.error("[cms]", error instanceof Error ? error.message : error);
    return null;
  }
}
