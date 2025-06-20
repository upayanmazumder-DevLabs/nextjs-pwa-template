import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "./og-image-util";

export const alt = "Next.js PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

function getTitleFromParams(params?: Record<string, string>) {
  if (!params) return "Next.js PWA Template";
  if (params.about !== undefined) return "About Next.js PWA Template";
  if (params.contact !== undefined) return "Contact Next.js PWA Template";
  if (params.slug) return `Page: ${params.slug}`;
  if (params.tag && params.item)
    return `Tag: ${params.tag}, Item: ${params.item}`;
  if (params.tag) return `Tag: ${params.tag}`;
  return "Next.js PWA Template";
}

function getThemeFromParams(params?: Record<string, string>) {
  if (params?.tag) return "dark";
  return "light";
}

export default function Image({ params }: { params?: Record<string, string> }) {
  const text = getTitleFromParams(params);
  const theme = getThemeFromParams(params);
  return createOgImage({
    text: `__ICON_AND_TEXT__${text}`,
    size,
    theme,
  });
}
