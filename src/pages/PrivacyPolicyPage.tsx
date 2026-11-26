import React from 'react';
import { Database, EyeOff, HardDrive } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

export default function PrivacyPolicyPage({ navigateTo }: { navigateTo: (page: Page) => void }) {
  const pillars = [
    {
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      title: 'Local Sandbox Storage',
      desc: 'Your records remain strictly inside your mobile device.',
    },
    {
      icon: <EyeOff className="w-5 h-5 text-teal-400" />,
      title: 'Zero Tracking & Tracing',
      desc: 'No advertising SDKs, telemetry, or background spying.',
    },
    {
      icon: <HardDrive className="w-5 h-5 text-cyan-400" />,
      title: 'Full User Ownership',
      desc: 'Encrypted backups go directly to your personal Google Drive.',
    },
  ];

  const clauses = [
    {
      num: '01.',
      title: 'Offline-First Architecture & Zero Centralized Collection',
      body: 'All accounting records, financial ledgers, customer transaction histories, daily cashbooks, and business documents created inside our applications are saved exclusively in a local database inside your mobile device sandbox. We do not operate central servers to copy, harvest, profile, or sell your personal or business information.',
    },
    {
      num: '02.',
      title: 'Direct Google Drive Cloud Backup (Zero Developer Access)',
      body: 'When cloud backup is enabled, the application communicates directly with Google servers via official OAuth 2.0 to store encrypted backups inside your personal Google Drive private app data folder. The developer has zero access to your Google account, credentials, or backup files.',
    },
    {
      num: '03.',
      title: 'Minimal & Transparent Device Permissions',
      bullets: [
        'Storage & Media Files: Used solely to index and play local audio/video files or export PDF statements and backup archives onto your device.',
        'Hardware Audio / Video Decoders: Utilizes local device hardware acceleration (HW+) for 4K/8K playback and 10-band DSP audio processing.',
        'Picture-in-Picture & Overlay: Enables floating video playback and lockscreen background audio controls.',
        'Contacts (Optional): Lets you select customer phone numbers for ledger SMS or WhatsApp reminders without manual typing.',
        'Camera (Optional): Used exclusively for scanning barcodes or attaching receipt photos locally.',
        'Bluetooth (Optional): Used to connect to compatible ESC/POS thermal receipt printers.',
      ],
    },
    {
      num: '04.',
      title: 'Complete Data Erasure & Control',
      body: 'Because you retain total custody of your data, you can permanently erase all records at any time by clearing application storage or uninstalling the app. You may also export complete statements at any time without fees or restrictions.',
    },
  ];

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <PageHeader
        kicker="Legal & Compliance"
        title="Privacy Policy"
        description="This Privacy Policy applies to all mobile applications, software tools, and digital services published by Muhammad Yousuf Noori (NooriTech)."
        breadcrumbLabel="Privacy Policy"
        navigateTo={navigateTo}
        metadata={['Last Updated: August 2026', '100% Offline-First Standard']}
      />

      {/* Privacy Pillars */}
      <div className="grid sm:grid-cols-3 gap-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-5 space-y-2.5"
          >
            {p.icon}
            <h2 className="text-sm font-bold text-white">{p.title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Policy Clauses */}
      <div className="space-y-5">
        {clauses.map((clause) => (
          <section
            key={clause.num}
            className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-3"
          >
            <h2 className="text-base sm:text-lg font-bold text-white">
              <span className="font-mono text-emerald-400 mr-2">{clause.num}</span>
              {clause.title}
            </h2>
            {clause.body && (
              <p className="text-sm text-slate-300 leading-relaxed">{clause.body}</p>
            )}
            {clause.bullets && (
              <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 leading-relaxed">
                {clause.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Privacy Office Contact & Account Deletion Link */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white">Developer Privacy Office</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            For privacy inquiries regarding any NooriTech application, contact Muhammad Yousuf Noori directly:
          </p>
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

        <button
          type="button"
          onClick={() => navigateTo('delete-account')}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Account &amp; Data Deletion →
        </button>
      </div>
    </div>
  );
}
