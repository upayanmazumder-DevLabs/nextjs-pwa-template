import Link from "next/link";

export const metadata = {
  title: "Posts | Next.js PWA Template",
  description: "Browse posts fetched from JSONPlaceholder API.",
};

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function PostsPage() {
  const posts: Post[] = await getPosts();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <ul className="w-full max-w-2xl space-y-4">
        {posts.map((post: Post) => (
          <li
            key={post.id}
            className="border rounded p-4 bg-neutral-900 border-neutral-800"
          >
            <Link
              href={`/posts/${post.id}`}
              className="text-lg font-semibold text-blue-400 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-neutral-400 mt-2 line-clamp-2">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
