import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  EyeOff, 
  HardDrive, 
  FileText, 
  Scale, 
  Copyright, 
  Sparkles, 
  Mail, 
  MessageCircle, 
  Globe, 
  CheckCircle,
  ArrowLeft,
  Cookie,
  AlertTriangle,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { AdsterraNativeAd } from './AdsterraNativeAd';

interface UniversalLegalProps {
  type: 'privacy' | 'terms' | 'cookie-policy';
  onNavigateHome: () => void;
}

function ApkPureLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 12L15 82H33L50 48L67 82H85L50 12Z" fill="#14C963"/>
      <path d="M50 32L32 68H42L50 52L58 68H68L50 32Z" fill="#00E676"/>
      <polygon points="50,52 42,68 58,68" fill="#B9F6CA"/>
      <polygon points="68,72 75,85 61,85" fill="#14C963"/>
    </svg>
  );
}

export function UniversalLegalSection({ type, onNavigateHome }: UniversalLegalProps) {
  if (type === 'privacy') {
    return <PrivacyPolicyView onNavigateHome={onNavigateHome} />;
  }
  if (type === 'terms') {
    return <TermsView onNavigateHome={onNavigateHome} />;
  }
  return <CookiePolicyView onNavigateHome={onNavigateHome} />;
}

/* ========================================================
    1. PRIVACY POLICY VIEW (NO SPECIFIC APP NAME & NO URDU TEXT)
======================================================== */
function PrivacyPolicyView({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 shadow-2xl mb-8 overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                NooriTech Applications & Services
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Privacy Policy
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This Privacy Policy applies to all mobile applications, software tools, and digital services published by <strong>Muhammad Yousuf Noori (NooriTech)</strong>. We build offline-first, privacy-respecting software with zero tracking, zero tracing, and 100% user data ownership.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>Last Updated: August 2026</span>
            <span className="font-mono text-emerald-500 font-bold">100% Offline-First Architecture</span>
          </div>
        </div>
      </div>

      {/* Core Privacy Pillars */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <Database className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">Local Sandbox Storage</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Your data never leaves your personal phone</div>
        </div>
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center">
          <EyeOff className="w-6 h-6 text-teal-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">Zero Tracking & Tracing</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">No telemetry, ad trackers, or background spying</div>
        </div>
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
          <HardDrive className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">Full User Ownership</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Direct backup to your own personal Google Drive</div>
        </div>
      </div>

      {/* Detailed Policy Articles */}
      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
            <span>Offline-First Architecture & Zero Centralized Collection</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All accounting records, financial ledgers, customer transaction histories, daily cashbooks, and business documents created inside our applications are saved exclusively in an encrypted local database inside your mobile device's sandbox storage. We do not operate central servers to copy, harvest, profile, or sell your business or financial information.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
            <span>Direct Google Drive Cloud Backup (Zero Developer Access)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            When cloud backup is enabled, the application communicates directly with Google's servers via OAuth 2.0 to store encrypted backups in your personal Google Drive account's private app data folder. The developer has zero access to your Google account, credentials, or backup files.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
            <span>Minimal & Transparent Device Permissions</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 text-slate-600 dark:text-slate-300">
            <li><strong>Storage / Media Files:</strong> Used solely to index, play local audio/video files (in Nexa Player) and export PDF statements or backup archives (in Raqam Flow) onto your phone without remote transmission.</li>
            <li><strong>Audio / Video Decoders:</strong> Utilizes local device hardware acceleration (HW+) for high-definition 4K/8K rendering and 10-band DSP audio filtering.</li>
            <li><strong>Picture-in-Picture & Overlay:</strong> Enables floating video window playback and lockscreen background media controls.</li>
            <li><strong>Contacts (Optional):</strong> Allows quick selection of customer phone numbers for ledger SMS/WhatsApp reminders without manual re-typing.</li>
            <li><strong>Camera (Optional):</strong> Used exclusively for real-time barcode scanning or attaching receipt photos locally.</li>
            <li><strong>Bluetooth (Optional):</strong> Required for connecting to ESC/POS thermal receipt printers.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-purple-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
            <span>Complete Data Erasure & Control</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Because you retain total custody of your data, you can permanently delete all records at any time by clearing application data or uninstalling the app. You can also export full reports at any time without fees or restrictions.
          </p>
        </div>

        {/* Contact Desk */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Developer Privacy Office</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
            For privacy inquiries regarding any of our applications, contact Muhammad Yousuf Noori directly:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <a href="mailto:yousufnoor469@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              📧 yousufnoor469@gmail.com
            </a>
            <a href="https://wa.me/923022827364" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              💬 WhatsApp: +92 302 2827364
            </a>
          </div>
        </div>

        {/* Sponsored Native Banner Ad */}
        <div className="pt-4">
          <AdsterraNativeAd />
        </div>
      </div>
    </div>
  );
}

/* ========================================================
    2. TERMS & CONDITIONS VIEW (NO SPECIFIC APP NAME & NO URDU TEXT)
======================================================== */
function TermsView({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-amber-500/40 shadow-2xl mb-8 overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                NooriTech Applications & Services
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Terms & Conditions
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            These Terms and Conditions govern the download, installation, and usage of all mobile software applications and digital products created by <strong>Muhammad Yousuf Noori (NooriTech)</strong>.
          </p>
        </div>
      </div>

      {/* High-Impact RED Legal Warning Notice */}
      <div className="relative group rounded-2xl p-[1.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-[0_0_30px_rgba(239,68,68,0.35)] mb-8 overflow-hidden">
        <div className="bg-slate-950/95 backdrop-blur-2xl rounded-[15px] p-5 sm:p-6 relative overflow-hidden border border-red-500/50">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-black text-xs sm:text-sm uppercase tracking-wider">
                CRITICAL LEGAL & COPYRIGHT WARNING
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-red-100 font-bold leading-relaxed tracking-wide">
            "EVERY SINGLE FUNCTION, FEATURE OPTION, AND CODE STRUCTURE ACROSS ALL APPLICATIONS IN THIS PORTFOLIO IS STRICTLY REGISTERED & COPYRIGHT PROTECTED. ANY UNAUTHORIZED TAMPERING, CLONING, DECOMPILATION, OR REPRODUCTION WILL IMMEDIATELY TRIGGER STRICT LEGAL ACTION."
          </p>
        </div>
      </div>

      {/* Detailed Articles */}
      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
            <span>License Grant & Personal / Commercial Usage</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You are granted a non-exclusive, non-transferable license to install and use our applications on your personal or business mobile devices strictly for lawful accounting, bookkeeping, high-definition media playback, and utility management.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
            <span>Zero Surveillance & Privacy Commitment</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All our applications strictly adhere to a zero-tracking, zero-tracing standard. We do not inspect, log, or track your activity or financial transactions. Your data is strictly yours.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
            <span>Intellectual Property, Anti-Cloning & Exclusive Distribution Clause</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            All original source code, compiled binaries, APK installer packages, visual UI designs, logos, graphics, icons, and database structures remain the exclusive intellectual property of Muhammad Yousuf Noori. Decompilation, disassembly, reverse engineering, unauthorized white-labeling, or re-publishing modified APKs on third-party stores is strictly prohibited.
          </p>
          <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-semibold mb-4">
            🚫 <strong>Exclusive Distribution Restriction:</strong> These applications are distributed exclusively through our official website and authorized official app downloading platforms. No third-party store, website, or digital platform is permitted to host, mirror, re-publish, or distribute these applications without explicit prior written permission from Muhammad Yousuf Noori.
          </div>

          {/* Subheading: Our Official App Publisher */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
              <span>Our Official App Publisher</span>
            </h3>
            <a
              href="https://apkpure.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 hover:from-emerald-500/20 hover:to-teal-500/15 border border-emerald-500/30 text-slate-900 dark:text-white font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer shadow-sm group"
            >
              {/* Circular Logo Container */}
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:bg-emerald-500/30 transition-colors">
                <ApkPureLogo className="w-6 h-6" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2.5">
                <span className="font-black text-base tracking-tight text-slate-900 dark:text-white">APKPure</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-block w-fit">
                  Official Publisher
                </span>
              </div>

              <ExternalLink className="w-4 h-4 ml-auto text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
            <span>User Backup Responsibility & Disclaimer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Because all applications operate on an offline-first architecture where data is stored solely on your physical device, the developer is not liable for data loss arising from physical device damage, phone resets, forgotten PIN security locks, or manual uninstallation without taking cloud or local backups.
          </p>
        </div>

        {/* Contact info */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-transparent border border-amber-500/30">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Legal Support & Official Representation</h3>
          <div className="flex flex-wrap gap-4 text-xs font-mono mt-2">
            <a href="mailto:yousufnoor469@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              📧 yousufnoor469@gmail.com
            </a>
            <a href="https://wa.me/923022827364" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              💬 WhatsApp: +92 302 2827364
            </a>
          </div>
        </div>

        {/* Sponsored Native Banner Ad */}
        <div className="pt-4">
          <AdsterraNativeAd />
        </div>
      </div>
    </div>
  );
}

/* ========================================================
    3. COOKIE POLICY VIEW (NO SPECIFIC APP NAME & NO URDU TEXT)
======================================================== */
function CookiePolicyView({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-emerald-500/40 shadow-2xl mb-8 overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-500">
              <Cookie className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                NooriTech Applications & Services
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Cookie Policy
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This Cookie Policy explains how cookies and browser storage are handled across our official website portfolio and mobile application suite developed by <strong>Muhammad Yousuf Noori (NooriTech)</strong>.
          </p>
        </div>
      </div>

      {/* Core Policy Highlights */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
          <EyeOff className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">Zero Tracking Cookies</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">No ad-networks or cross-site tracking</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <Lock className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">Essential Preference Only</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Only local dark/light theme setting stored</div>
        </div>
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center">
          <ShieldCheck className="w-6 h-6 text-teal-500 mx-auto mb-2" />
          <div className="font-bold text-xs text-slate-900 dark:text-white">No Third-Party Analytics</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">No Google Analytics or Facebook Pixels</div>
        </div>
      </div>

      {/* Detailed Articles */}
      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
            <span>What Are Cookies?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cookies are small text files placed on your browser or device by websites you visit. They are commonly used to make websites work efficiently, remember your preferences, or deliver targeted advertising.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
            <span>Our Strict No-Tracking Cookie Policy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We operate on a strict privacy-first principle: <strong>We do NOT use advertising cookies, profiling cookies, behavior-tracking cookies, or third-party marketing pixels</strong> anywhere on our website or inside our applications.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
            <span>Functional Local Storage Usage</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our web pages only utilize basic browser LocalStorage to remember your user interface preference (such as Dark Mode vs Light Mode). This data is strictly stored locally on your device and is never transmitted to any external server.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-purple-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
            <span>How to Control Browser Storage</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You can clear or block LocalStorage and cookies at any time through your web browser's security settings. Because we do not rely on tracking cookies, disabling cookies will not affect your browsing experience on our portfolio site.
          </p>
        </div>

        {/* Contact info */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-transparent border border-cyan-500/30">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Cookie & Privacy Contact</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
            If you have questions regarding our Cookie Policy, reach out directly:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <a href="mailto:yousufnoor469@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              📧 yousufnoor469@gmail.com
            </a>
            <a href="https://wa.me/923022827364" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              💬 WhatsApp: +92 302 2827364
            </a>
          </div>
        </div>

        {/* Sponsored Native Banner Ad */}
        <div className="pt-4">
          <AdsterraNativeAd />
        </div>
      </div>
    </div>
  );
}
