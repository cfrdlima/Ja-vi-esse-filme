import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Only read-only catalog endpoints are proxied, so the server key
// can't be used to reach anything else in the TMDB API.
const ALLOWED_ROOTS = new Set(["discover", "search", "genre", "movie", "tv"]);
const SAFE_SEGMENT = /^[A-Za-z0-9_-]+$/;

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB_API_KEY não configurada no servidor" },
      { status: 500 }
    );
  }

  const segments = params.path;
  const isAllowed =
    ALLOWED_ROOTS.has(segments[0]) &&
    segments.every((segment) => SAFE_SEGMENT.test(segment));
  if (!isAllowed) {
    return NextResponse.json({ error: "Rota não permitida" }, { status: 404 });
  }

  const url = new URL(`${TMDB_BASE_URL}/${segments.join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== "api_key") url.searchParams.append(key, value);
  });
  url.searchParams.set("api_key", apiKey);

  const tmdbResponse = await fetch(url, { next: { revalidate: 3600 } });
  const body = await tmdbResponse.text();

  return new NextResponse(body, {
    status: tmdbResponse.status,
    headers: { "Content-Type": "application/json" },
  });
}
