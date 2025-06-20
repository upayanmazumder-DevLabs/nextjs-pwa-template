"use client";

import { useEffect, useState } from "react";
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  registerAndSubscribe,
  sendWebPush,
} from "../components/Push/Push";

export default function Home() {
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);
    if (isUnsupported) return;
    checkPermissionStateAndAct(setSubscription);
  }, []);

  const handleSendPush = async () => {
    setSending(true);
    setFeedback("");
    try {
      await sendWebPush(message);
      setFeedback("Push sent!");
      setMessage("");
    } catch (e) {
      setFeedback("Failed to send push");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">
          Next.js PWA Push Demo
        </h1>
        <button
          disabled={unsupported || !!subscription}
          onClick={() => registerAndSubscribe(setSubscription)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 mb-8 w-full ${
            unsupported
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : subscription
              ? "bg-green-600 text-white"
              : "bg-blue-700 text-white hover:bg-blue-800"
          }`}
        >
          {unsupported
            ? "Notification Unsupported"
            : subscription
            ? "Notifications Enabled"
            : "Enable Notifications"}
        </button>
        {subscription && (
          <div className="flex flex-col items-center w-full">
            <input
              placeholder="Type push message ..."
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 mt-4 placeholder-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
            />
            <button
              className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition-colors duration-200 w-full"
              onClick={handleSendPush}
              disabled={sending || !message.trim()}
            >
              {sending ? "Sending..." : "Send Test Push"}
            </button>
            {feedback && (
              <div className="mt-4 text-sm text-green-400">{feedback}</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
