import { ImageResponse } from "next/og";

export interface OgImageOptions {
  text: string;
  alt?: string;
  size?: { width: number; height: number };
  contentType?: string;
}

export const defaultSize = { width: 1200, height: 630 };
export const defaultContentType = "image/png";

export function createOgImage({ text, size = defaultSize }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#0a0a0a",
        }}
      >
        {text}
      </div>
    ),
    { ...size }
  );
}
