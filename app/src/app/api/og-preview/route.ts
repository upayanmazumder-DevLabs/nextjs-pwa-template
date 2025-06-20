import { NextRequest } from "next/server";
import { createOgImage } from "../../og-image-util";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "Next.js PWA Template";
  const theme = (searchParams.get("theme") as "light" | "dark") || "light";
  const image = createOgImage({ text, theme });
  return image;
}
