import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "../og-image-util";

export const alt = "About | Nextjs PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return createOgImage({
    text: "About | Nextjs PWA Template",
    size,
  });
}
