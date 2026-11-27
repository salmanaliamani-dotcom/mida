import { NextResponse, type NextRequest } from "next/server";

// When the studio is deployed on the internet, set APP_PASSWORD so that only you
// can open it (and spend your API keys). The browser asks for it once (HTTP Basic auth,
// any username). Without APP_PASSWORD the app is open, which is fine on localhost.

export function middleware(req: NextRequest) {
  const password = process.env.APP_PASSWORD;
  if (!password) return NextResponse.next();
  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const given = decoded.slice(decoded.indexOf(":") + 1);
      if (given.length === password.length) {
        let diff = 0;
        for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ password.charCodeAt(i);
        if (diff === 0) return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }
  return new NextResponse("Password required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Neon Shadow Studio", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
