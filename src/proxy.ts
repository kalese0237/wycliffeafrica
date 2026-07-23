import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "wa_portal_access";
const REFRESH_COOKIE = "wa_portal_refresh";
const DIRECTUS_URL = process.env.DIRECTUS_URL;

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires: number;
}

function clearPortalCookies(response: NextResponse) {
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
}

export async function proxy(request: NextRequest) {
  if (!DIRECTUS_URL) return NextResponse.next();
  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!access && !refresh) return NextResponse.next();

  if (access) {
    const check = await fetch(`${DIRECTUS_URL}/users/me?fields=id`, {
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
    }).catch(() => null);
    if (!check) return NextResponse.next();
    if (check?.ok) return NextResponse.next();
    if (check && check.status !== 401 && check.status !== 403) return NextResponse.next();
  }

  if (!refresh) return NextResponse.next();
  const refreshed = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh, mode: "json" }),
    cache: "no-store",
  }).catch(() => null);

  if (!refreshed?.ok) {
    const response = request.nextUrl.pathname === "/portal/login"
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/portal/login", request.url));
    clearPortalCookies(response);
    return response;
  }

  const { data } = (await refreshed.json()) as { data: AuthTokens };
  request.cookies.set(ACCESS_COOKIE, data.access_token);
  request.cookies.set(REFRESH_COOKIE, data.refresh_token);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("cookie", request.cookies.toString());
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set(ACCESS_COOKIE, data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: Math.floor(data.expires / 1000),
  });
  response.cookies.set(REFRESH_COOKIE, data.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export const config = {
  matcher: ["/portal/:path*"],
};
