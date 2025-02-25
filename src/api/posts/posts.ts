import { supabase } from "@/lib/supabase";
import { Post } from "@/types/Post";

export const http = {
    async fetchPosts() {
        const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
        return posts;
    },
    async fetchPost(id: string) {
        const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();
        return post;
    },
    async createPost(post: Post) {
        const { data, error } = await supabase.from("posts").insert(post).select();
        return { data, error };
    },
    async updatePost(id: string, post: Post) {
        const { data, error } = await supabase.from("posts").update(post).eq("id", id).select();
        return { data, error };
    },
    async deletePost(id: string) {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        return error;
    },

};
