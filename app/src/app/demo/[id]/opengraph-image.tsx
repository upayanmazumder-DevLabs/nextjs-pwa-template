import {
  createOgImage,
  defaultSize,
  defaultContentType,
} from "../../og-image-util";
import data from "../../../data/data.json";
import { notFound } from "next/navigation";

export const size = defaultSize;
export const contentType = defaultContentType;

export default function Image({ params }: { params: { id: string } }) {
  const item = data.find((d) => d.id === params.id);
  if (!item) return notFound();
  return createOgImage({
    text: item.title,
    size,
  });
}

export const alt = "Demo | Nextjs PWA Template";
