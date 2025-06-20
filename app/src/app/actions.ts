"use server";

import webpush from "web-push";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const SUBSCRIPTION_FILE = ".subscription.json";

function saveSubscription(sub: any) {
  fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify(sub));
}

function loadSubscription() {
  if (fs.existsSync(SUBSCRIPTION_FILE)) {
    return JSON.parse(fs.readFileSync(SUBSCRIPTION_FILE, "utf-8"));
  }
  return null;
}

export async function subscribeUser(sub: any) {
  saveSubscription(sub);
  return { success: true };
}

export async function unsubscribeUser() {
  if (fs.existsSync(SUBSCRIPTION_FILE)) {
    fs.unlinkSync(SUBSCRIPTION_FILE);
  }
  return { success: true };
}

export async function sendNotification(message: string) {
  const subscription = loadSubscription();
  if (!subscription) {
    throw new Error("No subscription available");
  }
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icons/icon-192x192.webp",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
