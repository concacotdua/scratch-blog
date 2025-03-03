import { Post } from "@/types/Post";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock9, Heart, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import ButtonShare from "../components/ButtonShare";
import { useMemo } from "react";

interface PostItemProps {
    post: Post;
    onDelete: (id: string) => void;
}

export default function PostItem({ post, onDelete }: PostItemProps) {
    const formattedContent = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, "text/html");
        // Remove images and other block elements
        doc.querySelectorAll("img, pre, blockquote, table, ul, ol").forEach((el) => el.remove());
        // Get text content and limit length
        const textContent = doc.body.textContent || "";
        return textContent.length > 150 ? textContent.substring(0, 150) + "..." : textContent;
    }, [post.content]);

    return (
        <motion.article
            className={cn(
                "bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300",
                "hover:shadow-2xl hover:scale-[1.02] flex flex-col h-full max-w-md mx-auto w-full",
                "border border-gray-200 dark:border-gray-700"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <Link href={`/posts/${post.id}`} className="block relative group p-2">
                <motion.img
                    src={post.image_thumbnail || "https://placehold.co/600x400"}
                    alt={post.title}
                    className="w-full h-48 object-cover border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <div className="p-5 flex flex-col flex-grow gap-3">
                <Link href={`/posts/${post.id}`} className="block">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3">
                    {formattedContent}
                </p>

                <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock9 className="w-4 h-4 mr-2" />
                    <p className="text-xs">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="flex justify-start items-center space-x-2 p-5 border-t border-gray-200 dark:border-gray-700">
                <Button
                    onClick={() => onDelete(post.id)}
                    variant="outline"
                    className="p-3 rounded-lg flex justify-center items-center text-sm text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors duration-200"
                >
                    <Trash className="w-4 h-4 mr-1" />
                    Xóa
                </Button>

                <ButtonShare post_id={post.id} />

                <Button
                    variant="outline"
                    className="p-3 rounded-lg text-center text-sm text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors duration-200"
                >
                    <Heart className="w-4 h-4" />
                </Button>

                <Link href={`/posts/${post.id}/edit`}>
                    <Button
                        variant="outline"
                        className="p-3 rounded-lg flex justify-center items-center text-sm text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors duration-200"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </motion.article>
    );
}