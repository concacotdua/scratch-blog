"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, []);

    if (user) {
        router.push("/dashboard");
        return <p>Đang chuyển hướng...</p>;
    }

    return (
        <main className="max-w-md mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Đăng nhập</h1>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["google", "github"]} />
        </main>
    );
}
