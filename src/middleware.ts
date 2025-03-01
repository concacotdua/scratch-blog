import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Ensure consistent auth state
        if (!req.nextauth.token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/posts/:path*", "/profile/:path*"],
}; 