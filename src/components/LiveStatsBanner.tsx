import React, { useState, useEffect } from 'react';
import { Users, Download } from 'lucide-react';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  increment,
  serverTimestamp,
} from 'firebase/firestore';

export type TrackableApp = 'raqam-flow' | 'nexa-player';

const getSessionId = () => {
  let id = sessionStorage.getItem('rf_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    sessionStorage.setItem('rf_session_id', id);
  }
  return id;
};

export const trackApkDownload = async (appId: TrackableApp = 'raqam-flow') => {
  try {
    const docId = appId === 'nexa-player' ? 'nexa_downloads' : 'downloads';
    const statsRef = doc(db, 'stats', docId);
    await setDoc(
      statsRef,
      {
        count: increment(1),
        lastDownloadedAt: serverTimestamp(),
        appName: appId === 'nexa-player' ? 'Nexa Player Pro' : 'Raqam Flow',
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Error incrementing download counter:', err);
  }
};

export function useLiveDownloads(appId: TrackableApp = 'raqam-flow') {
  const [downloadCount, setDownloadCount] = useState<number>(0);

  useEffect(() => {
    const docId = appId === 'nexa-player' ? 'nexa_downloads' : 'downloads';
    const statsRef = doc(db, 'stats', docId);

    setDoc(statsRef, { count: increment(0) }, { merge: true }).catch(() => {});

    const unsubscribeStats = onSnapshot(
      statsRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (typeof data.count === 'number') {
            setDownloadCount(data.count);
          }
        }
      },
      (err) => {
        console.warn('Live download count snapshot error:', err);
      }
    );

    return () => unsubscribeStats();
  }, [appId]);

  return downloadCount;
}

export interface LiveStatsBannerProps {
  appId?: TrackableApp;
  title?: string;
  theme?: 'emerald' | 'cyan';
}

export function LiveStatsBanner({
  appId = 'raqam-flow',
  title,
  theme,
}: LiveStatsBannerProps) {
  const isNexa = appId === 'nexa-player' || theme === 'cyan';
  const [liveVisitors, setLiveVisitors] = useState<number>(1);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  useEffect(() => {
    const sessionId = getSessionId();
    const presenceRef = doc(db, 'presence', sessionId);

    const sendHeartbeat = async () => {
      try {
        await setDoc(
          presenceRef,
          {
            lastSeen: Date.now(),
            userAgent: navigator.userAgent ? navigator.userAgent.substring(0, 50) : 'Web',
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Presence heartbeat error:', err);
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 15000);

    const handleUnload = () => {
      deleteDoc(presenceRef).catch(() => {});
    };
    window.addEventListener('beforeunload', handleUnload);

    const presenceColl = collection(db, 'presence');
    const unsubscribePresence = onSnapshot(
      presenceColl,
      (snapshot) => {
        const now = Date.now();
        let activeCount = 0;

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.lastSeen && now - data.lastSeen < 45000) {
            activeCount++;
          }
        });

        setLiveVisitors(Math.max(1, activeCount));
        setIsLiveConnected(true);
      },
      (err) => {
        console.warn('Live presence snapshot error:', err);
        setIsLiveConnected(false);
      }
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      deleteDoc(presenceRef).catch(() => {});
      unsubscribePresence();
    };
  }, []);

  useEffect(() => {
    const docId = isNexa ? 'nexa_downloads' : 'downloads';
    const statsRef = doc(db, 'stats', docId);

    setDoc(statsRef, { count: increment(0) }, { merge: true }).catch(() => {});

    const unsubscribeStats = onSnapshot(
      statsRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const dbCount = typeof data.count === 'number' ? data.count : 0;
          setDownloadCount(dbCount);
        }
      },
      (err) => {
        console.warn('Stats snapshot error:', err);
      }
    );

    return () => unsubscribeStats();
  }, [isNexa]);

  const bannerTitle = title || (isNexa ? 'Nexa Player Live Metrics' : 'Raqam Flow Live Metrics');
  const accentText = isNexa ? 'text-cyan-400' : 'text-emerald-400';

  return (
    <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <p className={`text-xs font-semibold ${accentText}`}>
            Real-Time Cloud Metrics
          </p>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {bannerTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Synchronized live via Firebase Cloud Firestore.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full md:w-auto">
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] px-5 py-4 flex items-center gap-3.5">
            <Users className={`w-5 h-5 ${accentText} shrink-0`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono tabular-nums text-2xl font-bold text-white">
                  {liveVisitors}
                </span>
                {isLiveConnected && (
                  <span className={`w-2 h-2 rounded-full ${isNexa ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
                )}
              </div>
              <div className="text-xs text-slate-400">Active Visitors</div>
            </div>
          </div>

          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] px-5 py-4 flex items-center gap-3.5">
            <Download className={`w-5 h-5 ${accentText} shrink-0`} />
            <div>
              <div className="font-mono tabular-nums text-2xl font-bold text-white">
                {downloadCount.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
