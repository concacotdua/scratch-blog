import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-600">The page you are looking for does not exist.</p>
            <Link href="/">Go back to the home page</Link>
        </div>
    );
}
