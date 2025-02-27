import { supabase } from "@/lib/supabase";

export const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (error) throw new Error(error.message);

    return supabase.storage.from("avatars").getPublicUrl(filePath);
};
