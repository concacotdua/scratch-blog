"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import TiptapEditor from "@/app/components/TiptapEditor";

export default function NewPostPage() {
    const { status } = useSession();
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState(""); // Lưu nội dung bài viết
    const [loading, setLoading] = useState(false); // Trạng thái loading

    // Kiểm tra trạng thái user để tránh hot-reload
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/"); // Dùng `replace` để tránh ghi vào lịch sử duyệt web
        }
    }, [status, router]);

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true); // Bật loading khi gửi request

        const { error } = await supabase.from("posts").insert([
            {
                title: data.title,
                content,
                author: {
                    name: data.authorName,
                    email: data.authorEmail,
                },
                published: data.published,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                published_at: data.published ? new Date().toISOString() : null,
                image_thumbnail: data.imageThumbnail,
            },
        ]);

        if (error) {
            console.error("Lỗi khi tạo bài viết:", error.message);
            alert("Lỗi khi tạo bài viết: " + error.message);
            setLoading(false);
            return;
        }

        router.push("/posts");
    });

    return (
        <main className="w-full max-w-7xl mt-6 mx-auto py-10 px-6 sm:px-10 bg-white shadow-lg rounded-lg">
            <Card className="p-6 shadow-xl rounded-lg bg-white w-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center">📝 Tạo bài viết mới</h1>

                <form onSubmit={onSubmit} className="grid gap-4">
                    {/* Input Tiêu đề */}
                    <Input
                        type="text"
                        placeholder="Tiêu đề bài viết"
                        {...register("title", { required: true })}
                        className="w-full"
                    />
                    <TiptapEditor onChange={setContent} content={content} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            placeholder="Tên tác giả"
                            {...register("authorName", { required: true })}
                            className="w-full"
                        />
                        <Input
                            type="email"
                            placeholder="Email tác giả"
                            {...register("authorEmail", { required: true })}
                            className="w-full"
                        />
                    </div>

                    <Input
                        type="text"
                        placeholder="URL Ảnh thumbnail"
                        {...register("imageThumbnail")}
                        className="w-full"
                    />

                    {/* Switch Xuất bản */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700">Xuất bản ngay</span>
                        <Switch {...register("published")} />
                    </div>

                    {/* Nút Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center gap-2 justify-center py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg rounded-lg hover:scale-105 transition-transform"
                    >
                        {loading ? "Đang đăng..." : <><Globe className="w-5 h-5" /> Xuất bản bài viết</>}
                    </Button>
                </form>
            </Card>
        </main>
    );
}

