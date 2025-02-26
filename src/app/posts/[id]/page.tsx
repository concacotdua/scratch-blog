"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { http } from "@/api/posts/posts";
import { formatDate } from "@/app/utils/utils";
import { ArrowLeft, ChevronLeft, Clock9 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

    if (isError || !post) {
        return (
            <main className="container mx-auto py-6 sm:py-10 px-4 text-center">
                <p className="text-red-500">❌ Không thể tải bài viết.</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <Link href='/posts' className="mb-6">
                <Button type="button" variant='outline' className="rounded-full bg-gray-50 size-12 shadow-lg">
                    <ChevronLeft className="text-black/90" />
                </Button>
            </Link>
            <article className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10">
                <div className="flex items-center justify-start text-gray-500 gap-2 text-sm mb-6">
                    <Avatar>
                        <AvatarImage src={post.author.avatar_url} />
                        <AvatarFallback className="bg-purple-500 text-black font-bold text-xl">{post.author.name?.charAt(0, 1) || "CN"}</AvatarFallback>
                    </Avatar>
                    <p className="text-gray-700 font-semibold">By {post.author.name || post.author.email}</p>
                    <div className="flex items-center space-x-2">
                        <Clock9 className="w-4 h-4 text-gray-400" />
                        <p>{formatDate(post.created_at)}</p>
                    </div>
                </div>

                {/* Tiêu đề bài viết */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight sm:text-5xl break-words">
                    {post.title}
                </h1>

                {/* Nội dung bài viết */}
                <pre
                    className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed break-words"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </main>
    );
}
