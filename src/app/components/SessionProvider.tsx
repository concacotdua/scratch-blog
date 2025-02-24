// components/SessionProvider.tsx
"use client"; // 👈 Cần thêm để sử dụng React Context trong Next.js App Router

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
