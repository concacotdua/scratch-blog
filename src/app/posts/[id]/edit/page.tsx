"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageThumbnail, setImageThumbnail] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
            if (data) {
                setTitle(data.title);
                setContent(data.content);
                setImageThumbnail(data.image_thumbnail);
            }
        };
        fetchPost();
    }, [postId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await supabase.from("posts").update({ title, content, image_thumbnail: imageThumbnail }).eq("id", postId);
        router.push("/posts");
    };

    return (
        <main className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Chỉnh sửa bài viết</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 rounded" />
                <input type="text" value={imageThumbnail} onChange={(e) => setImageThumbnail(e.target.value)} className="border p-2 rounded" />
                <button type="submit" className="bg-green-500 text-white py-2 rounded">Lưu thay đổi</button>
            </form>
        </main>
    );
}
