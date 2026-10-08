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
import { useAppReviewsStats } from './ReviewsSection';
import { EcosystemComboHub } from './EcosystemComboHub';
import { useLiveApkSize } from '../lib/useLiveApkSize';
import { useVersionConfig } from '../lib/useVersionConfig';

const NEXA_APK_URL = 'https://www.dropbox.com/scl/fi/di72yn79zdpb7h3azdwml/NexaPlay-V1.1.0.apk?rlkey=60tbyy1ww3owmv3qw2hc91vcq&st=wdodpuac&dl=1';
const RAQAM_APK_URL = 'https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1';

interface AppsHubProps {
  onOpenRaqamFlow: () => void;
  onOpenNexaPlayer?: () => void;
  onNavigateToUniversalPrivacy: () => void;
  onNavigateToUniversalTerms: () => void;
  onNavigateToContact?: () => void;
  onNavigateToAbout?: () => void;
}

export interface AppItem {
  id: string;
  name: string;
  urduName?: string;
  tagline: string;
  description: string;
  category: 'Finance & Accounting' | 'Point of Sale' | 'Inventory' | 'Entertainment Utilities' | 'Business Utilities' | 'All';
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
  onNavigateToUniversalTerms,
  onNavigateToContact,
  onNavigateToAbout
}: AppsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'featured' | 'ranking' | 'security' | 'request'>('featured');
  const [submitted, setSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const raqamDownloads = useLiveDownloads('raqam-flow');
  const nexaDownloads = useLiveDownloads('nexa-player');
  const { config: nexaConfig } = useVersionConfig();
  const { sizeStr: raqamLiveSize } = useLiveApkSize(RAQAM_APK_URL, 35465412);
  const raqamReviewStats = useAppReviewsStats('raqam-flow');
  const nexaReviewStats = useAppReviewsStats('nexa-player');

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
      category: 'Entertainment Utilities',
      status: 'Live',
      version: nexaConfig.version_name,
      size: nexaConfig.download_size,
      rating: nexaReviewStats.totalReviews > 0 ? nexaReviewStats.rating : 0.0,
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

  const categories = ['All', 'Finance & Accounting', 'Entertainment Utilities'];

  const filteredApps = apps.filter((app) => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.urduName && app.urduName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
      
      {/* ========================================================
          1. APKPure Style Search & Navigation Header Bar
      ======================================================== */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-lg mb-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Official Noori Tech Marketplace Title */}
          <div className="flex items-center space-x-3.5 self-start md:self-center">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-400/40 p-0.5 shadow-md flex items-center justify-center bg-slate-950 flex-shrink-0">
              <img src="/noori-tech-logo.jpg" alt="Noori Tech Logo" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Noori <span className="text-emerald-400">Tech</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Official Store
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Official Android APK Distribution Hub by Muhammad Yousuf Noori
              </p>
            </div>
          </div>

          {/* APKPure Search Bar */}
          <div className="relative w-full md:max-w-lg">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps, APK packages, Khata, POS, Nexa Player..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. Official Apps Suite Grid (Raqam Flow & Nexa Player Cards) - Full Width Responsive
      ======================================================== */}
      <div className="w-full mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Our Official Premium Apps
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
              className="group relative rounded-[28px] p-[2px] bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.45)] overflow-hidden transition-all duration-300 hover:scale-[1.015] cursor-pointer flex flex-col justify-between"
            >
              <div className="bg-[#08131a] rounded-[26px] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden group-hover:bg-[#0b1a23] transition-colors flex flex-col items-center text-center h-full justify-between">
                {/* Ambient Background Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 space-y-5 w-full flex flex-col items-center">
                  {/* App Icon */}
                  <div className={`w-24 h-24 sm:w-28 sm:h-28 p-1 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform my-1 ${
                    app.id === 'nexa-player'
                      ? 'rounded-full border-4 border-cyan-400 bg-slate-950 shadow-cyan-500/50'
                      : 'rounded-[26px] bg-[#0d2222] border-2 border-emerald-400 shadow-emerald-500/30'
                  }`}>
                    <img 
                      src={app.icon as string} 
                      alt={app.name} 
                      className={`w-full h-full object-cover ${app.id === 'nexa-player' ? 'rounded-full' : 'rounded-[20px]'}`} 
                    />
                  </div>

                  {/* App Brand Information */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-emerald-300 transition-colors">
                      {app.name}
                    </h3>
                    <div className="font-urdu text-lg sm:text-xl text-emerald-400 font-semibold mt-1">
                      {app.urduName}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-2 flex items-center justify-center space-x-2 flex-wrap">
                      <span>By <strong className="text-slate-100 font-bold">Muhammad Yousuf Noori</strong></span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">{app.category}</span>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-sm text-slate-200 leading-relaxed font-normal my-2 text-center max-w-xl">
                    {app.description}
                  </p>

                  {/* 4 Stat Badges for Card (2 cols on mobile, 4 cols on tablet/desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 w-full">
                    {/* Live Community Rating Badge linked to app's reviews */}
                    {(() => {
                      const stats = app.id === 'raqam-flow' ? raqamReviewStats : nexaReviewStats;
                      return (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (app.id === 'raqam-flow') {
                              onOpenRaqamFlow();
                            } else if (onOpenNexaPlayer) {
                              onOpenNexaPlayer();
                            }
                            setTimeout(() => {
                              const el = document.getElementById('reviews-section');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 350);
                          }}
                          className="p-3.5 rounded-2xl bg-[#10222a] border border-slate-800/80 hover:border-amber-400/80 hover:bg-[#162f3a] text-center flex flex-col items-center justify-center transition-all cursor-pointer group/rating shadow-sm"
                          title="Click to view verified community user reviews"
                        >
                          <div className="text-amber-400 text-base sm:text-lg font-black flex items-center justify-center space-x-1 group-hover/rating:scale-105 transition-transform">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span>{stats.totalReviews > 0 ? stats.rating.toFixed(1) : '0.0'}</span>
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-amber-300 font-bold mt-0.5 group-hover/rating:underline">
                            {stats.totalReviews > 0 ? `${stats.totalReviews} Reviews` : '0 Reviews'}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="p-3.5 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-white text-base sm:text-lg font-black font-mono">
                        {app.size}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Size (APK)</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-emerald-400 text-base sm:text-lg font-black">
                        v{app.version}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Version</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#10222a] border border-slate-800/80 text-center flex flex-col items-center justify-center">
                      <div className="text-cyan-400 text-base sm:text-lg font-black">
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
          3. Ecosystem Combo Hub: Pillars, Comparison & Roadmap
      ======================================================== */}
      {!searchQuery && (
        <div className="w-full mb-8">
          <EcosystemComboHub 
            onOpenRaqamFlow={onOpenRaqamFlow}
            onOpenNexaPlayer={onOpenNexaPlayer}
            onNavigateToContact={onNavigateToContact}
            onNavigateToAbout={onNavigateToAbout}
          />
        </div>
      )}
    </div>
  );
}
