import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "../og-image-util";
import { NextRequest } from "next/server";

export const alt = "About | Nextjs PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export const runtime = "edge";

export default function Image(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "About | Nextjs PWA Template";
  return createOgImage({
    text,
    size,
  });
}
