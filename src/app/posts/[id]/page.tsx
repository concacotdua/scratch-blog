"use server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostDetail from "./PostDetail";
import { http } from "@/api/posts/posts";
interface PostDetailPageProps {
    params: { id: string };
}
export default async function PostDetailPage({ params }: PostDetailPageProps) {
    const session = await getServerSession();
    if (!session) {
        return redirect("/");
    }
    const { id } = await params;
    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">404</h2>
                    <p className="text-gray-600 mb-4">Post not found</p>
                    <p className="text-red-500">The requested post could not be found. Please check the URL and try again.</p>
                </div>
            </div>
        );
    }

    const post = await http.fetchPost(id);

    return <PostDetail data={post} />;
}
