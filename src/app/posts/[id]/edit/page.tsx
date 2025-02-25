"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save } from "lucide-react";
import EditorTap from "@/app/components/EditorTap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { http } from "@/api/posts/posts";
import { Post } from "@/types/Post";

export default function EditPostPage() {
    const router = useRouter();
    const { id: postId } = useParams();
    const queryClient = useQueryClient();

    const { data: post, isPending } = useQuery({ queryKey: ['post', postId], queryFn: () => http.fetchPost(postId as string), enabled: !!postId });
    const updatePostMutation = useMutation({
        mutationFn: (post: Post) => http.updatePost(postId as string, post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            router.push(`/posts/${postId}`);
        },
        onError: (error) => {
            alert("Lỗi khi cập nhật bài viết: " + error.message);
        },
    })
    const { register, handleSubmit, setValue } = useForm();
    const [content, setContent] = useState("");

    useEffect(() => {
        if (post) {
            setValue("title", post.title);
            setValue("image_thumbnail", post.image_thumbnail);
            setContent(post.content);
        }
    }, [post, setValue]);

    const onSubmit = async (data: any) => {
        updatePostMutation.mutate({
            id: postId as string,
            title: data.title,
            content,
            image_thumbnail: data.image_thumbnail,
            created_at: post?.created_at,
        });
    };

    if (isPending) return <p>Đang tải...</p>;

    return (
        <main className="max-w-2xl mx-auto py-10 px-6 sm:px-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                ✏️ Chỉnh sửa bài viết
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Tiêu đề bài viết */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Tiêu đề bài viết
                    </label>
                    <input
                        type="text"
                        {...register("title")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập tiêu đề..."
                        required
                    />
                </div>

                {/* Nội dung bài viết */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Nội dung bài viết</label>
                    <EditorTap description={content} onChange={setContent} />
                </div>

                {/* Ảnh thumbnail */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Ảnh Thumbnail (URL)
                    </label>
                    <input
                        type="text"
                        {...register("image_thumbnail")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập URL ảnh..."
                    />
                    {/* Preview hình ảnh nếu có */}
                    {post?.image_thumbnail && (
                        <div className="mt-3">
                            <img
                                src={post.image_thumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Nút lưu thay đổi */}
                <button
                    type="submit"
                    disabled={updatePostMutation.isPending}
                    className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 flex justify-center items-center gap-2"
                >
                    <Save />
                    <span>{updatePostMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}</span>
                </button>
            </form>
        </main>

    );
}
