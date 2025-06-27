import Link from "next/link";

export const metadata = {
  title: "About | Next.js PWA Template",
  description:
    "Learn more about the Next.js PWA Template, its features, and the team behind it.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p>This is the about page for the Next.js PWA Template.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Click here to go back to Home
      </Link>
    </div>
  );
}
