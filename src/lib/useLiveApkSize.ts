import { useState, useEffect } from 'react';

/**
 * Custom hook to dynamically detect and compute live APK size from the hosting server (e.g. Dropbox CDN).
 * Uses real HTTP HEAD requests with CORS headers to get Content-Length.
 */
export function useLiveApkSize(url: string, fallbackBytes: number = 28118800) {
  const [sizeStr, setSizeStr] = useState<string>(() => {
    const mb = (fallbackBytes / (1024 * 1024)).toFixed(2);
    return `${mb} MB`;
  });
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchLiveSize() {
      if (!url || url === '#') return;

      try {
        const response = await fetch(url, {
          method: 'HEAD',
          cache: 'no-cache'
        });

        const contentLength = response.headers.get('content-length');
        if (contentLength && !isCancelled) {
          const bytes = parseInt(contentLength, 10);
          if (!isNaN(bytes) && bytes > 0) {
            const mb = (bytes / (1024 * 1024)).toFixed(2);
            setSizeStr(`${mb} MB`);
            setIsLive(true);
          }
        }
      } catch (e) {
        // Fallback gracefully on fallbackBytes
      }
    }

    fetchLiveSize();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { sizeStr, isLive };
}
