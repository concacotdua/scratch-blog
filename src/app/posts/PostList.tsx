"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Trash } from "lucide-react";
import { Post } from "@/types/Post";
import ButtonShare from "../components/ButtonShare";
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
        <ul>
            {posts.map((post) => (
                <li key={post.id} className="border-b py-3">
                    <Link href={`/posts/${post.id}`}>
                        <img src={post.image_thumbnail} alt={post.title} className="w-32 h-32 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                    </Link>
                    <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white py-2 px-3 rounded flex items-center">
                            <Trash className="w-4 h-4 mr-2" />
                        </button>
                        <ButtonShare post_id={post.id} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
