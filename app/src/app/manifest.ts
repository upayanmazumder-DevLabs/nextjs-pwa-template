import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js PWA",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "browser"],
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    lang: "en",
    dir: "ltr",
    categories: ["productivity", "utilities", "development"],
    screenshots: [
      {
        src: "/screenshots/screenshot-wide-1.png",
        sizes: "2880x1656",
        type: "image/png",
        label: "Home screen",
        form_factor: "wide",
      },
      {
        src: "/screenshots/screenshot-1.png",
        sizes: "1026x1463",
        type: "image/png",
      },
    ],
    // related_applications: [
    //   {
    //     platform: "webapp",
    //     url: "https://nextjs.org/",
    //   },
    // ],
    // prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-16x16.webp",
        sizes: "16x16",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-32x32.webp",
        sizes: "32x32",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-64x64.webp",
        sizes: "64x64",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-72x72.webp",
        sizes: "72x72",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-76x76.webp",
        sizes: "76x76",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.webp",
        sizes: "96x96",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-114x114.webp",
        sizes: "114x114",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-120x120.webp",
        sizes: "120x120",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.webp",
        sizes: "128x128",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.webp",
        sizes: "144x144",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.webp",
        sizes: "152x152",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-180x180.webp",
        sizes: "180x180",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-196x196.webp",
        sizes: "196x196",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-228x228.webp",
        sizes: "228x228",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-256x256.webp",
        sizes: "256x256",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.webp",
        sizes: "384x384",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Open Home",
        short_name: "Home",
        description: "Go to the home page",
        url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
      {
        name: "Open Docs",
        short_name: "Docs",
        description: "Go to documentation",
        url: "/docs",
        icons: [
          {
            src: "/icons/icon-192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
    ],
    protocol_handlers: [
      {
        protocol: "web+example",
        url: "/?q=%s",
      },
    ],
    // iarc_rating_id: "eC1234567890", // Uncomment and set if rated by IARC
  };
}
