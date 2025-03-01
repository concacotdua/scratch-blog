"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { http } from "@/api/posts/posts";
import { Post } from "@/types/Post";
import TiptapEditor from "@/app/components/TiptapEditor";

export default function EditPostPage() {
    const router = useRouter();
    const { id: postId } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue } = useForm();

    // Kiểm tra postId hợp lệ trước khi gọi API
    const isValidPostId = typeof postId === "string" && postId.trim() !== "";

    // Fetch dữ liệu bài viết
    const { data: post, isPending } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => http.fetchPost(postId as string),
        enabled: isValidPostId,
        staleTime: 1000 * 60 * 5, // Giữ dữ liệu trong cache 5 phút
    });

    // Tránh lỗi khi dữ liệu chưa tải xong
    const initialPost = useMemo<Post>(
        () => ({
            id: post?.id || "",
            title: post?.title || "",
            content: post?.content || "",
            image_thumbnail: post?.image_thumbnail || "",
            created_at: post?.created_at || "",
        }),
        [post]
    );

    const [content, setContent] = useState(initialPost.content);

    // Cập nhật dữ liệu vào form khi có bài viết
    useEffect(() => {
        if (initialPost.id) {
            setValue("title", initialPost.title);
            setValue("image_thumbnail", initialPost.image_thumbnail);
            setContent(initialPost.content);
        }
    }, [initialPost, setValue]);

    // Xử lý cập nhật bài viết
    const updatePostMutation = useMutation({
        mutationFn: (updatedPost: Post) => http.updatePost(postId as string, updatedPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            router.push(`/posts/${postId}`);
        },
        onError: (error) => {
            alert("Lỗi khi cập nhật bài viết: " + error.message);
        },
    });

    const onSubmit = async (data: any) => {
        updatePostMutation.mutate({
            ...initialPost,
            title: data.title,
            content,
            image_thumbnail: data.image_thumbnail,
        });
    };

    const handleCancel = () => router.push("/posts");

    if (isPending) return <p className="text-gray-500 text-center">⏳ Đang tải...</p>;

    return (
        <main className="w-full max-w-7xl mt-6 mx-auto py-10 px-6 sm:px-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                ✏️ Chỉnh sửa bài viết
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Tiêu đề */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tiêu đề bài viết</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập tiêu đề..."
                    />
                </div>

                {/* Nội dung */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Nội dung bài viết</label>
                    <TiptapEditor content={content} onChange={setContent} />
                </div>

                {/* Ảnh Thumbnail */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Ảnh Thumbnail (URL)</label>
                    <input
                        type="text"
                        {...register("image_thumbnail")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập URL ảnh..."
                    />
                    {initialPost.image_thumbnail && (
                        <div className="mt-3">
                            <img
                                src={initialPost.image_thumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Nút thao tác */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={updatePostMutation.isPending}
                        className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 flex justify-center items-center gap-2"
                    >
                        <Save />
                        <span>{updatePostMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </main>
    );
}


