// DQAP eCSS — Firebase Messaging Service Worker
// This file MUST be served from the site root (e.g. https://dqapsys.github.io/DQAP-eCSS/firebase-messaging-sw.js)
// — Firebase Messaging requires this exact path relationship, it cannot sit in a subfolder.

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCBRE0VlIjuRsW7JE22pVHsKimDwtrTSHE",
  authDomain: "dqap-ecss.firebaseapp.com",
  projectId: "dqap-ecss",
  storageBucket: "dqap-ecss.firebasestorage.app",
  messagingSenderId: "902896957641",
  appId: "1:902896957641:web:f87299e984de72eb6e7518"
});

const messaging = firebase.messaging();

// Fires when a push arrives while the app/tab is NOT in the foreground.
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'DQAP eCSS';
  const options = {
    body: payload.notification?.body || '',
    icon: '/DQAP-eCSS/icon-192.png',
    badge: '/DQAP-eCSS/icon-192.png',
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);

  // Bumps the little red badge count on the installed app's icon, where supported
  // (Chrome/Edge on desktop and Android; not supported on iOS Safari).
  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(1).catch(() => {});
  }
});

// Clicking the notification focuses/opens the relevant page.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/DQAP-eCSS/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/DQAP-eCSS/') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
