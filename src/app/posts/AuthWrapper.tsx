"use client";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Skeleton className="h-32 w-32" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600 mb-4">Bạn cần đăng nhập để xem nội dung này</p>
                <Link href="/api/auth/signin">
                    <Button>Đăng nhập</Button>
                </Link>
            </div>
        );
    }

    return <>{children}</>;
}