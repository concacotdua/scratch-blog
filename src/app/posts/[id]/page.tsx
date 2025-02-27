
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostDetail from "./PostDetail";

export default async function PostDetailPage({ params }: { params: { id: string } }) {
    const session = await getServerSession();
    if (!session) {
        return redirect("/");
    }
    const { id } = await params;

    return <PostDetail id={id} />;
}