
import { Post } from "@/types/Post";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock9, Heart, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { http } from "@/api/posts/posts";
import { toast } from "sonner";
import ButtonShare from "../components/ButtonShare";

export default function PostItem({ post }: { post: Post }) {
    const queryClient = useQueryClient();

    // Mutation để xóa bài viết
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
    const handleDelete = (id: string) => {
        deletePostMutation.mutate(id);
    };


    return (
        <motion.article
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full max-w-md mx-auto w-full cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <Link href={`/posts/${post.id}`} className="block relative group">
                <motion.img
                    src={post.image_thumbnail || "https://placehold.co/600x400"}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <div className="p-5 flex flex-col flex-grow gap-3">
                <Link href={`/posts/${post.id}`} className="block">
                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition line-clamp-2">
                        {post.title}
                    </h2>
                </Link>
                <pre
                    className="text-sm text-gray-600 flex-grow line-clamp-2 whitespace-pre-wrap break-words max-h-[100px] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/<img[^>]*>/g, "") }}
                />

                <div className="flex items-center">
                    <Clock9 className="w-4 h-4 mr-2" />
                    <p className="text-xs text-gray-400">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="flex justify-start items-center space-x-2 p-5 border-t border-gray-200">
                <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    className="p-3 rounded-lg flex justify-center items-center text-sm text-rose-300"
                    disabled={deletePostMutation.isPending}
                >
                    {deletePostMutation.isPending ? <Skeleton className="w-4 h-4" /> : (
                        <>
                            <Trash className="w-4 h-4" />
                            Xóa
                        </>
                    )}
                </Button>
                <ButtonShare post_id={post.id} />
                <Button variant="outline" className="p-3 rounded-lg text-center text-sm text-rose-300">
                    <Heart className="w-4 h-4" />
                </Button>
                <Link href={`/posts/${post.id}/edit`}>
                    <Button
                        variant="outline"
                        className="p-3 rounded-lg flex justify-center items-center text-sm text-rose-300"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

        </motion.article>
    );
}