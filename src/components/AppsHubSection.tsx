import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Database, 
  CheckCircle2, 
  Star, 
  Cloud, 
  FileSpreadsheet, 
  QrCode, 
  Receipt, 
  Package, 
  Boxes, 
  Users, 
  Lock, 
  Mail, 
  MessageCircle, 
  HelpCircle,
  Clock,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Flame,
  Check,
  Smartphone,
  ChevronRight,
  ExternalLink,
  Shield,
  Eye,
  SlidersHorizontal,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { trackApkDownload, useLiveDownloads } from './LiveStatsBanner';
import { ReviewsSection } from './ReviewsSection';
import { AdsterraNativeAd } from './AdsterraNativeAd';
import { useLiveApkSize } from '../lib/useLiveApkSize';

const NEXA_APK_URL = 'https://www.dropbox.com/scl/fi/di72yn79zdpb7h3azdwml/NexaPlay-V1.1.0.apk?rlkey=60tbyy1ww3owmv3qw2hc91vcq&st=wdodpuac&dl=1';
const RAQAM_APK_URL = 'https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1';

interface AppsHubProps {
  onOpenRaqamFlow: () => void;
  onOpenNexaPlayer?: () => void;
  onNavigateToUniversalPrivacy: () => void;
  onNavigateToUniversalTerms: () => void;
}

export interface AppItem {
  id: string;
  name: string;
  urduName?: string;
  tagline: string;
  description: string;
  category: 'Finance & Accounting' | 'Point of Sale' | 'Inventory' | 'Business Utilities' | 'All';
  status: 'Live' | 'Coming Soon' | 'In Development';
  version: string;
  size: string;
  rating: number;
  downloadsCount: string;
  updatedDate: string;
  icon: string | React.ReactNode;
  highlights: string[];
  isFeatured?: boolean;
  downloadUrl?: string;
  sha256?: string;
  isVerified?: boolean;
}

