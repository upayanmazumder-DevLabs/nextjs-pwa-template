import webpush, { PushSubscription as WebPushSubscription } from "web-push";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  throw new Error("VAPID keys are not set in environment variables.");
}

webpush.setVapidDetails(
  "mailto:mail@nextjs-pwa-template",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscription: WebPushSubscription | null = null;

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/api/web-push/subscription":
      return setSubscription(request);
    case "/api/web-push/send":
      return sendPush(request);
    default:
      return notFoundApi();
  }
}

async function setSubscription(request: Request) {
  const body: { subscription: WebPushSubscription } = await request.json();
  subscription = body.subscription;
  return new Response(JSON.stringify({ message: "Subscription set." }), {});
}

async function sendPush(request: Request) {
  if (!subscription) {
    return new Response(JSON.stringify({ error: "No subscription set." }), {
      status: 400,
    });
  }
  const body = await request.json();
  const pushPayload = JSON.stringify(body);
  await webpush.sendNotification(subscription, pushPayload);
  return new Response(JSON.stringify({ message: "Push sent." }), {});
}

async function notFoundApi() {
  return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}
