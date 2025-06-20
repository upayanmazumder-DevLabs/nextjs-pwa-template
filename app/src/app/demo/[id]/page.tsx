import { notFound } from "next/navigation";
import data from "../../../data/data.json";
import { Metadata } from "next";

interface DemoPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return data.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const item = data.find((d) => d.id === params.id);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
  };
}

export default function DemoPage({ params }: DemoPageProps) {
  const item = data.find((d) => d.id === params.id);
  if (!item) return notFound();
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8 rounded-lg shadow-md mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{item.title}</h1>
      <p className="text-lg text-gray-700 text-center">{item.description}</p>
    </main>
  );
}
