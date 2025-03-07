import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
    },
    // cookies: {
    //     sessionToken: {
    //         name: "next-auth.session-token",
    //         options: {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production",
    //             sameSite: "lax",
    //         },
    //     },
    // },
}

