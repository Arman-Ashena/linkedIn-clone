import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    console.log("ww", session);
    //if (!session) return NextResponse.redirect("http:localhost:3000/home");
    // if user is authenticated, continue
  }
}
