import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "../og-image-util";

export const alt = "Contact | Nextjs PWA Template";
export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image() {
  return createOgImage({
    text: "Contact | Nextjs PWA Template",
    size,
  });
}
