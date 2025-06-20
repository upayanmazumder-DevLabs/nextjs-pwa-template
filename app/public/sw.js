self.addEventListener("install", () => {
  console.info("service worker installed.");
});

const sendDeliveryReportAction = () => {
  console.log("Web push delivered.");
};

self.addEventListener("push", function (event) {
  if (!event.data) {
    return;
  }

  const payload = event.data.json();
  const { body, icon, image, badge, url, title } = payload;
  const notificationTitle = title ?? "Hi";
  const notificationOptions = {
    body,
    icon,
    image,
    data: {
      url,
    },
    badge,
    actions: [
      {
        action: "open_url",
        title: "Open Link",
        icon: icon || "/icons/icon-192x192.webp",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: icon || "/icons/icon-96x96.webp",
      },
    ],
  };

  event.waitUntil(
    self.registration
      .showNotification(notificationTitle, notificationOptions)
      .then(() => {
        sendDeliveryReportAction();
      })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (event.action === "open_url" && url) {
    event.waitUntil(clients.openWindow(url));
  } else if (!event.action && url) {
    event.waitUntil(clients.openWindow(url));
  }
  // Dismiss just closes the notification
});
