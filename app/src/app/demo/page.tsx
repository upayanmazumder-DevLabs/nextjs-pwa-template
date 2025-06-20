import data from "../../data/data.json";
import Link from "next/link";

export default function DemoRoutesList() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8 rounded-lg shadow-md mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Available Demo Routes
      </h1>
      <ul className="w-full space-y-4">
        {data.map((item) => (
          <li key={item.id} className="w-full">
            <Link
              href={`/demo/${item.id}`}
              className="block w-full px-4 py-3 bg-blue-100 hover:bg-blue-200 rounded transition-colors text-blue-900 font-medium text-lg text-center"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
