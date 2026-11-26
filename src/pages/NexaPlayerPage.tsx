import React, { useState } from 'react';
import {
  Download,
  Film,
  Volume2,
  Sliders,
  Subtitles,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Check,
  ExternalLink,
  Zap,
  Folder,
  ShieldCheck,
} from 'lucide-react';
import { NexaPlayerShowcase3D } from '../components/NexaPlayerShowcase3D';
import { trackApkDownload, LiveStatsBanner, useLiveDownloads } from '../components/LiveStatsBanner';
import { ReviewsSection, useAppReviewsStats } from '../components/ReviewsSection';
import { useVersionConfig } from '../lib/useVersionConfig';
import { Page } from '../types';

const NEXA_APK_URL =
  'https://www.dropbox.com/scl/fi/di72yn79zdpb7h3azdwml/NexaPlay-V1.1.0.apk?rlkey=60tbyy1ww3owmv3qw2hc91vcq&st=wdodpuac&dl=1';

interface NexaPlayerPageProps {
  navigateTo?: (page: Page) => void;
}

const FEATURES = [
  {
    number: '01.',
    title: '4K & 8K Ultra HD Playback Engine',
    urduTitle: '4K اور 8K الٹرا ایچ ڈی پلے بیک',
    description:
      'Hardware-accelerated decoding for MKV, MP4, AVI, MOV, FLV, TS, and WEBM video formats with smooth frame pacing.',
    icon: <Film className="w-5 h-5" />,
  },
  {
    number: '02.',
    title: 'Pro 10-Band Equalizer & Bass Boost',
    urduTitle: 'پرو ایکولائزر اور بیس بوسٹر',
    description:
      'Fine-tune 10 audio frequency bands with 3D Spatial Surround Sound, Bass Booster, and saved acoustic profiles.',
    icon: <Sliders className="w-5 h-5" />,
  },
  {
    number: '03.',
    title: 'Background Audio Playback Mode',
    urduTitle: 'بیک گراؤنڈ آڈیو موڈ',
    description:
      'Keep video soundtracks, podcasts, and lectures playing cleanly while switching apps or locking your screen.',
    icon: <Volume2 className="w-5 h-5" />,
  },
  {
    number: '04.',
    title: 'Auto Subtitle Finder & Custom Fonts',
    urduTitle: 'آٹو سب ٹائٹل ڈاؤن لوڈ اور اردو فونٹس',
    description:
      'Search and sync subtitles in Urdu, English, and Hindi with customizable font sizing, colors, and timing offsets.',
    icon: <Subtitles className="w-5 h-5" />,
  },
  {
    number: '05.',
    title: 'Floating Picture-in-Picture Window',
    urduTitle: 'فلوٹنگ پاپ اپ ویڈیو ونڈو',
    description:
      'Resize and float your video window on top of WhatsApp, browsers, or notes for effortless multitasking.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    number: '06.',
    title: 'Smart Touch & Swipe Gestures',
    urduTitle: 'سمارٹ والیم اور برائٹنس گیسچرز',
    description:
      'Swipe left for brightness, right for volume, and double-tap either side to skip 10 seconds instantaneously.',
    icon: <Volume2 className="w-5 h-5" />,
  },
];

const NEXA_FAQS = [
  {
    q: 'Is Nexa Player completely free with zero advertisements?',
    urduQ: 'کیا نیکسا پلیئر بغیر اشتہارات کے بالکل مفت ہے؟',
    a: 'Yes. Nexa Player Pro is 100% free with clean playback and zero pop-up or banner advertisements.',
  },
  {
    q: 'Does Nexa Player support 4K 60FPS and 8K video playback?',
    urduQ: 'کیا یہ 4K الٹرا ایچ ڈی ویڈیوز سپورٹ کرتا ہے؟',
    a: 'Yes. Nexa Player uses native hardware acceleration (HW and HW+) to decode high-bitrate 4K and 8K files smoothly.',
  },
  {
    q: 'How does the Background Audio Play feature work?',
    urduQ: 'بیک گراؤنڈ آڈیو پلے کیسے کام کرتا ہے؟',
    a: 'Enable Background Playback in settings or tap the background play icon. Audio continues seamlessly even when your screen is locked.',
  },
  {
    q: 'Can I download Urdu and English subtitles inside the app?',
    urduQ: 'کیا میں ایپ کے اندر سے سب ٹائٹلز ڈاؤن لوڈ کر سکتا ہوں؟',
    a: 'Yes. Nexa Player includes an integrated online subtitle downloader and synchronization tool.',
  },
];

