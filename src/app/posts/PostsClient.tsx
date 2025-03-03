"use client";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PostList from "./PostList";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/api/posts/posts";
import AuthWrapper from "./AuthWrapper";
import SkeletonPosts from "../components/SkeletonPosts";

export default function PostsClient() {
    const { data: posts = [], isFetching } = useQuery({
        queryKey: ["posts"],
        queryFn: () => http.fetchPosts(),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <AuthWrapper>
            <main className="max-w-7xl mx-auto py-10">
                <h1 className="text-4xl font-extrabold mb-5 text-gray-800">📝 Danh sách bài viết</h1>
                <div className="flex gap-3 items-center justify-end mb-5">
                    <Link href="/posts/new">
                        <Button className="relative overflow-hidden flex items-center gap-2 px-4 py-2 text-black/80 bg-gradient-to-r from-green-400 to-green-500 shadow-lg rounded-md hover:scale-105 transition-all">
                            <Plus className="w-5 h-5" />
                            Tạo bài viết mới
                        </Button>
                    </Link>
                </div>
                {isFetching ? (
                    <div className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-6 auto-rows-fr max-w-7xl mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((i) => {
                            return <SkeletonPosts key={i} />
                        })}
                    </div>

                ) : (
                    <PostList posts={posts ?? []} />
                )}
            </main>
        </AuthWrapper>
    );
}
