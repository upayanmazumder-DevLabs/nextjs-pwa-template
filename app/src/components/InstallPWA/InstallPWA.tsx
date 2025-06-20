"use client";

import React, { useEffect, useState } from "react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "device";
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android device";
  if (/iPad|iPhone|iPod/.test(ua)) return "iOS device";
  if (/Windows/.test(ua)) return "Windows device";
  if (/Macintosh/.test(ua)) return "Mac device";
  if (/Linux/.test(ua)) return "Linux device";
  return "device";
};

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deviceType, setDeviceType] = useState("device");

  useEffect(() => {
    // Check if user previously dismissed
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("pwaPromptDismissed") === "true"
    ) {
      return;
    }
    setDeviceType(getDeviceType());
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("pwaPromptDismissed", "true");
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto mb-8 px-4 sm:px-6 py-4 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4 transition-colors duration-300 w-[95vw] max-w-sm sm:max-w-md">
        <span className="text-gray-900 dark:text-gray-100 font-medium text-center">
          Install this app on your {deviceType} for a better experience!
        </span>
        <div className="flex gap-3 w-full justify-center">
          <button
            onClick={handleInstallClick}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors duration-200"
            aria-label="Dismiss install prompt"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

// Type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  prompt(): Promise<void>;
}

export default InstallPWA;
