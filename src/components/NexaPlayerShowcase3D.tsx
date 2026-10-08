import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  Sliders, Lock, ShieldCheck, Sparkles, Folder, Film, 
  Music, Subtitles, Settings, Layers, ChevronRight, ChevronLeft,
  Smartphone, FastForward, Rewind, Eye, Heart, Download,
  Sun, Moon, Trash2, CheckCircle2, Search, Palette, RefreshCw,
  Check, ArrowRight, Radio, ToggleRight, AlertCircle, HardDrive
} from 'lucide-react';

export interface NexaScreenData {
  id: number;
  title: string;
  tag: string;
  description: string;
  badgeColor: string;
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  renderScreen?: () => React.ReactNode;
}

export function NexaPlayerShowcase3D() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 4200; // 4.2 seconds per slide
  const TICK_INTERVAL = 50;

  // Shared Android Status Bar
  const renderStatusBar = (isDark = true) => (
    <div className={`h-6 ${isDark ? 'bg-[#030712] text-slate-300' : 'bg-slate-100 text-slate-700'} px-4 flex items-center justify-between text-[10px] font-mono pt-1 select-none`}>
      <span className="font-bold">9:24</span>
      <div className="flex items-center space-x-1.5 text-[9px]">
        <span>LTE</span>
        <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">100%</span>
      </div>
    </div>
  );

  // Shared Bottom Navigation Bar
  const renderBottomNav = (activeTab: 'videos' | 'audios' | 'settings', isDark = true) => (
    <div className={`h-14 ${isDark ? 'bg-[#06121f]/95 border-t border-cyan-900/30' : 'bg-white/95 border-t border-slate-200'} backdrop-blur-md px-6 flex items-center justify-between text-[10px] select-none z-20`}>
      <div className={`flex flex-col items-center space-y-0.5 cursor-pointer ${activeTab === 'videos' ? 'text-cyan-400 font-bold' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Film className="w-4 h-4" />
        <span>Videos</span>
      </div>
      <div className={`flex flex-col items-center space-y-0.5 cursor-pointer px-3 py-1 rounded-2xl ${activeTab === 'audios' ? (isDark ? 'bg-cyan-500/15 text-cyan-400 font-bold' : 'bg-cyan-50 text-cyan-600 font-bold') : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Music className="w-4 h-4" />
        <span>Audios</span>
      </div>
      <div className={`flex flex-col items-center space-y-0.5 cursor-pointer ${activeTab === 'settings' ? 'text-cyan-400 font-bold' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <Settings className="w-4 h-4" />
        <span>Nexa Settings</span>
      </div>
    </div>
  );

  const screens: NexaScreenData[] = [
    // 1. Wizard Step 1: Ultra 8K & iPhone Video Engine
    {
      id: 1,
      title: "Ultra 8K & iPhone Video Engine",
      tag: "Setup Wizard • Step 1",
      description: "Hardware accelerated playback for 8K/4K Ultra HD & iPhone MOV/HEVC/ProRes files.",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Wizard Header */}
          <div className="px-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                NEXAPLAY SETUP WIZARD
              </span>
              <div className="flex space-x-1">
                <span className="w-3.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">STEP 1 OF 3</div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="w-1/3 h-full bg-cyan-400 rounded-full"></div>
            </div>
          </div>

          {/* Logo & Content */}
          <div className="px-4 py-2 flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 p-[2px] shadow-lg shadow-cyan-500/40">
              <div className="w-full h-full rounded-full bg-[#030914] flex items-center justify-center">
                <span className="text-xl font-black text-cyan-300 font-mono">N</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                8K Ultra HD & iPhone MOV
              </span>
              <h4 className="text-sm font-black text-white mt-1.5">Ultra 8K & iPhone Video Engine</h4>
              <p className="text-[10px] text-slate-400 leading-tight mt-1 px-2">
                Enable media permission to scan and play 8K/4K Videos, iPhone MOV/HEVC/ProRes files, and movies with Hardware Acceleration.
              </p>
            </div>

            {/* Checkpoints Card */}
            <div className="w-full bg-[#071526] p-3 rounded-2xl border border-cyan-500/20 text-left space-y-2">
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Plays Ultra 8K, 4K & HD Videos smoothly</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Full support for iPhone MOV, HEVC & HDR10+</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Smart Video Folders auto-organization</span>
              </div>
            </div>

            {/* Codec Badges */}
            <div className="grid grid-cols-4 gap-1 w-full text-[8px] font-mono">
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">8K ULTRA HD</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">IPHONE MOV</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">HEVC/H.265</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">60 FPS</div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-[#06121f] border-t border-cyan-900/30 text-center space-y-1.5">
            <div className="text-[9px] text-emerald-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Private • Local Device Storage Only</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-400/25">
              Allow Video Permission ►
            </button>
          </div>
        </div>
      )
    },

    // 2. Wizard Step 2: Studio Quality Audio Engine
    {
      id: 2,
      title: "Studio Quality Audio Engine",
      tag: "Setup Wizard • Step 2",
      description: "Music library scanner with automatic WhatsApp voice clutter filtering & FLAC support.",
      badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Wizard Header */}
          <div className="px-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                NEXAPLAY SETUP WIZARD
              </span>
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="w-3.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">STEP 2 OF 3</div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="w-2/3 h-full bg-cyan-400 rounded-full"></div>
            </div>
          </div>

          {/* Logo & Content */}
          <div className="px-4 py-2 flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[2px] shadow-lg shadow-cyan-500/40">
              <div className="w-full h-full rounded-full bg-[#030914] flex items-center justify-center">
                <Music className="w-7 h-7 text-cyan-300" />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                Studio DSP & Equalizer
              </span>
              <h4 className="text-sm font-black text-white mt-1.5">Studio Quality Audio Engine</h4>
              <p className="text-[10px] text-slate-400 leading-tight mt-1 px-2">
                Enable audio permission to scan music songs, albums, singer tracks, and phone recordings. Automatically filters out WhatsApp clutter.
              </p>
            </div>

            {/* Checkpoints Card */}
            <div className="w-full bg-[#071526] p-3 rounded-2xl border border-cyan-500/20 text-left space-y-2">
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Scans Pure Music Songs, Albums & Artists</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Filters out WhatsApp voice notes automatically</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>16-Band Studio DSP Equalizer & Album Art Themes</span>
              </div>
            </div>

            {/* Audio Formats */}
            <div className="grid grid-cols-4 gap-1 w-full text-[8px] font-mono">
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">FLAC 24-BIT</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">MP3 320 KBPS</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">WAV</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">ALAC</div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-[#06121f] border-t border-cyan-900/30 text-center space-y-1.5">
            <div className="text-[9px] text-emerald-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Private • Local Device Storage Only</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-400/25">
              Allow Audio Permission ►
            </button>
          </div>
        </div>
      )
    },

    // 3. Wizard Step 3: Media Recycle Bin & Glow Themes
    {
      id: 3,
      title: "Media Recycle Bin & Glow Themes",
      tag: "Setup Wizard • Step 3",
      description: "30-day protected Recycle Bin recovery & customizable futuristic glow themes.",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Wizard Header */}
          <div className="px-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                NEXAPLAY SETUP WIZARD
              </span>
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="w-3.5 h-1.5 rounded-full bg-cyan-400"></span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">STEP 3 OF 3</div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="w-full h-full bg-cyan-400 rounded-full"></div>
            </div>
          </div>

          {/* Logo & Content */}
          <div className="px-4 py-2 flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[2px] shadow-lg shadow-emerald-500/40">
              <div className="w-full h-full rounded-full bg-[#030914] flex items-center justify-center">
                <Trash2 className="w-7 h-7 text-emerald-300" />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Media Recovery & Glow Themes
              </span>
              <h4 className="text-sm font-black text-white mt-1.5">Media Recycle Bin & Glow Themes</h4>
              <p className="text-[10px] text-slate-400 leading-tight mt-1 px-2">
                Secure deleted videos and songs automatically inside our safety Recycle Bin for quick recovery. Customize player looks with premium glowing layouts.
              </p>
            </div>

            {/* Checkpoints Card */}
            <div className="w-full bg-[#071526] p-3 rounded-2xl border border-emerald-500/20 text-left space-y-2">
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Safety Recycle Bin keeps deleted media files for 30 days</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Instant one-tap file recovery to restore deleted clips</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Premium neon glow accents and customized theme selection</span>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-4 gap-1 w-full text-[8px] font-mono">
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">RECYCLE BIN</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">GLOWING THEMES</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">EASY RECOVERY</div>
              <div className="py-1 bg-slate-900/90 rounded-lg text-slate-300 border border-slate-800">V1.1.0</div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-[#06121f] border-t border-cyan-900/30 text-center space-y-1.5">
            <div className="text-[9px] text-emerald-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Private • Local Device Storage Only</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-400/25">
              Finish Setup & Launch Nexa Play ►
            </button>
          </div>
        </div>
      )
    },

    // 4. Audio Library (Dark AMOLED Mode)
    {
      id: 4,
      title: "Audio Library & Music Tracks",
      tag: "116+ Music Tracks • Dark AMOLED",
      description: "Music library with instant search, favorite playlists, albums, and Urdu poetry audio tracks.",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#020710] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Header */}
          <div className="p-3 bg-[#05111d] border-b border-cyan-900/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 text-xs font-black">
                NP
              </div>
              <div>
                <div className="text-xs font-black text-white">NEXA PLAY</div>
                <div className="text-[8px] text-cyan-300">Noori Tech Android App Developer</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/40">
              Audios
            </span>
          </div>

          {/* Search & Tabs */}
          <div className="p-3 space-y-2 border-b border-slate-900 bg-[#030914]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-white">Audio Library</h4>
                <span className="text-[9px] text-slate-400">116 music tracks available</span>
              </div>
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search songs, artists, albums..."
                readOnly
                className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[9px] text-slate-300 focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex space-x-1.5 text-[8px] font-bold overflow-x-hidden">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">All 116</span>
              <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">Favorites 0</span>
              <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">Albums 55</span>
              <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">Artists</span>
            </div>
          </div>

          {/* Songs List */}
          <div className="flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-3 py-2 space-y-1.5 text-[10px]">
            {[
              { title: "میں نے تو صرف وہ کھویا جو میرا...:", sub: "Unknown Artist • 00:52", isUrdu: true },
              { title: "Are Re Are", sub: "Uttam Singh, Lata Mangeshkar • 05:32" },
              { title: "Hum Yaar Hai Tumhare - Jh...", sub: "Udit Narayan, Alka Yagnik • 07:10" },
              { title: "Kitni Bechain Hoke - Jhanka...", sub: "Alka Yagnik, Udit Narayan • 06:38" },
              { title: "Main Agar Saamne", sub: "Abhijeet, Alka Yagnik • 05:16" },
              { title: "Arzoo Ki Rahon Mein", sub: "Udit Narayan, Alka Yagnik • 07:22" }
            ].map((song, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between hover:border-cyan-500/30 transition-all">
                <div className="flex items-center space-x-2 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Music className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className={`font-bold text-slate-200 truncate ${song.isUrdu ? 'font-urdu text-[11px] text-cyan-300' : ''}`}>
                      {song.title}
                    </div>
                    <div className="text-[8px] text-slate-400 font-mono truncate">{song.sub}</div>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <Play className="w-2.5 h-2.5 fill-cyan-400" />
                </div>
              </div>
            ))}
          </div>

          {renderBottomNav('audios', true)}
        </div>
      )
    },

    // 5. Theme Studio (Dark Night Mode & Cyber Cyan)
    {
      id: 5,
      title: "Theme Studio & Cosmic Palettes",
      tag: "Glassmorphism & Night Mode",
      description: "AMOLED pure black, Cyber frosted glass, and electric neon accents.",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Header */}
          <div className="p-3 bg-[#06121f] border-b border-cyan-900/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-4 h-4 text-slate-300" />
              <div>
                <div className="text-xs font-black text-white">Theme Studio</div>
                <div className="text-[8px] text-cyan-300">Personalize colors & dark modes</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/40">
              Theme
            </span>
          </div>

          {/* Theme Settings Body */}
          <div className="p-3 flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-3 text-[10px]">
            {/* Appearance Mode */}
            <div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Appearance Mode
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-2 rounded-xl bg-slate-900 border-2 border-cyan-400 text-cyan-300 flex flex-col items-center">
                  <Moon className="w-3.5 h-3.5 mb-1" />
                  <span className="font-bold text-[9px]">Night Mode</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 flex flex-col items-center">
                  <Sun className="w-3.5 h-3.5 mb-1" />
                  <span className="font-bold text-[9px]">Day Mode</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 flex flex-col items-center">
                  <RefreshCw className="w-3.5 h-3.5 mb-1" />
                  <span className="font-bold text-[9px]">System Auto</span>
                </div>
              </div>
            </div>

            {/* Display Preferences */}
            <div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Display Preferences
              </span>
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">AMOLED Pure Black</div>
                    <div className="text-[8px] text-slate-400">Save battery with deep true blacks</div>
                  </div>
                  <div className="w-7 h-4 bg-slate-800 rounded-full relative p-0.5">
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/70 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">Cyber Frosted Glass</div>
                    <div className="text-[8px] text-slate-400">Subtle translucent glassmorphism bevels</div>
                  </div>
                  <div className="w-7 h-4 bg-cyan-500 rounded-full relative p-0.5 flex justify-end">
                    <div className="w-3 h-3 bg-slate-950 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cosmic Accent Palettes */}
            <div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Cosmic Accent Palettes
              </span>
              <div className="space-y-1">
                <div className="p-1.5 rounded-xl bg-slate-900/90 border border-cyan-400 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 text-[9px] font-bold">✓</div>
                    <div>
                      <div className="font-bold text-[9px] text-white">Cyber Cyan</div>
                      <div className="text-[7px] text-slate-400">Electric blue neon</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[7px] font-bold border border-cyan-500/40">ACTIVE</span>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
                    <div className="font-bold text-[9px] text-slate-300">Electric Mint</div>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                    <div className="font-bold text-[9px] text-slate-300">Neon Violet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {renderBottomNav('settings', true)}
        </div>
      )
    },

    // 6. Settings & Engine (V1.1.0)
    {
      id: 6,
      title: "Settings & Engine (V1.1.0)",
      tag: "Core Video & Audio Controls",
      description: "Gesture controls, 10s seek interval, background video playback, and HW+ hardware acceleration.",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(true)}

          {/* Header */}
          <div className="p-3 bg-[#06121f] border-b border-cyan-900/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-white">Settings & Engine</div>
              <div className="text-[8px] text-cyan-300">V1.1.0 • System Engine</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/40">
              V1.1.0
            </span>
          </div>

          {/* Settings Body */}
          <div className="p-3 flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-3 text-[10px]">
            {/* Quick Cards */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/20 flex flex-col items-center text-center">
                <Palette className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="font-bold text-[9px]">Theme & Styling</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center">
                <Trash2 className="w-4 h-4 text-red-400 mb-1" />
                <span className="font-bold text-[9px]">Recycle Bin</span>
              </div>
            </div>

            {/* Video Player Main Settings */}
            <div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Video Player Main Settings
              </span>
              <div className="space-y-1">
                {[
                  { label: "Gesture Navigation Controls", val: "Enabled" },
                  { label: "Double-Tap Seek Interval", val: "10 Seconds" },
                  { label: "Background Video Playback", val: "Enabled" },
                  { label: "Hardware Acceleration (HW+)", val: "Enabled" },
                  { label: "Auto Picture-in-Picture (PiP)", val: "Enabled" }
                ].map((item, idx) => (
                  <div key={idx} className="p-1.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                    <span className="text-[9px] text-slate-200">{item.label}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Settings */}
            <div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Audio Player Main Settings
              </span>
              <div className="p-1.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <span className="text-[9px] text-slate-200">Audio Player Equalizer</span>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Enabled
                </span>
              </div>
            </div>
          </div>

          {renderBottomNav('settings', true)}
        </div>
      )
    },

    // 7. In-App OTA Update Dialog (V1.2.0)
    {
      id: 7,
      title: "In-App OTA Update Dialog",
      tag: "Version 1.2.0 • 18 MB",
      description: "Seamless in-app updates with 8K boost, 16-band studio DSP equalizer, and stability fixes.",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-[#02060e] text-white flex flex-col font-sans select-none overflow-hidden relative justify-center p-4">
          <div className="relative rounded-3xl bg-slate-950/95 border-2 border-cyan-400 p-4 shadow-2xl shadow-cyan-500/40 text-center space-y-3 backdrop-blur-2xl">
            {/* Pulsing Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/50 animate-pulse">
              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div>
              <h4 className="text-sm font-black text-white">New Update Available</h4>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold border border-cyan-500/40">
                Version 1.2.0 • 18 MB
              </span>
              <p className="text-[10px] text-slate-300 leading-tight mt-1.5 px-2">
                A new version of NexaPlayer is ready with enhanced 8K video playback, studio audio DSP & performance improvements.
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-[#071526] p-2.5 rounded-2xl border border-cyan-500/20 text-left space-y-1.5 text-[9px]">
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Ultra 8K & iPhone MOV Playback Boost</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>16-Band Studio Audio DSP Equalizer</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Protected Media Recycle Bin & Stability</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-1.5 pt-1">
              <button className="w-full py-2 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-400/30 flex items-center justify-center space-x-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Update Now</span>
              </button>
              <button className="text-[10px] text-slate-400 font-bold hover:text-slate-300">
                Later
              </button>
            </div>
          </div>
        </div>
      )
    },

    // 8. Theme Studio (Light Day Mode)
    {
      id: 8,
      title: "Theme Studio (Light Day Mode)",
      tag: "Day Mode • Frosted Glass",
      description: "Crisp light theme appearance for high sunlight visibility with frosted glass accents.",
      badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/30",
      renderScreen: () => (
        <div className="w-full h-full bg-slate-50 text-slate-900 flex flex-col font-sans select-none overflow-hidden relative justify-between">
          {renderStatusBar(false)}

          {/* Header */}
          <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-4 h-4 text-slate-700" />
              <div>
                <div className="text-xs font-black text-slate-900">Theme Studio</div>
                <div className="text-[8px] text-cyan-600 font-medium">Personalize colors & dark modes</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-[9px] font-bold border border-cyan-200">
              Day Mode
            </span>
          </div>

          {/* Theme Settings Body (Light) */}
          <div className="p-3 flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-3 text-[10px]">
            <div>
              <span className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                Appearance Mode
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 flex flex-col items-center">
                  <Moon className="w-3.5 h-3.5 mb-1" />
                  <span className="font-bold text-[9px]">Night Mode</span>
                </div>
                <div className="p-2 rounded-xl bg-cyan-50 border-2 border-cyan-500 text-cyan-700 flex flex-col items-center shadow-xs">
                  <Sun className="w-3.5 h-3.5 mb-1 text-cyan-600" />
                  <span className="font-bold text-[9px]">Day Mode</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 flex flex-col items-center">
                  <RefreshCw className="w-3.5 h-3.5 mb-1" />
                  <span className="font-bold text-[9px]">System Auto</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                Display Preferences
              </span>
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">AMOLED Pure Black</div>
                    <div className="text-[8px] text-slate-500">Save battery with deep true blacks</div>
                  </div>
                  <div className="w-7 h-4 bg-slate-200 rounded-full relative p-0.5">
                    <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-cyan-300 flex items-center justify-between shadow-xs">
                  <div>
                    <div className="font-bold text-slate-800">Cyber Frosted Glass</div>
                    <div className="text-[8px] text-slate-500">Subtle translucent glassmorphism bevels</div>
                  </div>
                  <div className="w-7 h-4 bg-cyan-500 rounded-full relative p-0.5 flex justify-end">
                    <div className="w-3 h-3 bg-white rounded-full shadow-xs"></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                Cosmic Accent Palettes
              </span>
              <div className="p-1.5 rounded-xl bg-white border border-cyan-400 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[9px] font-bold">✓</div>
                  <div>
                    <div className="font-bold text-[9px] text-slate-900">Cyber Cyan</div>
                    <div className="text-[7px] text-slate-500">Electric blue neon</div>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[7px] font-bold border border-cyan-300">ACTIVE</span>
              </div>
            </div>
          </div>

          {renderBottomNav('settings', false)}
        </div>
      )
    }
  ];

  // Fixed Sequential Live Auto-Scroll timer (guarantees every single card is visited one-by-one without skipping)
  useEffect(() => {
    if (!isAutoScroll || isHovered) return;

    let startTime = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        clearInterval(interval);
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % screens.length);
      }
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoScroll, isHovered, currentIndex, screens.length]);

  // Smoothly keep the active card fully visible inside the scrollable list container without clipping
  useEffect(() => {
    const el = tabRefs.current[currentIndex];
    const container = listContainerRef.current;
    if (el && container) {
      if (currentIndex === 0) {
        // Return to top cleanly for first card
        container.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      // If top of card is near or above container top
      if (elRect.top < containerRect.top + 20) {
        const diff = (containerRect.top + 20) - elRect.top;
        container.scrollBy({ top: -diff, behavior: 'smooth' });
      } 
      // If bottom of card is near or below container bottom
      else if (elRect.bottom > containerRect.bottom - 20) {
        const diff = elRect.bottom - (containerRect.bottom - 20);
        container.scrollBy({ top: diff, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const currentScreen = screens[currentIndex];

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto py-8 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Phone Frame Screen Showcase */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-[285px] sm:w-[320px] h-[580px] sm:h-[620px] rounded-[44px] bg-slate-950 border-4 border-cyan-500/40 p-3 shadow-[0_0_50px_rgba(34,211,238,0.25)] flex flex-col justify-between overflow-hidden group">
            
            {/* Notch Area */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center space-x-2 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-slate-950"></div>
              <div className="w-3 h-1 rounded-full bg-slate-800"></div>
            </div>

            {/* Screen Content Render */}
            <div className="w-full h-full rounded-[32px] overflow-hidden relative z-20 bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  {currentScreen.imageUrl ? (
                    <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center select-none">
                      <img 
                        src={currentScreen.imageUrl} 
                        alt={currentScreen.title} 
                        className={`w-full h-full object-${currentScreen.imageFit || 'cover'} transition-transform duration-700`}
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20"></div>
                    </div>
                  ) : (
                    currentScreen.renderScreen?.()
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700/80 rounded-full z-30"></div>
          </div>
        </div>

        {/* Right Column: Interactive Description & Live Auto-Scroll Switcher */}
        <div className="md:col-span-6 space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${currentScreen.badgeColor}`}>
                {currentScreen.tag}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                Screen 0{currentIndex + 1} of 0{screens.length}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {currentScreen.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentScreen.description}
            </p>
          </div>

          {/* Screen Tabs List with Live Auto-Scroll */}
          <div 
            ref={listContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="space-y-2.5 max-h-[400px] overflow-y-auto p-2 scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative"
          >
            {screens.map((sc, idx) => (
              <button
                key={sc.id}
                ref={el => { tabRefs.current[idx] = el; }}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`w-full p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex items-center justify-between cursor-pointer ${
                  currentIndex === idx 
                    ? 'bg-slate-900 text-white border-cyan-400 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40 translate-x-1' 
                    : 'bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cyan-500/40'
                }`}
              >
                {/* Live auto-scroll progress fill line on active card */}
                {currentIndex === idx && isAutoScroll && !isHovered && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center space-x-3 relative z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                    currentIndex === idx ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <span>{sc.title}</span>
                      {currentIndex === idx && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">{sc.tag}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentIndex === idx ? 'text-cyan-400 translate-x-1' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Live Auto-Scroll Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => {
                setIsAutoScroll(!isAutoScroll);
                setProgress(0);
              }}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                isAutoScroll 
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25 shadow-md shadow-cyan-500/10' 
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAutoScroll ? 'bg-cyan-400 animate-pulse' : 'bg-slate-400'}`}></span>
              {isAutoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoScroll ? 'Live Auto-Scroll: ON' : 'Auto-Scroll: Paused'}</span>
            </button>

            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <button
                onClick={() => {
                  setCurrentIndex(prev => (prev - 1 + screens.length) % screens.length);
                  setProgress(0);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title="Previous Screen"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-xs text-cyan-400 px-1">
                {currentIndex + 1} / {screens.length}
              </span>
              <button
                onClick={() => {
                  setCurrentIndex(prev => (prev + 1) % screens.length);
                  setProgress(0);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title="Next Screen"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
