import Link from "next/link";

export const metadata = {
  title: "Not Found | Next.js PWA Template",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center">
      <h1 className="text-2xl font-bold">Not Found</h1>
      <Link href="/" className="text-blue-500 hover:underline">
        Click here to go to Home
      </Link>

      <Link href="/contact" className="text-blue-500 hover:underline">
        Click here to go to Contact
      </Link>

      <Link href="/about" className="text-blue-500 hover:underline">
        Click here to go to About
      </Link>
    </div>
  );
}
