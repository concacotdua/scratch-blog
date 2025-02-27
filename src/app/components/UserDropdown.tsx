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
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Image
                                src={session.user.image || "/fallback-avatar.png"}
                                alt="User Avatar"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <p className="text-sm font-medium text-gray-700">
                                {session.user.name}
                            </p>
                            <Terminal className="w-4 h-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/profile">
                                <DropdownMenuItem>
                                    Profile
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-3 py-2 rounded-lg"
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
        <RainbowButton className="bg-gradient-to-r from-green-400 to-red-300 px-3 py-2 rounded-full" onClick={() => signIn()}>
            <Google className="w-4 h-4" />
        </RainbowButton>
    );
}
