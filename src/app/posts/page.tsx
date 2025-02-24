import { supabase } from "@/lib/supabase";
import PostList from "./PostList";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";


export default async function PostsPage() {
    const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    const id = posts?.[0]?.id;
    return (

        <main className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Danh sách bài viết</h1>
            <div className="flex gap-2 items-center ">
                <Link href="/posts/new" className="mb-5">
                    <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Tạo bài viết mới
                    </button>
                </Link>
                <Link href={`/posts/${id}/edit`} className="mb-5">
                    <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <Pencil className="w-4 h-4 mr-2" />
                        Chỉnh sửa bài viết
                    </button>
                </Link>
            </div>
            <PostList posts={posts ?? []} />
        </main>
    );
}
