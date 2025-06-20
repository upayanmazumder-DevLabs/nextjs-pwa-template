"use server";

import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";
import type { PushSubscription } from "web-push";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(sub: PushSubscription) {
  await supabase
    .from("subscriptions")
    .upsert([{ endpoint: sub.endpoint, subscription: sub }], {
      onConflict: "endpoint",
    });
  return { success: true };
}

export async function unsubscribeUser(endpoint: string) {
  await supabase.from("subscriptions").delete().eq("endpoint", endpoint);
  return { success: true };
}

export async function sendNotification(message: string) {
  const { data: subs, error } = await supabase
    .from("subscriptions")
    .select("subscription");
  if (error) throw error;
  if (!subs || subs.length === 0) throw new Error("No subscriptions available");
  for (const { subscription } of subs) {
    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: "Test Notification",
          body: message,
          icon: "/icons/icon-192x192.webp",
        })
      );
    } catch (error) {
      // Optionally: remove invalid subscriptions
    }
  }
  return { success: true };
}
