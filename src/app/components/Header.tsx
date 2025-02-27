'use client'
import Link from "next/link";
import { LogoDev } from "@/icons/logo";


import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";

export default function Header() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="border-b border-black/10 shadow-md px-4">
            <div className="container mx-auto py-4 flex justify-between items-center">
                <p className="flex items-center space-x-1 text-green-600">
                    <Link href="/" className="text-xl font-bold flex items-center">
                        <LogoDev />
                    </Link>
                    <Link href="/" className="ml-2 text-xl font-bold">
                        <span className="text-green-600">Scratch</span>
                        <span className="text-gray-600">Dev</span>
                    </Link>
                </p>

                {/* Chỉ render UserMenu khi client đã mount */}
                {isClient && <UserDropdown />}
            </div>
        </header>
    );
}

