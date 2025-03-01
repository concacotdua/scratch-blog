import { http } from "@/api/posts/posts";
import PostsClient from "./PostsClient";

export default async function PostsPage() {
    const posts = await http.fetchPosts(); // Fetch trên server
    return <PostsClient initialPosts={posts ?? []} />;
}