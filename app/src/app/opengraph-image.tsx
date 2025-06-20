import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "./og-image-util";

export const alt = "Next.js PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return createOgImage({
    text: "Next.js PWA Template",
    size,
  });
}
