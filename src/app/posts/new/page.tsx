"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorTap from "@/app/components/EditorTap";

export default function NewPostPage() {
    const { status } = useSession();
    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [published, setPublished] = useState(false);
    const [imageThumbnail, setImageThumbnail] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = editor?.getHTML()

        const { error } = await supabase
            .from("posts")
            .insert([
                {
                    title,
                    content,
                    author: {
                        name: authorName,
                        email: authorEmail,
                    },
                    published,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    published_at: published ? new Date().toISOString() : null,
                    image_thumbnail: imageThumbnail,
                },
            ]);

        if (error) {
            console.error("Lỗi khi tạo bài viết:", error.message);
            return;
        }

        router.push("/posts"); // Chuyển về danh sách bài viết
    };
    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/"); // Nếu chưa đăng nhập, chuyển về trang login
        }
    }, [status, router]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Nhập nội dung bài viết...</p>",
    });

    return (
        <main className="max-w-lg mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Tạo bài viết mới</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2"
                />

                <EditorTap />


                <input
                    type="text"
                    placeholder="Tên tác giả"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full border p-2"
                />
                <input
                    type="email"
                    placeholder="Email tác giả"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    placeholder="Ảnh thumbnail"
                    value={imageThumbnail}
                    onChange={(e) => setImageThumbnail(e.target.value)}
                    className="w-full border p-2"
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                    />
                    <span>Xuất bản</span>
                </label>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Publish
                </button>
            </form>
        </main>
    );
}
