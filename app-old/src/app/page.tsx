import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center  px-4">
      <section className="max-w-xl w-full text-center py-14 rounded-lg bg-black border border-neutral-800">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Next.js PWA Template
        </h1>
        <p className="text-base md:text-lg text-neutral-400 mb-7 px-4">
          Minimal, fast, installable web app starter. Build your next idea with
          clean code and a beautiful dark UI.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-7">
          <Link
            href="/contact"
            className="px-5 py-2 bg-white text-black rounded border border-neutral-800 font-medium hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="px-5 py-2 bg-black text-white rounded border border-neutral-800 font-medium hover:bg-neutral-900 transition-colors"
          >
            About
          </Link>
        </div>
        <div className="my-7">
          <a
            href="https://github.com/upayanmazumder/nextjs-pwa-template"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-800 text-neutral-300 rounded hover:bg-neutral-900 hover:text-white transition-colors"
          >
            ⭐ Star & Contribute on GitHub
          </a>
          <p className="text-xs text-neutral-500 mt-2">
            Like this project? Star it and contribute!
          </p>
        </div>
      </section>
    </main>
  );
}
