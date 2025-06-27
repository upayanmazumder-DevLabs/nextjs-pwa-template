import Link from "next/link";

export const metadata = {
  title: "Contact | Next.js PWA Template",
  description: "Get in touch with the team behind the Next.js PWA Template.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center">
      <h1 className="text-2xl font-bold">Contact Page</h1>

      <Link href="/" className="text-blue-500 hover:underline">
        Click here to go back to Home
      </Link>
    </div>
  );
}
