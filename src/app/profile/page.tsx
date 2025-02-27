"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const { register, handleSubmit, setValue } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(session?.user?.image || "");

    const onSubmit = async (data: any) => {
        data.avatar = avatarPreview; // Gán avatar mới vào data trước khi gửi

        console.log("Dữ liệu gửi lên API:", data); // Log kiểm tra dữ liệu

        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            await res.json();
            update({ user: { ...session?.user, name: data.name, image: data.avatar } });
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const user = session?.user;
        if (!user) {
            console.error("User chưa đăng nhập!");
            return;
        }

        const fileName = `${user.email}-${Date.now()}.jpg`;

        const { data, error } = await supabase.storage
            .from("avatars")
            .upload(fileName, file, {
                contentType: file.type, // Thêm định dạng file
                cacheControl: "3600",
                upsert: true,
            });

        if (error) {
            console.error("Lỗi upload ảnh:", error);
        } else {
            console.log("Upload thành công!", data);
            setAvatarPreview(`${supabase.storage.from("avatars").getPublicUrl(fileName)}`);
        }
    };

    return (
        <Card className="p-6 max-w-lg mx-auto mt-6">
            <h2 className="text-xl font-bold">Chỉnh sửa thông tin cá nhân</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mt-5 flex flex-col items-center">
                    <img src={avatarPreview} alt="Avatar" width="120" height="120" />

                    <input type="file" accept="image/*" onChange={handleUpload} className="mt-2" />
                </div>
                <Input {...register("name")} placeholder="Họ và tên" defaultValue={session?.user?.name || ""} />
                <Input readOnly defaultValue={session?.user?.email || ""} />
                <Button type="submit" color="primary">Lưu thay đổi</Button>
            </form>
        </Card>
    );
}
