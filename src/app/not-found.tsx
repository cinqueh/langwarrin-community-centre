import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4">
      <h2 className="text-5xl font-bold text-green-700 mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-2">Page Not Found</h3>
      <p className="text-lg mb-6 text-center max-w-lg">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/home"
        className="px-6 py-3 bg-green-700 text-white rounded-lg text-lg font-medium hover:bg-green-800 transition"
      >
        Return Home
      </Link>
    </div>
  );
}