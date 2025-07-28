"use client";

import { useEffect } from "react";

/**
 * A client component that registers the service worker for offline capabilities
 * and performance improvements. This should be imported and used in a client component.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.location.hostname !== "localhost"
    ) {
      // Register the service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration.scope);

          // Check for updates every hour
          setInterval(() => {
            registration.update();
          }, 3600000);

          // Notify user when an update is available
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;

            newWorker?.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker is installed but waiting to activate
                const updateNotification = document.createElement("div");
                updateNotification.className = "update-notification";
                updateNotification.innerHTML = `
                  <div class="update-content">
                    <p>A new version is available!</p>
                    <button id="update-button">Update Now</button>
                  </div>
                `;
                document.body.appendChild(updateNotification);

                document
                  .getElementById("update-button")
                  ?.addEventListener("click", () => {
                    // Tell the service worker to skipWaiting
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                    window.location.reload();
                  });
              }
            });
          });
        })
        .catch((error) => {
          console.error("SW registration failed: ", error);
        });

      // Handle service worker update when controller changes
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("New service worker activated");
      });

      // Optimize for mobile devices
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // Warm up the service worker to improve performance
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage("warmup");
        }

        // Add mobile optimizations
        document.documentElement.classList.add("mobile-optimized");

        // Handle offline status
        window.addEventListener("online", () => {
          document.documentElement.classList.remove("offline-mode");

          // Trigger background sync if supported
          navigator.serviceWorker.ready
            .then((registration) => {
              if ("sync" in registration) {
                // @ts-ignore: sync may not be typed in TS
                return registration.sync.register("sync-data");
              }
            })
            .catch((err) => console.log("Background sync failed:", err));
        });

        window.addEventListener("offline", () => {
          document.documentElement.classList.add("offline-mode");
        });

        // Detect slow connections
        if ("connection" in navigator) {
          const connection = navigator.connection as any;

          if (
            connection.effectiveType === "2g" ||
            connection.effectiveType === "slow-2g"
          ) {
            document.documentElement.classList.add("slow-connection");

            // Apply data-saving measures
            document
              .querySelectorAll('img:not([loading="eager"])')
              .forEach((img: Element) => {
                (img as HTMLImageElement).loading = "lazy";
                (img as HTMLImageElement).decoding = "async";
              });
          }

          // Listen for connection changes
          connection.addEventListener("change", () => {
            if (
              connection.effectiveType === "2g" ||
              connection.effectiveType === "slow-2g"
            ) {
              document.documentElement.classList.add("slow-connection");
            } else {
              document.documentElement.classList.remove("slow-connection");
            }
          });
        }
      }

      // Add notification styles
      const style = document.createElement("style");
      style.textContent = `
        .update-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 9999;
          display: flex;
          align-items: center;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .update-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .update-content p {
          margin: 0;
        }

        #update-button {
          background-color: #7c3aed;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        #update-button:hover {
          background-color: #6d28d9;
        }

        .offline-mode body::before {
          content: "You are offline. Some features may be limited.";
          display: block;
          text-align: center;
          background-color: #f7b955;
          color: #333;
          padding: 5px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          font-size: 14px;
        }

        .slow-connection img {
          filter: blur(5px);
          transition: filter 0.5s ease-in-out;
        }

        .slow-connection img.loaded {
          filter: blur(0);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
}
