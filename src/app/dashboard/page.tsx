import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return <p>Vui lòng đăng nhập</p>;

    const { data: posts } = await supabase.from("posts").select("*").eq("user_id", user).order("created_at", { ascending: false });

    return (
        <main className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Bài viết của bạn</h1>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id} className="border-b py-3">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
