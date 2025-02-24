import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function middleware(req: NextRequest) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
};
