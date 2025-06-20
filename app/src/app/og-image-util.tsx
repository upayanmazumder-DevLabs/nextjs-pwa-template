import { ImageResponse } from "next/og";

export interface OgImageOptions {
  text: string;
  alt?: string;
  size?: { width: number; height: number };
  contentType?: string;
  theme?: "light" | "dark";
}

export const defaultSize = { width: 1200, height: 630 };
export const defaultContentType = "image/png";

const themes = {
  light: {
    background: "white",
    color: "#0a0a0a",
  },
  dark: {
    background: "#000",
    color: "#fff",
  },
};

export function createOgImage({
  text,
  size = defaultSize,
  theme = "light",
}: OgImageOptions) {
  const { background, color } = themes[theme] || themes.light;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color,
        }}
      >
        <img
          src="https://nextjs-pwa-template.upayan.dev/icon.png"
          alt="Logo"
          style={{
            width: 128,
            height: 128,
          }}
        />
        {text}
      </div>
    ),
    { ...size }
  );
}
