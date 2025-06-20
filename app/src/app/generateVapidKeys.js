(async () => {
  const webPush = await import("web-push");
  const fs = await import("fs");

  const vapidKeys = webPush.default.generateVAPIDKeys();

  const envData = `
NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
NEXT_PUBLIC_VAPID_PRIVATE_KEY=${vapidKeys.privateKey}
`;

  fs.default.writeFileSync(".env", envData, { flag: "w" });

  console.log("#### VAPID keys generated and saved to .env file ### \n");
})();
