import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Hanya jalankan di route root
  if (pathname !== "/") return NextResponse.next();

  const url = req.nextUrl.clone();

  const langCookie = req.cookies.get("preferLang")?.value;
  if (langCookie === "id" || langCookie === "en") {
    url.pathname = `/${langCookie}`;
    return NextResponse.redirect(url);
  }

  const browserLangHeader = req.headers.get("accept-language") || "";
  const browserLang = browserLangHeader.slice(0, 2).toLowerCase();

  let redirectLang = "id";
  if (browserLang === "en") redirectLang = "en";

  url.pathname = `/${redirectLang}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"], // hanya root
};
