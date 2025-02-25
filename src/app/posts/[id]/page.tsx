"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { http } from "@/api/posts/posts";
import { formatDate } from "@/app/utils/utils";
import { Clock9 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetail() {
    const { id } = useParams(); // Lấy ID từ URL
    const {
        data: post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: () => http.fetchPost(id as string),
        enabled: !!id, // Chỉ fetch nếu có ID
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-6 sm:py-10 px-4 text-center">
                <Skeleton className="w-full h-48" />
            </div>
        );
    }
    console.log('render');

    if (isError || !post) {
        return (
            <main className="container mx-auto py-6 sm:py-10 px-4 text-center">
                <p className="text-red-500">❌ Không thể tải bài viết.</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto py-6 sm:py-10 px-4">
            <article className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    {post.title}
                </h1>

                <div
                    className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex items-center justify-start mt-6">
                    <Clock9 className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                </div>
            </article>
        </main>
    );
}
