import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Google from "@/icons/logo";

export default function UserDropdown() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    if (isLoading) {
        return <Skeleton className="h-12 w-12 rounded-full" />;
    }

    return session?.user ? (
        <div className="flex items-center space-x-4">
            {session?.user?.image && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src={session.user.image || "/fallback-avatar.png"}
                                alt="User Avatar"
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-green-500/50"
                            />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {session.user.name}
                            </p>
                            <Terminal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">{session.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                        <DropdownMenuGroup>
                            <Link href="/profile">
                                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <span className="text-gray-700 dark:text-gray-200">Profile</span>
                                    <DropdownMenuShortcut className="text-gray-500 dark:text-gray-400">⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <span className="text-gray-700 dark:text-gray-200">Settings</span>
                                <DropdownMenuShortcut className="text-gray-500 dark:text-gray-400">⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                        <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button
                                type="button"
                                className="w-full text-left text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    ) : (
        <RainbowButton
            className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => signIn()}
        >
            <Google className="w-5 h-5 mr-2" />
            <span className="font-medium">Sign In</span>
        </RainbowButton>
    );
}
