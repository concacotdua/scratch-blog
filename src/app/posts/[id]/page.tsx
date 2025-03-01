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
    const { id } = params;
    if (!id) {
        return <p className="text-red-500">Không tìm thấy bài viết.</p>;
    }

    const post = await http.fetchPost(id);

    return <PostDetail data={post} />;
}
