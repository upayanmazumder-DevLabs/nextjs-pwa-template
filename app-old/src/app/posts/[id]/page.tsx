// app/posts/[id]/page.tsx

import Link from "next/link";

export const dynamic = "force-dynamic"; // <-- This is required for runtime generation

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-2xl border rounded p-6 bg-neutral-900 border-neutral-800">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-neutral-300 mb-6">{post.body}</p>
        <Link href="/posts" className="text-blue-400 hover:underline">
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
}
