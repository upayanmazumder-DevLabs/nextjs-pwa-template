import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "./og-image-util";
import icon from "@/media/icon/icon.png";
import { headers } from "next/headers";

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

export default async function Image({
  params,
}: {
  params?: Record<string, string>;
}) {
  const text = getTitleFromParams(params);
  const theme = getThemeFromParams(params);
  // Get host from headers for absolute URL (App Router best practice)
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host && host.startsWith("localhost") ? "http" : "https";
  const base =
    (host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_SITE_URL) ||
    "https://nextjs-pwa-template.upayan.dev";
  // icon.src is something like /_next/static/media/icon.xxxxx.png
  const iconUrl = base.replace(/\/$/, "") + icon.src;
  return createOgImage({
    text: `__ICON_AND_TEXT__${text}__ICON_URL__${iconUrl}`,
    size,
    theme,
  });
}
