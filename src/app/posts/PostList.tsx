"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import { Post } from "@/types/Post";
import PostItem from "./PostItem";
import { Fragment } from "react";

export default function PostList({ posts }: { posts: Post[] }) {
    const { status } = useSession();

    if (status === "unauthenticated") {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Bạn cần đăng nhập để xem bài viết</h1>
            </div>
        );
    }

    return (
        <motion.div
            className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-6 auto-rows-fr max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {posts.map((post, index) => (
                <Fragment key={post.id}>
                    <PostItem post={post} />
                </Fragment>
            ))}
        </motion.div>
    );
}