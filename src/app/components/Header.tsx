'use client'
import Link from "next/link";
import { LogoDev } from "@/icons/logo";

import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="border-b border-black/10 dark:border-white/10 shadow-md px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto py-4 flex justify-between items-center">
                <p className="flex items-center space-x-1">
                    <Link href="/" className="text-xl font-bold flex items-center hover:opacity-80 transition-opacity">
                        <LogoDev />
                    </Link>
                    <Link href="/" className="ml-2 text-xl font-bold hover:opacity-80 transition-opacity">
                        <span className="text-green-600 dark:text-green-400">Scratch</span>
                        <span className="text-gray-600 dark:text-gray-300">Dev</span>
                    </Link>
                </p>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    {isClient && <UserDropdown />}
                </div>
            </div>
        </header>
    );
}

