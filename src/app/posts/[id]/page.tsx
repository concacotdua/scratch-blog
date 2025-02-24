import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }: { params: { id: string } }) {
    const { data: post } = await supabase.from("posts").select("*").eq("id", params.id).single();

    if (!post) return notFound();

    return (
        <main className="max-w-2xl mx-auto py-10">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
        </main>
    );
}
