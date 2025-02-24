
export default function Footer() {
    return (
        <footer className="px-4 sm:px-6 py-6 mt-24">
            <div className="container mx-auto">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Scratch Blog. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
