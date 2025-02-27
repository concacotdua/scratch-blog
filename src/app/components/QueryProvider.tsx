"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient()); // Đảm bảo chỉ khởi tạo 1 lần

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}