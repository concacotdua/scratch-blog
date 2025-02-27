"use client";
import { motion } from "framer-motion";

import { Post } from "@/types/Post";
import PostItem from "./PostItem";
import { Fragment, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/api/posts/posts";
import { toast } from "sonner";

export default function PostList({ posts }: { posts: Post[] }) {
    const queryClient = useQueryClient();
    const deletePostMutation = useMutation({
        mutationFn: http.deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Bài viết đã được xóa thành công");
        },
        onError: (error) => {
            toast.error("Lỗi khi xóa bài viết: " + error.message);
        }
    });

    const handleDelete = useCallback((id: string) => {
        deletePostMutation.mutate(id);
    }, [deletePostMutation]);

    const memoizedPosts = useMemo(() => posts, [posts]);
    return (
        <motion.div
            className="relative grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-6 auto-rows-fr max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {memoizedPosts.map((post) => (
                <PostItem key={post.id} post={post} onDelete={handleDelete} />
            ))}
        </motion.div>
    );
}