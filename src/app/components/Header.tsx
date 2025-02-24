'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LogoDev } from "@/icons/logo";


export default function Header() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    return (
        <header className="border-b border-gray-100">
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


                {isLoading ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                ) : session?.user ? (
                    <div className="flex items-center space-x-4">
                        {session?.user?.image && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={session?.user?.image || "/fallback-avatar.png"}
                                            alt="User Avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <p className="text-sm font-medium text-gray-700 cursor-pointer">{session.user?.name}
                                        </p>
                                        <Terminal className="w-4 h-4" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56'>
                                    <DropdownMenuLabel>
                                        {session.user?.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href='/profile'>Profile</Link>
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => signOut()}>
                                            Sign Out
                                        </button>
                                        <DropdownMenuShortcut></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                ) : (
                    <button className="bg-gradient-to-r from-green-400 to-indigo-300 text-white px-3 py-2 rounded-lg" onClick={() => signIn()}>
                        Login
                    </button>
                )}
            </div>
        </header >
    );
}

