"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PostList from "./PostList";
import { Post } from "@/types/Post";
import { http } from "@/api/posts/posts";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export default function PostsClient({ posts: initialPosts }: { posts: Post[] }) {

    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Bạn cần đăng nhập để xem bài viết</h1>
            </div>
        );
    }
    const { data: posts = initialPosts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: () => http.fetchPosts(),
        initialData: initialPosts,
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <main className="max-w-7xl mx-auto py-10">
            <h1 className="text-4xl font-extrabold mb-5 text-gray-800">📝 Danh sách bài viết</h1>
            {session && (
                <Fragment>
                    <div className="flex gap-3 items-center justify-end mb-5">
                        <Link href="/posts/new">
                            <Button className="relative overflow-hidden flex items-center gap-2 px-4 py-2 text-black/80 bg-gradient-to-r from-green-400 to-green-500 shadow-lg rounded-md hover:scale-105 transition-all">
                                <Plus className="w-5 h-5" />
                                Tạo bài viết mới
                            </Button>
                        </Link>
                    </div>

                    <PostList posts={posts ?? []} />
                </Fragment>
            )}

        </main>
    );
}
