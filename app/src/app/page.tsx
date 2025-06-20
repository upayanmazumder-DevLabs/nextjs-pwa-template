import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center">
      <h1 className="text-2xl font-bold">Home Page</h1>

      <Link href="/contact" className="text-blue-500 hover:underline">
        Click here to go to Contact
      </Link>

      <Link href="/about" className="text-blue-500 hover:underline">
        Click here to go to About
      </Link>
    </div>
  );
}
