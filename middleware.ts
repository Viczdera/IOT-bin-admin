

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from '@tsndr/cloudflare-worker-jwt';
const KEY: any = process.env.JWT_KEY;

export default function middleware(req: any) {
  const { cookies } = req;
  const jwT = cookies.get('ShopAdminJWT') || "";
  
  // console.log(jwT)
  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    if (jwT === "") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      jwt.verify(jwT, KEY);
      return NextResponse.next();
    } catch (e: any) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === "/login") {
    if (jwT) {
      try {
        jwt.verify(jwT, KEY);
        url.pathname = "/";
        return NextResponse.redirect(url);
      } catch (e: any) {
        return NextResponse.next();
      }
    }
  }
  if (url.pathname != '/login') {
    const splitStr = url.pathname.split('')
    if (splitStr[1] === 'i' || splitStr[1] === 'p' || splitStr[1] === 'o' ||splitStr[1] === 's' && splitStr[2] === 'e' ) {
      if (jwT === undefined) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      try {
        jwt.verify(jwT, KEY);
        return NextResponse.next();
      } catch (e: any) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }
  }


  return NextResponse.next();
}
