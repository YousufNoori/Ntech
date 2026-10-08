import React, { useState } from 'react';
import { 
  Download, ShieldCheck, Film, Play, Volume2, Sliders, Lock, 
  Subtitles, ChevronRight, Star, Sparkles, CheckCircle2, Globe, 
  HelpCircle, ChevronDown, Check, Smartphone, Award, Shield, 
  Clock, Package, FileText, ArrowRight, ExternalLink, Zap, Folder
} from 'lucide-react';
import { NexaPlayerShowcase3D } from './NexaPlayerShowcase3D';
import { trackApkDownload, LiveStatsBanner, useLiveDownloads } from './LiveStatsBanner';
import { AdsterraNativeAd } from './AdsterraNativeAd';
import { useLiveApkSize } from '../lib/useLiveApkSize';

const NEXA_APK_URL = 'https://www.dropbox.com/scl/fi/di72yn79zdpb7h3azdwml/NexaPlay-V1.1.0.apk?rlkey=60tbyy1ww3owmv3qw2hc91vcq&st=wdodpuac&dl=1';

interface NexaPlayerSectionProps {
  navigateTo?: (page: any) => void;
}

export function NexaPlayerSection({ navigateTo }: NexaPlayerSectionProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const liveDownloads = useLiveDownloads('nexa-player');
  const { sizeStr: liveApkSize, isLive } = useLiveApkSize(NEXA_APK_URL, 28118800);

  const handleDownload = () => {
    setDownloading(true);
    trackApkDownload('nexa-player');
    
    // Trigger direct APK download trigger
    const link = document.createElement('a');
    link.href = NEXA_APK_URL;
    link.download = 'NexaPlay-V1.1.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1500);
  };

  const featuresList = [
    {
      title: "4K & 8K Ultra HD Playback Engine",
      urduTitle: "4K اور 8K الٹرا ایچ ڈی پلے بیک",
      description: "Hardware accelerated playback supporting MKV, MP4, AVI, MOV, FLV, TS, and WEBM video formats with zero lag.",
      icon: <Film className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 via-teal-500/10 to-transparent border-cyan-500/30"
    },
    {
      title: "Pro 10-Band Equalizer & Bass Boost",
      urduTitle: "پرو ایکولائزر اور بیس بوسٹر",
      description: "Customize sound frequencies with 3D Spatial Surround Sound, Bass Booster, and pre-configured acoustic audio profiles.",
      icon: <Sliders className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30"
    },
    {
      title: "Background Audio Playback Mode",
      urduTitle: "پرو بیک گراؤنڈ آڈیو موڈ",
      description: "Listen to video soundtracks and music seamlessly in the background while using other apps or with screen locked.",
      icon: <Volume2 className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/30"
    },
    {
      title: "Auto Subtitle Downloader & Custom Fonts",
      urduTitle: "آٹو سب ٹائٹل ڈاؤن لوڈ اور اردو فونٹس",
      description: "Search and download online subtitles automatically in Urdu, English, and Hindi with custom text colors & size.",
      icon: <Subtitles className="w-6 h-6 text-teal-400" />,
      color: "from-teal-500/20 via-cyan-500/10 to-transparent border-teal-500/30"
    },
    {
      title: "PIP Floating Pop-up Video Window",
      urduTitle: "فلوٹنگ پاپ اپ ویڈیو ونڈو",
      description: "Watch your favorite videos while chatting on WhatsApp, browsing the web, or using other apps simultaneously.",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 via-indigo-500/10 to-transparent border-blue-500/30"
    },
    {
      title: "Smart Volume & Brightness Gestures",
      urduTitle: "سمارٹ والیم اور برائٹنس گیسچرز",
      description: "Intuitive touch gestures to control volume, screen brightness, and double-tap to seek 10s forward or backward.",
      icon: <Volume2 className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/30"
    }
  ];

  const faqs = [
    {
      q: "Is Nexa Player completely free with zero advertisements?",
      urduQ: "کیا نیکسا پلیئر بغیر اشتہارات کے بالکل مفت ہے؟",
      a: "Yes! Nexa Player is 100% free with clean playback experience and no annoying pop-ups."
    },
    {
      q: "Does Nexa Player support 4K 60FPS video playback?",
      urduQ: "کیا یہ 4K الٹرا ایچ ڈی ویڈیوز سپورٹ کرتا ہے؟",
      a: "Yes, Nexa Player utilizes advanced hardware acceleration (HW & HW+) to render 4K and 8K videos smoothly."
    },
    {
      q: "How does the Background Audio Play feature work?",
      urduQ: "بیک گراؤنڈ آڈیو پلے کیسے کام کرتا ہے؟",
      a: "You can minimize the player or turn off the screen while listening to videos or music. Playback continues uninterrupted in background."
    },
    {
      q: "Can I download Urdu & English subtitles inside the app?",
      urduQ: "کیا میں ایپ کے اندر سے سب ٹائٹلز ڈاؤن لوڈ کر سکتا ہوں؟",
      a: "Yes, Nexa Player includes a built-in subtitle downloader powered by OpenSubtitles."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* Top Breadcrumb / Apps Suite Switcher */}
      <div className="pt-2 pb-0">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => navigateTo('apps')}
            className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>📱 NooriTech Apps Suite</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Nexa Player (Pro Media)</span>
        </div>
      </div>
      
      {/* ========================================================
          1. Hero Billboard Header for Nexa Player
      ======================================================== */}
      <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-cyan-500 via-teal-400 to-emerald-500 shadow-[0_0_40px_rgba(34,211,238,0.25)] overflow-hidden">
        <div className="bg-[#05111a] rounded-[30px] p-6 sm:p-10 text-white relative overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-black">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>ULTRA HD MEDIA PLAYER • PRO EDITION</span>
              </div>

              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-cyan-400 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.6)] flex-shrink-0 flex items-center justify-center bg-slate-950">
                  <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    Nexa Player <span className="text-cyan-400">Pro</span>
                  </h1>
                  <div className="font-urdu text-lg sm:text-2xl text-cyan-300 font-extrabold mt-1">
                    نیکسا پلیئر - ایچ ڈی ویڈیو اینڈ میڈیا پلیئر
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1">
                    Developed by <strong className="text-white font-bold">Muhammad Yousuf Noori</strong> (NooriTech)
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                Next-generation 4K & 8K Ultra HD media player for Android with hardware acceleration, 10-band audio equalizer, subtitle downloader, floating pop-up player, and background audio mode.
              </p>

              {/* Stat Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#0a1e2b] border border-cyan-500/30 text-center">
                  <div className="text-amber-400 font-black text-base flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.8</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Rating (850+)</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a1e2b] border border-cyan-500/30 text-center relative group">
                  <div className="text-cyan-300 font-black text-base font-mono flex items-center justify-center gap-1">
                    <span>{liveApkSize}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>Size (APK)</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a1e2b] border border-cyan-500/30 text-center">
                  <div className="text-emerald-400 font-black text-base">v1.1.0</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pro Edition</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a1e2b] border border-cyan-500/30 text-center">
                  <div className="text-cyan-400 font-black text-base">{liveDownloads}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Total Downloads</div>
                </div>
              </div>

              {/* Action Download Bar */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-black text-base flex items-center justify-center space-x-3 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>{downloading ? 'Preparing Download...' : 'Download Nexa Player APK (28.6 MB)'}</span>
                </button>

                {downloadSuccess && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Download Started Successfully!</span>
                  </span>
                )}
              </div>

            </div>

            {/* Right Graphic Preview Box */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 sm:w-72 h-[380px] rounded-[36px] bg-slate-950 border-4 border-cyan-500/40 p-3 shadow-2xl shadow-cyan-500/30 flex flex-col justify-between overflow-hidden">
                <div className="w-full h-full rounded-[26px] bg-gradient-to-b from-[#0a192f] via-[#050f1e] to-[#02060e] p-4 flex flex-col justify-between items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 overflow-hidden shadow-lg shadow-cyan-500/50 my-2">
                    <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <div className="text-base font-black text-white">4K Media Player</div>
                    <div className="text-xs text-cyan-300 font-semibold mt-1">Nexa Player Pro</div>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      Smooth 4K playback, 10-band equalizer, subtitle sync & background audio player.
                    </p>
                  </div>
                  <div className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs">
                    Ready to Play
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          2. Interactive 3D Showcase Demo
      ======================================================== */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[32px] p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            INTERACTIVE PREVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Experience Nexa Player UI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explore the live interactive screens: 8K Video Engine, Audio Library, Theme Studio, Settings & Recycle Bin with live auto-scroll.
          </p>
        </div>

        <NexaPlayerShowcase3D />
      </div>

      {/* ========================================================
          3. How to install "Nexa Player - HD Video & Music Player" Section
      ======================================================== */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-blue-500/40 shadow-2xl overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  How to install "Nexa Player - HD Video & Music Player"
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step guide to download & install the official Android APK</p>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              Easy Installation
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                    1
                  </span>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    Step 1
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                  Download Official APK
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Click the "Download APK" button on this website to save the official Nexa Player Android installer package.
                </p>
              </div>

              {/* Step 1 Android Internal Storage Screenshot Graphic */}
              <div className="w-full rounded-2xl bg-slate-900 border border-cyan-500/40 p-3 flex flex-col justify-between overflow-hidden relative shadow-lg">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center space-x-1.5 font-bold text-slate-300">
                    <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Internal storage</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full font-sans font-bold border border-cyan-500/20">
                    Step 1 Screenshot
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400 font-sans my-1">
                  <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                      <Folder className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px]">DCIM</span>
                  </div>

                  <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                      <Folder className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px]">Android</span>
                  </div>

                  {/* HIGHLIGHTED TARGET ITEM: Nexa Player APK File */}
                  <div className="relative mt-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/90 via-slate-900 to-cyan-950/90 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)] animate-pulse">
                    <div className="absolute -top-3 right-2 bg-gradient-to-r from-amber-500 to-cyan-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg flex items-center space-x-1">
                      <span>👉 Tap Here to Install</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center overflow-hidden p-0.5 shrink-0 shadow-inner">
                          <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-extrabold text-white text-[11px] truncate tracking-wide">
                            Nexa Player Pro v1.1.0 8K Video...
                          </div>
                          <div className="text-[10px] text-cyan-400 font-mono font-medium">
                            {liveApkSize || '28.4 MB'} • Just now
                          </div>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-center text-slate-400 bg-slate-950/60 py-1.5 px-2 rounded-lg border border-slate-800 font-semibold">
                  <span className="text-amber-400">نشان زدہ (Highlighted)</span> فائل پر ٹیپ کر کے انسٹالیشن شروع کریں۔
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-amber-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                    2
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Step 2
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                  Click "Install Anyway"
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Since this is a custom offline app, Google Play Protect might show a warning. Tap <strong>"Install anyway"</strong> to proceed safely.
                </p>
              </div>

              {/* Step 2 Screenshot Graphic (Play Protect Dialog) */}
              <div className="w-full rounded-2xl bg-slate-800 border border-amber-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                <div className="absolute inset-0 bg-slate-950/60"></div>
                
                <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3 shadow-2xl flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-slate-700 mb-1" />
                  <div className="text-[9px] text-slate-600 font-medium mb-2 text-center leading-tight">Google Play Protect</div>
                  <div className="text-[13px] text-slate-800 font-medium text-center leading-tight mb-3 px-2">
                    App blocked to protect your device
                  </div>
                  
                  <div className="flex items-center space-x-2 self-start mb-2 w-full">
                    <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center overflow-hidden p-0.5 shrink-0 relative">
                      <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#f0f2f8] flex items-center justify-center font-black text-slate-900 text-[8px]">!</div>
                    </div>
                    <div className="text-[11px] text-slate-800 font-medium truncate">Nexa Player</div>
                  </div>
                  
                  <div className="text-[9px] text-slate-500 text-left w-full leading-relaxed mb-3">
                    Play Protect hasn't seen an app from this developer before. It may be unsafe.
                  </div>
                  
                  <div className="w-full text-left mb-3 pl-1">
                    <div className="relative inline-block">
                      <span className="text-[11px] text-[#415a8c] font-medium relative z-10">Install anyway</span>
                      <div className="absolute -inset-1.5 border-[1.5px] border-amber-500 rounded-md animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.6)] bg-amber-500/10 z-0 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-[#415a8c] text-white text-[11px] py-1.5 rounded-[10px] text-center font-medium mt-1">
                    OK
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                    3
                  </span>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    Step 3
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                  Open the App
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Once installed, tap the <strong>Open</strong> button to start using Nexa Player Pro!
                </p>
              </div>

              {/* Step 3 Screenshot Graphic (Install Prompt) */}
              <div className="w-full rounded-2xl bg-slate-800 border border-cyan-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                <div className="absolute inset-0 bg-slate-950/60"></div>
                
                <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-3xl p-4 shadow-2xl flex flex-col">
                  <div className="text-[15px] text-slate-900 font-normal mb-4 text-left pl-1">
                    App installed.
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-8 pl-1">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center overflow-hidden shrink-0 relative shadow-sm">
                      <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-[13px] text-slate-900 font-medium">Nexa Player</div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 mt-2 w-full">
                    <div className="text-[#415a8c] text-[12px] px-3 py-1.5 rounded-full border border-[#dce0e9] font-medium">
                      Close
                    </div>
                    <div className="relative inline-block">
                      <div className="bg-[#415a8c] text-white text-[12px] px-4 py-1.5 rounded-full font-medium relative z-10">
                        Open
                      </div>
                      <div className="absolute -inset-1.5 border-[1.5px] border-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.6)] bg-cyan-400/20 z-0 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. Core Key Features Grid
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Why Choose Nexa Player Pro?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f, i) => (
            <div 
              key={i}
              className={`p-6 rounded-[28px] bg-gradient-to-br ${f.color} bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border shadow-xl hover:scale-[1.02] transition-all space-y-3`}
            >
              <div className="p-3 rounded-2xl bg-slate-950/80 w-fit border border-white/10">
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{f.title}</h3>
                <div className="font-urdu text-sm text-cyan-400 font-semibold mt-0.5">{f.urduTitle}</div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          4. Technical Specifications Card
      ======================================================== */}
      <div className="bg-slate-900/90 text-white border border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <FileText className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="text-xl font-black text-white">APK Technical Specifications</h3>
            <p className="text-xs text-slate-400">Package details & Android compatibility specs</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">App Package Name</span>
            <span className="text-cyan-300 font-bold">com.nooritech.nexaplayer</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">APK File Size</span>
            <span className="text-white font-bold">{liveApkSize}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Minimum Required Android</span>
            <span className="text-emerald-400 font-bold">Android 7.0 (Nougat) +</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Target SDK Version</span>
            <span className="text-cyan-400 font-bold">Android 15 (SDK 35)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">SHA-256 Hash Verification</span>
            <span className="text-slate-300 text-[9px] truncate block">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Developer & Publisher</span>
            <span className="text-white font-bold">Muhammad Yousuf Noori</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. Frequently Asked Questions (FAQ)
      ======================================================== */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[32px] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-4">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Common questions regarding Nexa Player Pro APK</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950/60"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div>{faq.q}</div>
                  <div className="font-urdu text-xs text-cyan-400 font-semibold mt-0.5">{faq.urduQ}</div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Native Banner Ad */}
      <div className="max-w-7xl mx-auto pt-6 relative z-10">
        <AdsterraNativeAd />
      </div>

      {/* ========================================================
          7. Real-Time Visitor & Download Metrics Banner Right Above Footer
      ======================================================== */}
      <div className="max-w-7xl mx-auto pt-4 pb-12 relative z-10">
        <LiveStatsBanner appId="nexa-player" theme="cyan" />
      </div>

    </div>
  );
}
