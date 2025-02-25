"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import PostList from "./PostList";
import { Post } from "@/types/Post";
import { http } from "@/api/posts/posts";

export default function PostsClient({ posts: initialPosts }: { posts: Post[] }) {
    const { data: posts = initialPosts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: () => http.fetchPosts(), // Fetch từ API nếu cần
        initialData: initialPosts,
    });

    const id = posts?.[0]?.id;

    if (isLoading) return <p>Loading...</p>;

    return (
        <main className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5 text-gray-900">📝 Danh sách bài viết</h1>

            <div className="flex gap-3 items-center mb-5">
                <Link href="/posts/new">
                    <Button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-md hover:scale-105 transition-all">
                        <Plus className="w-5 h-5" />
                        Tạo bài viết mới
                    </Button>
                </Link>

                <Link href={`posts/${id}/edit`}>
                    <Button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-lg rounded-md hover:scale-105 transition-all">
                        <Pencil className="w-5 h-5" />
                        Chỉnh sửa bài viết
                    </Button>
                </Link>
            </div>

            <PostList posts={posts ?? []} />
        </main>
    );
}
