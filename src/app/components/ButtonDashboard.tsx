'use client'
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function ButtonDashboard() {
    const { data: session } = useSession();
    return (
        <div>
            {session ? (
                <Link href="/posts">
                    <button
                        type="button"
                        className="flex items-center bg-blue-500 text-white px-5 py-4 rounded-lg hover:bg-blue-700 transition-colors">
                        <Pencil className="w-4 h-4 mr-2" />
                        Write a post
                    </button>
                </Link>
            ) : (
                <button
                    type="button"
                    className="bg-green-500 text-white px-5 py-4 rounded-lg hover:bg-green-700 transition-colors">
                    Get Started
                </button>
            )}
        </div>
    )
}