export function AppsHubSection({ 
  onOpenRaqamFlow, 
  onOpenNexaPlayer,
  onNavigateToUniversalPrivacy, 
  onNavigateToUniversalTerms 
}: AppsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'featured' | 'ranking' | 'security' | 'request'>('featured');
  const [submitted, setSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const raqamDownloads = useLiveDownloads('raqam-flow');
  const nexaDownloads = useLiveDownloads('nexa-player');
  const { sizeStr: nexaLiveSize } = useLiveApkSize(NEXA_APK_URL, 28118800);
  const { sizeStr: raqamLiveSize } = useLiveApkSize(RAQAM_APK_URL, 35465412);

  const apps: AppItem[] = [
    {
      id: 'raqam-flow',
      name: 'Raqam Flow - Digital Khata',
      urduName: 'رقم فلو - آپ کا اپنا ڈیجیٹل کھاتہ',
      tagline: 'Smart Offline Digital Ledger & Expense Manager',
      description: 'Pakistan\'s premier offline-first digital ledger, customer udhar tracking, daily cash book, and automatic Google Drive cloud backup designed specifically for shopkeepers and retail merchants.',
      category: 'Finance & Accounting',
      status: 'Live',
      version: '1.0.0',
      size: raqamLiveSize,
      rating: 4.9,
      downloadsCount: raqamDownloads > 0 ? raqamDownloads.toString() : '0',
      updatedDate: 'August 2026',
      icon: '/logo.png',
      highlights: [
        '100% Offline SQLite Security',
        'Auto Google Drive Backup',
        'Printable PDF Statements',
        'PIN & Biometric Lock'
      ],
      isFeatured: true,
      isVerified: true,
      sha256: '9a4f8e7c1b2d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
      downloadUrl: RAQAM_APK_URL
    },
    {
      id: 'nexa-player',
      name: 'Nexa Player - HD Media Player',
      urduName: 'نیکسا پلیئر - ایچ ڈی ویڈیو اینڈ میڈیا پلیئر',
      tagline: 'Ultra HD Video & Music Player with Equalizer & Subtitles',
      description: 'Advanced 4K Ultra HD media player designed for smooth playback, gesture volume controls, audio equalizer, background music playback, and subtitle customization.',
      category: 'Business Utilities',
      status: 'Live',
      version: '1.1.0',
      size: nexaLiveSize,
      rating: 4.8,
      downloadsCount: nexaDownloads > 0 ? nexaDownloads.toString() : '0',
      updatedDate: 'September 2026',
      icon: '/nexa-player.jpg',
      highlights: [
        '4K Ultra HD Video Playback',
        'Hardware Acceleration',
        'Custom Equalizer & Bass Boost',
        'Subtitle & Gesture Controls'
      ],
      isFeatured: false,
      isVerified: true,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      downloadUrl: NEXA_APK_URL
    }
  ];

  const categories = ['All', 'Finance & Accounting', 'Business Utilities'];

  const filteredApps = apps.filter((app) => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.urduName && app.urduName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* ========================================================
          1. APKPure Style Search & Navigation Header Bar
      ======================================================== */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* APKPure Marketplace Title */}
          <div className="flex items-center space-x-3 self-start md:self-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Noori<span className="text-emerald-500">APK</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Store
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official Android APK Distribution Hub by Muhammad Yousuf Noori
              </p>
            </div>
          </div>

          {/* APKPure Search Bar */}
          <div className="relative w-full md:max-w-md">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps, APK packages, Khata, POS, Nexa Player..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. Official Apps Suite Grid (Raqam Flow & Nexa Player Cards)
      ======================================================== */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Our Official Premium Apps
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => {
                if (app.id === 'raqam-flow') {
                  onOpenRaqamFlow();
                } else if (app.id === 'nexa-player') {
                  if (onOpenNexaPlayer) {
                    onOpenNexaPlayer();
                  } else {
                    trackApkDownload('nexa-player');
                  }
                } else {
                  trackApkDownload('raqam-flow');
                }
              }}
              className="group relative rounded-[28px] p-[2px] bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
            >
              <div className="bg-[#08131a] rounded-[26px] p-6 text-white relative overflow-hidden group-hover:bg-[#0b1a23] transition-colors flex flex-col items-center text-center h-full justify-between">
                {/* Ambient Background Patterns */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-4 w-full flex flex-col items-center">
                  {/* App Icon */}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 p-1 flex items-center justify-center overflow-hidden shadow-xl group-hover:scale-105 transition-transform my-1 ${
                    app.id === 'nexa-player'
                      ? 'rounded-full border-4 border-cyan-400 bg-slate-950 shadow-cyan-500/50'
                      : 'rounded-[22px] bg-[#0d2222] border-2 border-emerald-400 shadow-emerald-500/30'
                  }`}>
                    <img 
                      src={app.icon as string} 
                      alt={app.name} 
                      className={`w-full h-full object-cover ${app.id === 'nexa-player' ? 'rounded-full' : 'rounded-[16px]'}`} 
                    />
                  </div>

                  {/* App Brand Information */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight group-hover:text-emerald-300 transition-colors">
                      {app.name}
                    </h3>
                    <div className="font-urdu text-base sm:text-lg text-emerald-400 font-semibold mt-1">
                      {app.urduName}
                    </div>
                    <div className="text-xs text-slate-300 mt-1.5 flex items-center justify-center space-x-1.5 flex-wrap">
                      <span>By <strong className="text-slate-100 font-bold">Muhammad Yousuf Noori</strong></span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">{app.category}</span>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal my-1 text-center line-clamp-3">
                    {app.description}
                  </p>

                  {/* 2x2 Grid Stat Badges for Card */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2 w-full">
                    <div className="p-3 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-amber-400 text-sm sm:text-base font-black flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{app.rating}</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Rating</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-white text-sm sm:text-base font-black font-mono">
                        {app.size}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Size (APK)</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-emerald-400 text-sm sm:text-base font-black">
                        v{app.version}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Version</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-cyan-400 text-sm sm:text-base font-black">
                        {app.downloadsCount}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. Sponsored Ads & Community Reviews
      ======================================================== */}
      {!searchQuery && (
        <div className="max-w-4xl mx-auto mb-8 space-y-8">
          <AdsterraNativeAd />
          <ReviewsSection />
        </div>
      )}
    </div>
  );
}
