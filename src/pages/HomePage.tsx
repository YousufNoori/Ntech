import React, { useState } from 'react';
import {
  Search,
  Star,
  ArrowRight,
  Download,
  Check,
  X,
  BookOpen,
  HelpCircle,
  Info,
  Map,
  ShieldCheck,
  FileText,
  Printer,
  Boxes,
} from 'lucide-react';
import { Page } from '../types';
import { trackApkDownload, useLiveDownloads } from '../components/LiveStatsBanner';
import { useAppReviewsStats } from '../components/ReviewsSection';
import { useLiveApkSize } from '../lib/useLiveApkSize';
import { useVersionConfig } from '../lib/useVersionConfig';

const NEXA_APK_URL =
  'https://www.dropbox.com/scl/fi/di72yn79zdpb7h3azdwml/NexaPlay-V1.1.0.apk?rlkey=60tbyy1ww3owmv3qw2hc91vcq&st=wdodpuac&dl=1';
const RAQAM_APK_URL =
  'https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

type CategoryFilter = 'All' | 'Finance & Accounting' | 'Media & Utilities';

export default function HomePage({ navigateTo }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const raqamDownloads = useLiveDownloads('raqam-flow');
  const nexaDownloads = useLiveDownloads('nexa-player');
  const { config: nexaConfig } = useVersionConfig();
  const { sizeStr: raqamLiveSize } = useLiveApkSize(RAQAM_APK_URL, 35465412);
  const raqamReviewStats = useAppReviewsStats('raqam-flow');
  const nexaReviewStats = useAppReviewsStats('nexa-player');

  const apps = [
    {
      id: 'raqam-flow' as const,
      route: 'raqam-flow' as Page,
      name: 'Raqam Flow',
      subtitle: 'Digital Khata & Cashbook',
      urduName: 'رقم فلو - آپ کا اپنا ڈیجیٹل کھاتہ',
      category: 'Finance & Accounting' as const,
      accent: 'emerald' as const,
      version: '1.0.0',
      size: raqamLiveSize,
      downloads: raqamDownloads,
      rating: raqamReviewStats.rating,
      totalReviews: raqamReviewStats.totalReviews,
      icon: '/logo.png',
      iconShape: 'rounded-2xl',
      description:
        'Offline-first digital ledger, customer udhar tracking, daily cash book, printable PDF statements, and encrypted Google Drive backup built for retail merchants.',
      highlights: [
        '100% offline SQLite ledger with sub-2ms speed',
        'Automatic encrypted Google Drive cloud backup',
        '1-tap WhatsApp payment reminders & PDF bills',
        'PIN code & biometric fingerprint lock',
      ],
      downloadUrl: RAQAM_APK_URL,
      apkFilename: 'Raqam-Flow-Digital-Khata.apk',
    },
    {
      id: 'nexa-player' as const,
      route: 'nexa-player' as Page,
      name: 'Nexa Player Pro',
      subtitle: '4K & 8K HD Media Player',
      urduName: 'نیکسا پلیئر - ایچ ڈی ویڈیو اینڈ میڈیا پلیئر',
      category: 'Media & Utilities' as const,
      accent: 'cyan' as const,
      version: nexaConfig.version_name,
      size: nexaConfig.download_size,
      downloads: nexaDownloads,
      rating: nexaReviewStats.totalReviews > 0 ? nexaReviewStats.rating : 0.0,
      totalReviews: nexaReviewStats.totalReviews,
      icon: '/nexa-player.jpg',
      iconShape: 'rounded-full',
      description:
        'Hardware-accelerated 4K & 8K video and music player with a 10-band studio equalizer, bass boost, floating picture-in-picture mode, and subtitle sync.',
      highlights: [
        '4K & 8K Ultra HD hardware-accelerated playback',
        '10-band audio equalizer, bass boost & 3D reverb',
        'Floating Picture-in-Picture & background audio',
        'Auto subtitle finder & gesture controls',
      ],
      downloadUrl: NEXA_APK_URL,
      apkFilename: `NexaPlay-V${nexaConfig.version_name}.apk`,
    },
  ];

  const categories: CategoryFilter[] = ['All', 'Finance & Accounting', 'Media & Utilities'];

  const filteredApps = apps.filter((app) => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.subtitle.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.urduName.includes(searchQuery.trim());
    return matchesCategory && matchesSearch;
  });

  const handleOpenReviews = (e: React.MouseEvent, route: Page) => {
    e.stopPropagation();
    navigateTo(route);
    setTimeout(() => {
      const el = document.getElementById('reviews-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  const handleDirectDownload = (
    e: React.MouseEvent,
    appId: 'raqam-flow' | 'nexa-player',
    url: string,
    filename: string
  ) => {
    e.stopPropagation();
    trackApkDownload(appId);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pillars = [
    {
      num: '01.',
      title: 'Offline-First Speed',
      metric: '< 2ms SQLite WAL',
      desc: 'All transactions and local media indexing run directly on your device with zero server wait times and uninterrupted operation without internet.',
    },
    {
      num: '02.',
      title: 'Zero-Tracking Privacy',
      metric: '0 Ad Trackers',
      desc: 'No advertising SDKs, no hidden telemetry, and no third-party data harvesting. Your business ledgers and media remain strictly on your device.',
    },
    {
      num: '03.',
      title: 'Hardware Acceleration',
      metric: '60 FPS HW+ Core',
      desc: 'Engineered with native Android Jetpack and GPU video decoding for smooth 8K playback, responsive layouts, and low battery usage.',
    },
    {
      num: '04.',
      title: 'Private Cloud Backup',
      metric: 'Google OAuth 2.0',
      desc: 'Optional 1-tap encrypted backups directly to your personal Google Drive account. Only you hold access to your files.',
    },
  ];

  const quickDirectory: {
    page: Page;
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      page: 'blogs',
      title: 'Engineering Blogs',
      desc: 'Architecture guides & tutorials',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
    },
    {
      page: 'help-center',
      title: 'Help Center',
      desc: 'Step-by-step setup walkthroughs',
      icon: <HelpCircle className="w-4 h-4 text-cyan-400" />,
    },
    {
      page: 'faq',
      title: 'FAQ',
      desc: 'Answers for Raqam Flow & Nexa',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
    },
    {
      page: 'about',
      title: 'About NooriTech',
      desc: 'Founder profile & vision',
      icon: <Info className="w-4 h-4 text-emerald-400" />,
    },
    {
      page: 'privacy',
      title: 'Privacy Policy',
      desc: 'Offline data & security commitment',
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
    },
    {
      page: 'sitemap',
      title: 'Visual Site Map',
      desc: 'All 12 standalone pages index',
      icon: <Map className="w-4 h-4 text-slate-300" />,
    },
  ];

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20">
      {/* 1. Editorial Hero & Search Control */}
      <section className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold text-emerald-400 tracking-wide">
              Official Android Software Studio · Muhammad Yousuf Noori
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] text-white leading-[1.08]">
              Fast, offline-first Android apps built for everyday clarity.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Download verified, ad-free Android applications directly from NooriTech—from digital shop accounting with Raqam Flow to 8K hardware-accelerated media playback with Nexa Player Pro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('raqam-flow')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Open Raqam Flow
            </button>
            <button
              type="button"
              onClick={() => navigateTo('nexa-player')}
              className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Open Nexa Player
            </button>
          </div>
        </div>

        {/* Search & Segmented Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b111c] border border-white/[0.08] overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Raqam Flow, Nexa Player, khata..."
              aria-label="Search NooriTech applications"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0b111c] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Flagship Applications Grid */}
      <section aria-label="Official Applications" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Official Applications
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select any app to open its dedicated page, live preview, and verified APK download.
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-mono tabular-nums text-slate-500">
            {filteredApps.length} {filteredApps.length === 1 ? 'Application' : 'Applications'}
          </span>
        </div>

        {filteredApps.length === 0 ? (
          <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-12 text-center space-y-3">
            <p className="text-base font-semibold text-white">No matching applications found</p>
            <p className="text-sm text-slate-400">
              Try a different keyword or reset the active category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {filteredApps.map((app) => {
              const isCyan = app.accent === 'cyan';
              const accentText = isCyan ? 'text-cyan-400' : 'text-emerald-400';
              const hoverBorder = isCyan
                ? 'hover:border-cyan-400/40'
                : 'hover:border-emerald-400/40';
              const primaryBtn = isCyan
                ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950';

              return (
                <article
                  key={app.id}
                  onClick={() => navigateTo(app.route)}
                  className={`group rounded-2xl bg-[#0b111c] border border-white/[0.08] ${hoverBorder} p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer`}
                >
                  <div className="space-y-6">
                    {/* Top Row: Icon & Titles */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 sm:w-18 sm:h-18 ${app.iconShape} overflow-hidden border border-white/15 bg-slate-950 shrink-0`}
                      >
                        <img
                          src={app.icon}
                          alt={app.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 mb-1">
                          <span className={`font-semibold ${accentText}`}>{app.category}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="font-mono tabular-nums">v{app.version}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="font-mono tabular-nums">{app.size}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-slate-100">
                          {app.name}
                        </h3>
                        <p className={`font-urdu text-base font-semibold ${accentText} mt-0.5`}>
                          {app.urduName}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {app.description}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-2 pt-1">
                      {app.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className={`w-4 h-4 ${accentText} shrink-0 mt-0.5`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Strip & Actions */}
                  <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-5">
                    <div className="grid grid-cols-3 gap-4 text-left">
                      <button
                        type="button"
                        onClick={(e) => handleOpenReviews(e, app.route)}
                        className="text-left group/rate cursor-pointer focus-visible:outline-none"
                        title={`View ${app.name} community reviews`}
                      >
                        <div className="flex items-center gap-1 font-mono tabular-nums text-base font-bold text-white group-hover/rate:text-amber-400 transition-colors">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span>{app.totalReviews > 0 ? app.rating.toFixed(1) : '0.0'}</span>
                        </div>
                        <div className="text-xs text-slate-400 group-hover/rate:underline">
                          {app.totalReviews} {app.totalReviews === 1 ? 'Review' : 'Reviews'}
                        </div>
                      </button>

                      <div>
                        <div className="font-mono tabular-nums text-base font-bold text-white">
                          {app.downloads.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-400">Downloads</div>
                      </div>

                      <div>
                        <div className="font-mono tabular-nums text-base font-bold text-white">
                          {app.size}
                        </div>
                        <div className="text-xs text-slate-400">APK Size</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo(app.route);
                        }}
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap ${primaryBtn}`}
                      >
                        <span>Open {app.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleDirectDownload(e, app.id, app.downloadUrl, app.apkFilename)
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-200 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download APK</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Architectural Engineering Pillars */}
      {!searchQuery && (
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <p className="text-xs font-semibold text-emerald-400 mb-1.5">
                Engineering Standards
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Built for speed, privacy, and zero distractions.
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Every application in the NooriTech suite follows the same strict offline-first and ad-free principles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-semibold">{pillar.num}</span>
                    <span className="text-slate-500 tabular-nums">{pillar.metric}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Upcoming Releases & Quick Page Navigation */}
      {!searchQuery && (
        <section className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Upcoming Pipeline */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-amber-400">Product Pipeline</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Upcoming NooriTech Releases
              </h2>
              <p className="text-sm text-slate-400">
                Utility modules currently under development for retail businesses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Printer className="w-5 h-5 text-emerald-400" />
                  <span className="text-[11px] font-mono text-emerald-400">In Development</span>
                </div>
                <h3 className="text-sm font-bold text-white">Bluetooth POS Printer Suite</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct 58mm & 80mm thermal receipt printing with custom store headers and Urdu slips.
                </p>
              </div>

              <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                  <span className="text-[11px] font-mono text-cyan-400">Planned</span>
                </div>
                <h3 className="text-sm font-bold text-white">Smart Inventory & Barcode</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Camera batch barcode scanning, low-stock alerts, and wholesale margin tracking.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/[0.06]">
              <span className="text-xs text-slate-400">
                Have a feature request or custom app idea?
              </span>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>Contact Developer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Explore Dedicated Pages Directory */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div>
              <p className="text-xs font-semibold text-slate-400">Quick Directory</p>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                Explore All Pages
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {quickDirectory.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigateTo(item.page)}
                  className="group w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#0e1624] hover:bg-[#131e30] border border-white/[0.06] hover:border-white/[0.14] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
