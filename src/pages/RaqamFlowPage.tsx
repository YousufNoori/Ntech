import React, { Suspense, lazy, useState } from 'react';
import {
  Download,
  BookOpen,
  Banknote,
  MessageCircle,
  Smartphone,
  Cloud,
  Globe,
  ShieldCheck,
  FileText,
  Check,
  Folder,
  Star,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { LiveStatsBanner, trackApkDownload, useLiveDownloads } from '../components/LiveStatsBanner';
import { ReviewsSection, useAppReviewsStats } from '../components/ReviewsSection';
import { useLiveApkSize } from '../lib/useLiveApkSize';
import { Page } from '../types';

const PhoneShowcase3D = lazy(() =>
  import('../components/PhoneShowcase3D').then((m) => ({ default: m.PhoneShowcase3D }))
);

const RAQAM_APK_URL =
  'https://www.dropbox.com/scl/fi/ohi3izn66uu6jtt6vss6q/Raqam-Flow.apk?rlkey=mda3boiif0epvj8rain9mcuuf&st=sw60ry1k&dl=1';

const FEATURES = [
  {
    number: '01.',
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Dokandar & Customer Khata',
    desc: 'Maintain separate ledgers for customers and suppliers with clear records of Maine Diye and Mujhe Mile.',
    bullets: ['Separate Customer & Supplier books', 'Exact timestamps & running balances'],
  },
  {
    number: '02.',
    icon: <Banknote className="w-5 h-5" />,
    title: 'Daily Cashbook (Roznamcha)',
    desc: 'Track daily cash in and cash out in seconds to view net profits, expenses, and closing drawer balance.',
    bullets: ['Instant Cash In / Cash Out totals', 'Real-time daily closing balance'],
  },
  {
    number: '03.',
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'WhatsApp & SMS Reminders',
    desc: 'Send clear payment reminder messages and balance summaries directly via WhatsApp or SMS in one tap.',
    bullets: ['1-tap WhatsApp bill share', 'Direct SMS payment reminders'],
  },
  {
    number: '04.',
    icon: <Smartphone className="w-5 h-5" />,
    title: '100% Offline Local Storage',
    desc: 'Every transaction saves instantaneously to a fast on-device SQLite database without requiring internet.',
    bullets: ['Sub-2ms local write speed', 'Works during load shedding & outages'],
  },
  {
    number: '05.',
    icon: <Cloud className="w-5 h-5" />,
    title: 'Google Drive Cloud Backup',
    desc: 'Back up encrypted accounting records directly to your personal Google Drive via official OAuth 2.0.',
    bullets: ['Stored in your private Drive folder', '1-click restore on a new phone'],
  },
  {
    number: '06.',
    icon: <Globe className="w-5 h-5" />,
    title: '9+ Languages Supported',
    desc: 'Switch seamlessly between Urdu, Roman Urdu, English, Pashto, Sindhi, Arabic, Persian, Turkish, and French.',
    bullets: ['Full Urdu & Roman Urdu support', 'Regional Pakistani language support'],
  },
  {
    number: '07.',
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'PIN & Biometric Security',
    desc: 'Protect sensitive shop records with a 4-digit security PIN and native Android fingerprint unlock.',
    bullets: ['Fingerprint & 4-digit PIN lock', 'Sandboxed local data encryption'],
  },
  {
    number: '08.',
    icon: <FileText className="w-5 h-5" />,
    title: 'PDF & Business Reports',
    desc: 'Export clean printable PDF statements and date-range financial summaries for customers or accountants.',
    bullets: ['Printable PDF statements', 'Custom date-range filters'],
  },
];

const RAQAM_FAQS = [
  {
    q: 'Is my shop cash book and credit ledger data stored on an external server?',
    a: 'No. All ledger accounts, customer entries, and daily cash records are stored locally on your phone using an isolated Room SQLite database. We do not harvest or sell your financial data.',
  },
  {
    q: 'How secure is the Google Drive Cloud Backup feature?',
    a: 'It uses official Google OAuth 2.0 to connect directly to your personal Google Drive private app data folder. Only you can access or restore your encrypted backup files.',
  },
  {
    q: 'Can I print or share customer transaction statements?',
    a: 'Yes. Raqam Flow generates formatted PDF invoices and customer ledger statements that you can share via WhatsApp, email, or print directly.',
  },
  {
    q: 'What happens if I change or lose my phone?',
    a: 'Install Raqam Flow on your new Android phone, sign in to the same Google account you backed up with, and tap Restore Backup to recover all your ledgers.',
  },
];

export default function RaqamFlowPage({ navigateTo }: { navigateTo: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { sizeStr: raqamLiveSize } = useLiveApkSize(RAQAM_APK_URL, 35465412);
  const liveDownloads = useLiveDownloads('raqam-flow');
  const reviewStats = useAppReviewsStats('raqam-flow');

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => navigateTo('apps')}
          className="hover:text-white transition-colors cursor-pointer font-medium"
        >
          NooriTech
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-emerald-400 font-medium">Raqam Flow</span>
      </nav>

      {/* 1. Hero Split Section */}
      <section className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <img
              src="/logo.png"
              alt="Raqam Flow Logo"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-2xl border border-white/15 bg-slate-950 object-cover"
            />
            <div className="text-left">
              <p className="text-xs font-semibold text-emerald-400">
                Offline Digital Ledger · Flagship Android App
              </p>
              <p className="font-urdu text-sm text-slate-300 font-semibold">
                رقم فلو - آپ کا اپنا ڈیجیٹل کھاتہ
              </p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            Aap Ka Apna Smart{' '}
            <span className="text-emerald-400">Digital Khata</span> &amp; Expense Manager
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Manage daily udhar, track customer ledgers, reconcile your cashbook, and protect business records with automatic Google Drive cloud backup.
          </p>

          {/* Clean Metadata Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs font-mono tabular-nums text-slate-300 pt-1">
            <span>v1.0.0</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>{raqamLiveSize} APK</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>{liveDownloads.toLocaleString()} Downloads</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToReviews}
              className="inline-flex items-center gap-1 text-amber-400 hover:underline cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>
                {reviewStats.rating.toFixed(1)} ({reviewStats.totalReviews} Reviews)
              </span>
            </button>
          </div>

          {/* Primary CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href={RAQAM_APK_URL}
              download="Raqam-Flow.apk"
              onClick={() => trackApkDownload('raqam-flow')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-colors whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              <span>Download Raqam Flow ({raqamLiveSize})</span>
            </a>

            <button
              type="button"
              onClick={scrollToReviews}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Read Reviews</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Phone Showcase */}
        <div className="lg:col-span-6 flex justify-center w-full min-h-[420px]">
          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <PhoneShowcase3D />
          </Suspense>
        </div>
      </section>

      {/* 2. Core Features Grid */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-1.5">
              Capabilities &amp; Workflow
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Core Features
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Built for Pakistani shopkeepers, wholesalers, and retail teams needing reliable daily accounting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feat) => (
            <div
              key={feat.number}
              className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-emerald-400/35 p-6 flex flex-col justify-between gap-5 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{feat.number}</span>
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                {feat.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How to Install Raqam Flow APK */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-1">Installation Guide</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How to install “Raqam Flow — Aap Ka Apna Digital Khata”
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">3 Simple Steps · Android 7.0+</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-400">Step 01</span>
              <h3 className="text-base font-bold text-white">Download Official APK</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tap the Download Raqam Flow button above and open the downloaded APK file from your phone’s Downloads folder.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <Folder className="w-3.5 h-3.5 text-emerald-400" />
                  Internal storage / Download
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="/logo.png"
                    alt="Raqam Flow APK"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Raqam-Flow-Khata.apk
                    </div>
                    <div className="text-[10px] font-mono text-emerald-300">{raqamLiveSize}</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-300 shrink-0 ml-2">
                  Tap APK
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-400">Step 02</span>
              <h3 className="text-base font-bold text-white">Allow Installation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                If Android prompts for unknown apps, open <strong>Settings</strong> and enable{' '}
                <strong>Allow from this source</strong>, or tap <strong>Install anyway</strong>.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-4 flex items-center justify-center min-h-[124px]">
              <div className="w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3.5 text-slate-900">
                <div className="text-xs font-bold mb-1">Install unknown app?</div>
                <div className="text-[11px] text-slate-600 mb-3">
                  Allow your browser to install verified APK files.
                </div>
                <div className="w-full bg-[#36528a] text-white text-[11px] py-1.5 rounded-lg text-center font-semibold">
                  Allow &amp; Continue
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-400">Step 03</span>
              <h3 className="text-base font-bold text-white">Open Raqam Flow</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Once installation finishes, tap <strong>Open</strong> to launch your digital khata immediately.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-4 flex items-center justify-center min-h-[124px]">
              <div className="w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3.5 text-slate-900 space-y-3">
                <div className="text-xs font-semibold">App installed.</div>
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="Raqam Flow"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-bold">Raqam Flow</span>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <span className="text-[11px] text-slate-600 px-2.5 py-1 rounded-md border border-slate-300">
                    Done
                  </span>
                  <span className="text-[11px] bg-[#36528a] text-white px-3 py-1 rounded-md font-semibold">
                    Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Community Reviews */}
      <div id="reviews-section" className="scroll-mt-24">
        <ReviewsSection appId="raqam-flow" appName="Raqam Flow" themeColor="emerald" />
      </div>

      {/* 5. Raqam Flow FAQ */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-1">Questions &amp; Answers</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Raqam Flow FAQ
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('faq')}
            className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
          >
            View All FAQs →
          </button>
        </div>

        <div className="divide-y divide-white/[0.07]">
          {RAQAM_FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed pr-8">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Live Metrics */}
      <LiveStatsBanner appId="raqam-flow" theme="emerald" />
    </div>
  );
}
