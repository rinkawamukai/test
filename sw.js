self.addEventListener('push', (event) => {
  // サーバ側から送る payload(JSON) をそのまま通知に映す想定
  let data = {};
  try { data = event.data?.json() || {}; } catch {}
  const title = data.title ?? '通知';
  const options = {
    body: data.body ?? '',
    icon: data.icon ?? '/icon-192.png',
    badge: data.badge ?? '/badge-72.png',
    data: { url: data.url ?? '/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/';
  e.waitUntil(clients.openWindow(url));
});