export default function NexaPlayerPage({ navigateTo }: NexaPlayerPageProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const liveDownloads = useLiveDownloads('nexa-player');
  const nexaReviewStats = useAppReviewsStats('nexa-player');
  const { config: versionConfig } = useVersionConfig();

  const handleDownload = () => {
    setDownloading(true);
    trackApkDownload('nexa-player');

    const link = document.createElement('a');
    link.href = NEXA_APK_URL;
    link.download = `NexaPlay-V${versionConfig.version_name}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1200);
  };

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const technicalSpecs = [
    { label: 'Package Name', value: 'com.nooritech.nexaplayer' },
    { label: 'Latest Version', value: `v${versionConfig.version_name}` },
    { label: 'APK File Size', value: versionConfig.download_size },
    { label: 'Minimum Android', value: 'Android 7.0 (Nougat)+' },
    { label: 'Target SDK', value: 'Android 15 (SDK 35)' },
    { label: 'Publisher', value: 'Muhammad Yousuf Noori' },
  ];

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => navigateTo?.('apps')}
          className="hover:text-white transition-colors cursor-pointer font-medium"
        >
          NooriTech
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-400 font-medium">Nexa Player</span>
      </nav>

      {/* 1. Hero Section */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400/60 overflow-hidden bg-slate-950 shrink-0">
                <img
                  src="/nexa-player.jpg"
                  alt="Nexa Player Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-400">
                  Ultra HD Media Player · Pro Edition
                </p>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white leading-tight mt-0.5">
                  Nexa Player <span className="text-cyan-400">Pro</span>
                </h1>
                <p className="font-urdu text-lg text-cyan-300 font-semibold mt-0.5">
                  نیکسا پلیئر - ایچ ڈی ویڈیو اینڈ میڈیا پلیئر
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hardware-accelerated 4K &amp; 8K media player for Android featuring a 10-band studio audio equalizer, subtitle downloader, floating picture-in-picture window, and uninterrupted background audio playback.
            </p>

            {/* Clean 4-Metric Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <button
                type="button"
                onClick={scrollToReviews}
                className="rounded-xl bg-[#0e1624] border border-white/[0.06] hover:border-amber-400/40 p-3.5 text-left transition-colors cursor-pointer"
                title="View & post verified Nexa Player reviews"
              >
                <div className="flex items-center gap-1.5 font-mono tabular-nums text-lg font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>
                    {nexaReviewStats.totalReviews > 0
                      ? nexaReviewStats.rating.toFixed(1)
                      : '0.0'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {nexaReviewStats.totalReviews}{' '}
                  {nexaReviewStats.totalReviews === 1 ? 'Review' : 'Reviews'}
                </div>
              </button>

              <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-3.5 text-left">
                <div className="font-mono tabular-nums text-lg font-bold text-white">
                  {versionConfig.download_size}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">APK Size</div>
              </div>

              <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-3.5 text-left">
                <div className="font-mono tabular-nums text-lg font-bold text-cyan-400">
                  v{versionConfig.version_name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Latest Version</div>
              </div>

              <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-3.5 text-left">
                <div className="font-mono tabular-nums text-lg font-bold text-white">
                  {liveDownloads.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Downloads</div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm sm:text-base transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                <span>
                  {downloading
                    ? 'Preparing Download...'
                    : `Download Nexa Player APK (${versionConfig.download_size})`}
                </span>
              </button>

              {downloadSuccess && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Download started successfully</span>
                </span>
              )}
            </div>

            {/* Real Version & Size Sync Strip (Synced from /version.json) */}
            <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 text-left space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono tabular-nums">
                  <span className="font-sans font-semibold text-white">Release Sync:</span>
                  <span className="text-cyan-400 font-semibold">
                    v{versionConfig.version_name}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-300">{versionConfig.download_size}</span>
                </div>
                <a
                  href="/version.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:underline"
                >
                  <span>version.json</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-300">
                {versionConfig.highlights.map((h, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Preview Device */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-64 sm:w-72 rounded-[32px] bg-[#070b12] border border-white/15 p-3 shadow-2xl">
              <div className="rounded-[24px] bg-gradient-to-b from-[#0d1c2b] via-[#08111c] to-[#05080f] p-6 flex flex-col items-center text-center justify-between min-h-[340px]">
                <div className="w-16 h-16 rounded-full border-2 border-cyan-400/70 overflow-hidden mt-2">
                  <img
                    src="/nexa-player.jpg"
                    alt="Nexa Player"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 my-6">
                  <div className="text-base font-bold text-white">4K &amp; 8K Media Engine</div>
                  <div className="text-xs font-mono text-cyan-400">
                    v{versionConfig.version_name} · HW+ Ready
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    Smooth hardware decoding, 10-band equalizer, subtitle sync, and background playback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Download APK ({versionConfig.download_size})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 3D Showcase */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-10 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-semibold text-cyan-400">Interactive Preview</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Experience Nexa Player UI
          </h2>
          <p className="text-sm text-slate-400">
            Explore the live screens: 8K Video Engine, Audio Library, Theme Studio, Settings, and Recycle Bin.
          </p>
        </div>

        <NexaPlayerShowcase3D />
      </section>

      {/* 3. How to Install Nexa Player */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="text-xs font-semibold text-cyan-400 mb-1">Installation Guide</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How to install “Nexa Player Pro”
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">3 Simple Steps · Android 7.0+</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-cyan-400">Step 01</span>
              <h3 className="text-base font-bold text-white">Download Official APK</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Download the official Nexa Player APK package and tap it inside your device’s Downloads folder.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                <Folder className="w-3.5 h-3.5 text-cyan-400" />
                <span>Internal storage / Download</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="/nexa-player.jpg"
                    alt="Nexa Player APK"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      NexaPlay-V{versionConfig.version_name}.apk
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300">
                      {versionConfig.download_size}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-cyan-300 shrink-0 ml-2">
                  Tap APK
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-cyan-400">Step 02</span>
              <h3 className="text-base font-bold text-white">Tap “Install anyway”</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Because this APK is distributed directly from NooriTech, Play Protect may ask for confirmation. Tap{' '}
                <strong>Install anyway</strong> to proceed safely.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-4 flex items-center justify-center min-h-[124px]">
              <div className="w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3.5 text-slate-900 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>Google Play Protect</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  Tap <strong className="text-[#36528a]">Install anyway</strong> to continue installation.
                </div>
                <div className="w-full bg-[#36528a] text-white text-[11px] py-1.5 rounded-lg text-center font-semibold">
                  Install anyway
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-cyan-400">Step 03</span>
              <h3 className="text-base font-bold text-white">Launch Nexa Player</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tap <strong>Open</strong> once installation finishes and allow media permissions to index your videos.
              </p>
            </div>

            <div className="rounded-xl bg-[#070b12] border border-white/[0.08] p-4 flex items-center justify-center min-h-[124px]">
              <div className="w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3.5 text-slate-900 space-y-3">
                <div className="text-xs font-semibold">App installed.</div>
                <div className="flex items-center gap-2.5">
                  <img
                    src="/nexa-player.jpg"
                    alt="Nexa Player"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold">Nexa Player</span>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <span className="text-[11px] text-slate-600 px-2.5 py-1 rounded-md border border-slate-300">
                    Close
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

      {/* 4. Core Features */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <p className="text-xs font-semibold text-cyan-400 mb-1.5">Media Capabilities</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Choose Nexa Player Pro
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Built for crystal-clear high-bitrate video playback and customizable studio audio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.number}
              className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-cyan-400/35 p-6 space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  {f.icon}
                </div>
                <span className="text-xs font-mono text-slate-500">{f.number}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="font-urdu text-sm text-cyan-400 font-semibold mt-0.5">
                  {f.urduTitle}
                </p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APK Technical Specifications */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/[0.08] pb-5">
          <p className="text-xs font-semibold text-cyan-400 mb-1">Package Details</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            APK Technical Specifications
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicalSpecs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 space-y-1"
            >
              <span className="text-xs text-slate-400 block">{spec.label}</span>
              <span className="font-mono tabular-nums text-sm font-semibold text-white block truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 space-y-1">
          <span className="text-xs text-slate-400 block">SHA-256 Checksum</span>
          <span className="font-mono text-xs text-slate-300 break-all block">
            e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </span>
        </div>
      </section>

      {/* 6. Nexa Player FAQ */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <p className="text-xs font-semibold text-cyan-400 mb-1">Questions &amp; Answers</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nexa Player FAQ
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo?.('faq')}
            className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
          >
            View All FAQs →
          </button>
        </div>

        <div className="divide-y divide-white/[0.07]">
          {NEXA_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white">{faq.q}</div>
                    <div className="font-urdu text-xs text-cyan-400 font-semibold mt-0.5">
                      {faq.urduQ}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed pr-8">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Dedicated Community Reviews for Nexa Player Pro */}
      <div id="reviews-section" className="scroll-mt-24">
        <ReviewsSection appId="nexa-player" appName="Nexa Player Pro" themeColor="cyan" />
      </div>

      {/* 8. Real-Time Live Stats */}
      <LiveStatsBanner appId="nexa-player" theme="cyan" />
    </div>
  );
}
