import { useState, useEffect } from 'react';

export interface VersionConfig {
  version_name: string;
  download_size: string;
  download_url: string;
  is_mandatory: boolean;
  highlights: string[];
}

export const DEFAULT_VERSION_CONFIG: VersionConfig = {
  version_name: '1.1.0',
  download_size: '22 MB',
  download_url: 'https://nooritech.netlify.app/',
  is_mandatory: false,
  highlights: [
    'Latest release with enhanced video player',
    'Bug fixes & smooth performance'
  ]
};

export function useVersionConfig() {
  const [config, setConfig] = useState<VersionConfig>(DEFAULT_VERSION_CONFIG);
  const [isLiveSynced, setIsLiveSynced] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadVersion() {
      try {
        const res = await fetch('/version.json', { cache: 'no-cache' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.version_name && !isCancelled) {
            setConfig({
              version_name: data.version_name || DEFAULT_VERSION_CONFIG.version_name,
              download_size: data.download_size || DEFAULT_VERSION_CONFIG.download_size,
              download_url: data.download_url || DEFAULT_VERSION_CONFIG.download_url,
              is_mandatory: Boolean(data.is_mandatory),
              highlights: Array.isArray(data.highlights) && data.highlights.length > 0
                ? data.highlights 
                : DEFAULT_VERSION_CONFIG.highlights
            });
            setIsLiveSynced(true);
          }
        }
      } catch (e) {
        // Fallback smoothly on DEFAULT_VERSION_CONFIG
      }
    }

    loadVersion();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { config, isLiveSynced };
}
