import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "./og-image-util";

export const alt = "Next.js PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image({ params }: { params?: Record<string, string> }) {
  let text = "Next.js PWA Template";
  if (params) {
    if (params.slug) text = `Page: ${params.slug}`;
    if (params.tag && params.item)
      text = `Tag: ${params.tag}, Item: ${params.item}`;
    if (params.tag && !params.item) text = `Tag: ${params.tag}`;
  }
  return createOgImage({
    text,
    size,
  });
}
