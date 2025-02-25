"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Clock9, Heart, Trash } from "lucide-react";
import { Post } from "@/types/Post";
import ButtonShare from "../components/ButtonShare";
import { Button } from "@/components/ui/button";


export default function PostList({ posts }: { posts: Post[] }) {
    const router = useRouter();
    const { data: session } = useSession();

    const handleDelete = async (id: string) => {

        await supabase.from("posts").delete().eq("id", id);
        router.refresh(); // Làm mới dữ liệu
    };
    if (!session) {
        redirect("/");
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 px-4 md:px-6 auto-rows-fr max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {posts.map((post, index) => (
                <motion.article
                    key={post.id}
                    className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full max-w-md mx-auto w-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <Link href={`/posts/${post.id}`} className="block relative group">
                        {/* Hình ảnh với hiệu ứng zoom */}
                        <motion.img
                            src={post.image_thumbnail || "https://placehold.co/600x400"}
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Nội dung bài viết */}
                    <div className="p-5 flex flex-col flex-grow gap-3">
                        <Link href={`/posts/${post.id}`} className="block">
                            <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition line-clamp-2">
                                {post.title}
                            </h2>
                        </Link>
                        <pre
                            className="text-sm text-gray-600 flex-grow line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.content.replace(/<img[^>]*>/g, "") }}
                        />

                        {/* Thời gian tạo */}
                        <div className="flex items-center">
                            <Clock9 className="w-4 h-4 mr-2" />
                            <p className="text-xs text-gray-400">
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Khu vực nút bấm (Luôn ở dưới cùng) */}
                    <div className="flex justify-start items-center space-x-2 p-5 border-t border-gray-200">
                        <Button
                            onClick={() => handleDelete(post.id)}
                            variant="outline"
                            className="p-3 rounded-lg flex justify-center items-center text-sm text-rose-300"
                        >
                            <Trash className="w-4 h-4" />

                        </Button>
                        <ButtonShare post_id={post.id} />
                        <Button variant="outline" className="p-3 rounded-lg text-center text-sm text-rose-300">
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    );
}
