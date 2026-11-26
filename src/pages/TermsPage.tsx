import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

function ApkPureLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 12L15 82H33L50 48L67 82H85L50 12Z" fill="#14C963" />
      <path d="M50 32L32 68H42L50 52L58 68H68L50 32Z" fill="#00E676" />
      <polygon points="50,52 42,68 58,68" fill="#B9F6CA" />
      <polygon points="68,72 75,85 61,85" fill="#14C963" />
    </svg>
  );
}

export default function TermsPage({ navigateTo }: { navigateTo: (page: Page) => void }) {
  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <PageHeader
        kicker="Legal & Compliance"
        title="Terms & Conditions"
        description="These Terms and Conditions govern the download, installation, and usage of all mobile software applications and digital products published by Muhammad Yousuf Noori (NooriTech)."
        breadcrumbLabel="Terms & Conditions"
        accent="amber"
        navigateTo={navigateTo}
        metadata={['NooriTech Portfolio', 'Copyright Protected']}
      />

      {/* Copyright Protection Notice */}
      <div className="rounded-2xl bg-rose-950/35 border border-rose-500/35 p-6 space-y-3">
        <div className="flex items-center gap-2.5 text-rose-400">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold tracking-wide uppercase">
            Legal &amp; Copyright Protection Notice
          </span>
        </div>
        <p className="text-sm text-rose-100 font-medium leading-relaxed">
          Every function, feature, visual asset, and source code structure across all NooriTech applications is copyright protected. Unauthorized tampering, cloning, decompilation, or unauthorized redistribution is strictly prohibited and subject to legal action.
        </p>
      </div>

      {/* Clauses */}
      <div className="space-y-5">
        <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">
            <span className="font-mono text-amber-400 mr-2">01.</span>
            License Grant &amp; Personal / Commercial Usage
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            You are granted a non-exclusive, non-transferable license to install and use our applications on your personal or business mobile devices strictly for lawful accounting, bookkeeping, high-definition media playback, and utility management.
          </p>
        </section>

        <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">
            <span className="font-mono text-amber-400 mr-2">02.</span>
            Zero Surveillance &amp; Privacy Commitment
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            All NooriTech applications adhere to a zero-tracking, zero-tracing standard. We do not inspect, log, or monitor your private business transactions or personal files.
          </p>
        </section>

        <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white">
            <span className="font-mono text-amber-400 mr-2">03.</span>
            Intellectual Property &amp; Exclusive Distribution
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            All original source code, compiled binaries, APK packages, UI layouts, logos, icons, and database schemas remain the exclusive intellectual property of Muhammad Yousuf Noori. Reverse engineering, white-labeling, or republishing modified APKs on unauthorized third-party websites is prohibited without written consent.
          </p>

          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-400">Authorized Official Publisher</p>
            <a
              href="https://apkpure.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 text-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ApkPureLogo className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white leading-tight">APKPure</div>
                <div className="text-xs text-emerald-400">Official Publisher Partner</div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

        <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">
            <span className="font-mono text-amber-400 mr-2">04.</span>
            User Backup Responsibility &amp; Disclaimer
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Because NooriTech applications run offline-first with data saved solely on your physical device, the developer is not liable for data loss caused by physical device damage, factory resets, forgotten PIN codes, or uninstallation without prior cloud or local backup.
          </p>
        </section>
      </div>

      {/* Legal Contact */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 space-y-2">
        <h3 className="text-sm font-bold text-white">Legal Support &amp; Representation</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono pt-1">
          <a href="mailto:yousufnoor469@gmail.com" className="text-emerald-400 hover:underline">
            yousufnoor469@gmail.com
          </a>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <a
            href="https://wa.me/923022827364"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            WhatsApp: +92 302 2827364
          </a>
        </div>
      </div>
    </div>
  );
}
