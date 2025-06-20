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
    background: "#18181b",
    color: "#fafafa",
  },
};

export function createOgImage({
  text,
  size = defaultSize,
  theme = "light",
}: OgImageOptions) {
  const { background, color } = themes[theme] || themes.light;
  let content;
  if (typeof text === "string" && text.startsWith("__ICON_AND_TEXT__")) {
    const actualText = text.replace("__ICON_AND_TEXT__", "");
    content = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/icons/icon-512x512.webp"}
          alt="App Icon"
          width={128}
          height={128}
          style={{ marginBottom: 32 }}
        />
        <span
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color,
          }}
        >
          {actualText}
        </span>
      </div>
    );
  } else {
    content = (
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
        {text}
      </div>
    );
  }
  return new ImageResponse(content, { ...size });
}
