import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-600">The page you are looking for does not exist.</p>
            <Link href="/" className="text-blue-500 hover:text-blue-600 mt-4"><Button variant="outline" className="rounded-lg w-fit bg-green-500 text-white">Go back to the home page</Button></Link>
        </div>
    );
}
