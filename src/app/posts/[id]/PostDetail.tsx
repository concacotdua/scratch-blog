"use client";
import { useQuery } from "@tanstack/react-query";

import { http } from "@/api/posts/posts";
import { ChevronLeft, Clock9 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/app/utils/utils";
import { Post } from "@/types/Post";

export default function PostDetail({ data }: { data: Post }) {
    if (!data) {
        return <p className="text-red-500">❌ Không thể tải bài viết.</p>;
    }
    const {
        data: post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["post", data.id],
        queryFn: () => http.fetchPost(data.id),
        enabled: !data.id,
        initialData: data
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
    const fallbackText = post.author.name ? post.author.name.charAt(0) : "CN";
    return (
        <main className="container w-full max-w-5xl mt-6 mx-auto py-10 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
                <Link href='/posts'>
                    <Button type="button" variant='ghost' className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Posts</span>
                    </Button>
                </Link>
            </div>

            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Author info and date */}
                <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-green-500/50">
                            <AvatarImage src={post.author.avatar_url} />
                            <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold text-xl">
                                {fallbackText}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {post.author.name || post.author.email}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock9 className="w-4 h-4 mr-1" />
                                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-8">
                        {post.title}
                    </h1>
                </div>

                {/* Content */}
                <div className="px-6 py-8 sm:px-8 sm:py-10 prose prose-lg dark:prose-invert max-w-none">
                    <div
                        className="text-gray-800 dark:text-gray-200 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </main>
    );
}
