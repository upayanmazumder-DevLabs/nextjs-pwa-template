import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "../og-image-util";

export const alt = "Demo | Nextjs PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return createOgImage({
    text: "Demo | Nextjs PWA Template",
    size,
  });
}
