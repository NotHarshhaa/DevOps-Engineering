// Service Worker for DevOps Engineering
const CACHE_NAME = 'devops-engineering-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/global.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - Network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // API calls - network only
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // For HTML pages - network first, then cache
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache a copy of the response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, try the offline fallback
            return caches.match('/');
          });
        })
    );
    return;
  }

  // For assets - cache first, then network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return from cache and update cache in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        });
        // Return cached response immediately, but update cache in background
        return cachedResponse;
      }

      // Not in cache, get from network
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cache the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // If both cache and network fail, show generic offline page
        if (event.request.headers.get('Accept')?.includes('image/')) {
          return new Response('', { status: 200, statusText: 'OK' });
        }
      });
    })
  );
});

// Handle connectivity changes
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Background data sync function
const syncData = async () => {
  try {
    // Code to sync offline actions when online again
    const offlineData = await getOfflineData();
    if (offlineData && offlineData.length > 0) {
      for (const item of offlineData) {
        // Send each offline action to the server
        await fetch('/api/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });
      }
      // Clear offline data after successful sync
      await clearOfflineData();
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
};

// Helper functions for offline data
const getOfflineData = async () => {
  // This would be implemented with IndexedDB in a real app
  return JSON.parse(localStorage.getItem('offlineActions') || '[]');
};

const clearOfflineData = async () => {
  localStorage.removeItem('offlineActions');
};

// Performance optimization: pre-connect to critical origins
const preconnectTo = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Mobile optimization: reduce animation on low-end devices
const optimizeForLowEndDevices = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
    document.documentElement.classList.add('reduce-motion');
  }
};

// Warm up the runtime to improve page performance
self.addEventListener('message', (event) => {
  if (event.data === 'warmup') {
    // Perform any warm-up tasks here
    console.log('Service worker warmed up');
  }
});
