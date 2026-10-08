import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Pause, Play, Sparkles, Smartphone, 
  Volume2, VolumeX, Maximize, RotateCcw, Sliders, Lock, ShieldCheck, 
  Folder, Film, Music, Subtitles, Settings, Layers, FastForward, 
  Rewind, Eye, Heart, Download, Check, Star, Fingerprint, Radio,
  Share2, ArrowLeft, ArrowUpRight
} from 'lucide-react';

export interface NexaScreenData {
  id: number;
  title: string;
  tag: string;
  description: string;
  badgeColor: string;
  renderScreen: () => React.ReactNode;
}

export function NexaPhoneShowcase3D() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 for next, -1 for prev

  const screens: NexaScreenData[] = [
    {
      id: 1,
      title: "4K Ultra HD Cinema Player",
      tag: "Live 4K Cinema Engine",
      description: "Hardware-accelerated 4K/8K video playback, HDR10+ color grading & smart gesture controls.",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      renderScreen: () => (
        <div className="w-full h-full bg-[#030914] text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Top Status Bar */}
          <div className="h-6 bg-[#061224] px-4 flex items-center justify-between text-[10px] text-cyan-300 font-medium pt-1 border-b border-cyan-900/30">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[8px] font-bold px-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">HDR10+</span>
              <span className="text-[9px] font-mono">5G</span>
              <div className="w-3.5 h-2 bg-cyan-400 rounded-xs"></div>
            </div>
          </div>

          {/* Video Player Display Area */}
          <div className="relative flex-1 bg-gradient-to-b from-[#0a192f] via-[#050f1e] to-[#02060e] p-3 flex flex-col justify-between overflow-hidden">
            {/* Ambient Glowing Video Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 via-teal-500/10 to-blue-600/20 rounded-xl m-2 border border-cyan-500/30 overflow-hidden flex items-center justify-center">
              <div className="text-center p-3">
                <div className="w-13 h-13 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/30 animate-pulse mb-2">
                  <Play className="w-6 h-6 fill-cyan-400 translate-x-0.5" />
                </div>
                <div className="text-xs font-black tracking-wide text-cyan-100">Avatar_2_Way_of_Water_4K.mkv</div>
                <div className="text-[9px] text-cyan-400/80 font-mono mt-0.5">3840x2160 • 60 FPS • HEVC H.265</div>
                
                {/* Dynamic Subtitle Overlay */}
                <div className="mt-3 inline-block px-3 py-1 bg-black/85 backdrop-blur-md rounded-lg text-[10px] font-bold text-amber-300 border border-amber-500/30 shadow-md">
                  "The sea is all around us and in us..."
                </div>
              </div>
            </div>

            {/* Gesture HUD Badges */}
            <div className="absolute top-14 left-4 z-20 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/20 flex items-center space-x-1 text-[9px] text-cyan-300">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              <span>Brightness: 85%</span>
            </div>
            <div className="absolute top-14 right-4 z-20 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/20 flex items-center space-x-1 text-[9px] text-cyan-300">
              <Volume2 className="w-2.5 h-2.5 text-cyan-400" />
              <span>Volume: 100%</span>
            </div>

            {/* Top Video Overlay Bar */}
            <div className="relative z-10 flex items-center justify-between bg-slate-950/70 backdrop-blur-md p-2 rounded-xl border border-white/10 text-xs">
              <div className="flex items-center space-x-1.5">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-slate-100 text-[10px] truncate max-w-[130px]">4K Ultra HD Engine</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-cyan-400">
                <Subtitles className="w-3.5 h-3.5 text-emerald-400" />
                <Settings className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-2xl border border-cyan-500/30 space-y-1.5 mt-auto">
              {/* Progress Seekbar */}
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="h-full w-2/3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-cyan-300/80">
                  <span>01:14:22</span>
                  <span>02:48:00</span>
                </div>
              </div>

              {/* Playback Buttons */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center space-x-1 text-cyan-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold">100%</span>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <Rewind className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
                  <div className="w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-cyan-400/40">
                    <Pause className="w-3.5 h-3.5 fill-slate-950" />
                  </div>
                  <FastForward className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
                </div>

                <div className="flex items-center space-x-1.5 text-cyan-400">
                  <Lock className="w-3.5 h-3.5 text-slate-300" />
                  <Maximize className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "10-Band Studio Equalizer & Bass Boost",
      tag: "DSP Audio Engine",
      description: "10 customizable frequency bands, 3D spatial reverb, dynamic bass boost, and custom acoustic presets.",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      renderScreen: () => (
        <div className="w-full h-full bg-[#05111a] text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-6 bg-[#081a26] px-4 flex items-center justify-between text-[10px] text-teal-300 font-medium pt-1 border-b border-teal-900/30">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[8px] font-bold px-1 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">DSP ON</span>
              <div className="w-3.5 h-2 bg-teal-400 rounded-xs"></div>
            </div>
          </div>

          {/* Equalizer Header */}
          <div className="p-3 bg-[#0a2333] flex items-center justify-between border-b border-teal-500/20">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <div>
                <h4 className="text-xs font-black text-white">Equalizer Pro</h4>
                <p className="text-[9px] text-teal-300 font-mono">10-Band Hardware DSP</p>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[9px] font-black">
              ACTIVE
            </div>
          </div>

          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {/* Presets Horizontal Selector */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['Custom', 'Rock', 'Pop', 'Bass Boost', 'Vocal', 'Classical'].map((pr, i) => (
                <span 
                  key={pr} 
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                    i === 0 
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                      : 'bg-slate-900/80 text-slate-300 border border-white/5'
                  }`}
                >
                  {pr}
                </span>
              ))}
            </div>

            {/* Dials: Bass Boost & 3D Virtualizer */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  +6dB
                </div>
                <span className="text-[9px] text-slate-300 font-bold mt-1">Bass Boost</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-teal-500/20 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center font-mono font-bold text-xs text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                  75%
                </div>
                <span className="text-[9px] text-slate-300 font-bold mt-1">3D Virtualizer</span>
              </div>
            </div>

            {/* 10 EQ Frequency Sliders Graphic Preview */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-teal-500/20 space-y-2">
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span>+12dB</span>
                <span className="text-cyan-400 font-bold">10 Frequency Bands</span>
                <span>-12dB</span>
              </div>

              {/* 10 Vertical Sliders Representation */}
              <div className="flex items-center justify-between h-20 pt-1">
                {[65, 80, 50, 45, 60, 75, 85, 70, 60, 80].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end w-2">
                    <div className="w-1.5 h-16 bg-slate-800 rounded-full relative overflow-hidden flex flex-col justify-end">
                      <div 
                        className="w-full bg-gradient-to-t from-teal-400 to-cyan-400 rounded-full" 
                        style={{ height: `${val}%` }}
                      ></div>
                    </div>
                    <span className="text-[7px] text-slate-400 font-mono mt-1">
                      {['31', '62', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acoustic Limiter Badge */}
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between text-[9px] text-teal-300 font-medium">
              <span>Dynamic Headroom Protection</span>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Floating Picture-in-Picture (PIP)",
      tag: "Multi-Tasking Mode",
      description: "Watch movies or lectures in a resizable floating window while chatting on WhatsApp or browsing.",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      renderScreen: () => (
        <div className="w-full h-full bg-[#0a0f1d] text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-6 bg-slate-950 px-4 flex items-center justify-between text-[10px] text-slate-300 font-medium pt-1">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span>5G</span>
              <div className="w-3.5 h-2 bg-slate-300 rounded-xs"></div>
            </div>
          </div>

          {/* Simulated Home Screen / Multitasking Environment */}
          <div className="relative flex-1 p-3 space-y-3 bg-gradient-to-b from-slate-900 to-[#070b14]">
            {/* App Grid on Device Home Screen */}
            <div className="grid grid-cols-4 gap-3 pt-2 text-center text-[9px] text-slate-300">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                  <span className="font-black text-xs">RF</span>
                </div>
                <span>Raqam Flow</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-md">
                  <span className="font-bold text-[10px]">WA</span>
                </div>
                <span>WhatsApp</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <span className="font-bold text-[10px]">Web</span>
                </div>
                <span>Chrome</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md">
                  <Folder className="w-5 h-5 text-white" />
                </div>
                <span>Files</span>
              </div>
            </div>

            {/* FLOATING PIP WINDOW Active Over Screen */}
            <div className="mt-4 p-2.5 rounded-2xl bg-slate-950/95 border-2 border-cyan-400 shadow-[0_10px_35px_rgba(6,182,212,0.4)] space-y-2 relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center justify-between text-[9px] text-cyan-300 font-bold border-b border-cyan-500/20 pb-1">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Nexa Floating PIP</span>
                </span>
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  PIP Mode
                </span>
              </div>

              {/* Video Content inside Floating Window */}
              <div className="h-28 rounded-xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-blue-950 relative overflow-hidden flex flex-col justify-between p-2 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">4K UHD</span>
                  <div className="w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white text-[10px]">✕</div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 mx-auto rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md">
                    <Play className="w-4 h-4 fill-cyan-400 translate-x-0.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[8px] text-cyan-300 font-mono">
                  <span>00:45:10</span>
                  <Maximize className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="text-center text-[9px] text-slate-300 font-medium">
                Drag anywhere or pinch to resize
              </div>
            </div>

            {/* Status Footer Callout */}
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-between text-[9px] text-cyan-300">
              <span>Background Multi-Window Active</span>
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Hi-Res Audio & Background Player",
      tag: "Hi-Res Audio Player",
      description: "Keep listening to your favorite songs, qawwalis, and podcasts even when your screen is locked.",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      renderScreen: () => (
        <div className="w-full h-full bg-[#0d071c] text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-6 bg-[#160b2e] px-4 flex items-center justify-between text-[10px] text-purple-300 font-medium pt-1 border-b border-purple-900/30">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[8px] font-bold px-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">FLAC 24-BIT</span>
              <div className="w-3.5 h-2 bg-purple-400 rounded-xs"></div>
            </div>
          </div>

          <div className="flex-1 p-3 flex flex-col justify-between space-y-2">
            {/* Spinning Vinyl Visualizer */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-500/40 bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-950 p-2 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.35)] relative">
                <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center">
                  <Music className="w-5 h-5 text-purple-400" />
                </div>
              </div>

              {/* Animated Audio Waveform */}
              <div className="flex items-center space-x-1 pt-3">
                {[40, 70, 95, 60, 85, 100, 75, 90, 55, 80, 45].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse" 
                    style={{ height: `${h * 0.22}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Track Info */}
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-purple-500/25 space-y-2 text-center">
              <div>
                <h4 className="text-xs font-black text-white">Sufi Acoustic Medley 4K</h4>
                <p className="text-[9px] text-purple-300/80 font-mono">NooriSound Studio • FLAC 96kHz / 24-bit</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="h-full w-1/2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-purple-300/70">
                  <span>02:15</span>
                  <span>04:30</span>
                </div>
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-center space-x-4 pt-1">
                <Rewind className="w-4 h-4 text-slate-400" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/40">
                  <Pause className="w-4 h-4 fill-white" />
                </div>
                <FastForward className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Lockscreen Notification Banner */}
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between text-[9px] text-purple-300">
              <span className="font-bold">Lockscreen Background Player Active</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">Screen-Off Play</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Biometric Private Video Vault",
      tag: "AES-256 Encrypted Vault",
      description: "Hide personal videos, family clips, and private downloads behind biometric fingerprint and PIN code.",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      renderScreen: () => (
        <div className="w-full h-full bg-[#120f08] text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-6 bg-[#1a1408] px-4 flex items-center justify-between text-[10px] text-amber-300 font-medium pt-1 border-b border-amber-900/30">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <div className="w-3.5 h-2 bg-amber-400 rounded-xs"></div>
            </div>
          </div>

          <div className="flex-1 p-3 flex flex-col justify-between text-center space-y-3">
            <div className="pt-2">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-500/15 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-black text-white mt-2">Private Secure Vault</h4>
              <p className="text-[9px] text-amber-300/80">AES-256 Hardware Encrypted Folder</p>
            </div>

            {/* Fingerprint Biometric Scanner */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/25 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-inner animate-pulse">
                <Fingerprint className="w-7 h-7" />
              </div>
              <p className="text-[9px] text-slate-300">Touch Fingerprint Sensor to Unlock</p>

              {/* PIN Code Dots */}
              <div className="flex justify-center space-x-2 pt-1">
                {[1, 2, 3, 4].map((d) => (
                  <div key={d} className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></div>
                ))}
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[9px] text-amber-300 space-y-0.5">
              <span className="font-bold block">100% Offline Device Sandboxing</span>
              <span className="text-[8px] text-slate-400">Hidden from Gallery and file managers</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, screens.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const currentScreen = screens[currentIndex];

  return (
    <div 
      className="relative flex flex-col items-center justify-center py-2 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Phone Hardware Mockup Frame */}
      <div className="relative flex flex-col items-center">
        
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* External Cinema Cyan Neon Glow */}
          <div className="absolute -inset-1.5 rounded-[46px] bg-gradient-to-b from-cyan-500/30 via-teal-500/20 to-emerald-500/20 blur-md pointer-events-none"></div>

          {/* Smartphone Outer Titanium Frame */}
          <div className="relative w-[270px] sm:w-[290px] h-[530px] sm:h-[560px] rounded-[44px] bg-[#0c1622] p-[9px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-cyan-500/40 ring-1 ring-white/10">
            
            {/* Screen Inner Bezel */}
            <div className="w-full h-full rounded-[36px] bg-black overflow-hidden relative flex flex-col border border-slate-800">
              
              {/* Dynamic Island / Camera Punch-Hole */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5 border border-slate-800 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-950"></div>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]"></div>
              </div>

              {/* Dynamic Light Sheen Sweep on Switch */}
              <motion.div 
                key={`sheen-${currentIndex}`}
                initial={{ x: '-100%', opacity: 0.6 }}
                animate={{ x: '250%', opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-40"
              />

              {/* Permanent Glass Top Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30"></div>

              {/* Animated Screen Content Switcher */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentScreen.id}
                  custom={direction}
                  initial={{ 
                    x: direction > 0 ? 50 : -50,
                    opacity: 0,
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{ 
                    x: direction > 0 ? -50 : 50,
                    opacity: 0,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="w-full h-full"
                >
                  {currentScreen.renderScreen()}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

        {/* Ambient Shadow Beneath Phone */}
        <div className="w-48 sm:w-56 h-3 rounded-full bg-cyan-950/50 blur-lg mt-2 pointer-events-none"></div>

        {/* Left & Right Glass Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute -left-3 sm:-left-5 top-[52%] -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-white hover:bg-cyan-500 hover:text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
          aria-label="Previous Screen"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute -right-3 sm:-right-5 top-[52%] -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-white hover:bg-cyan-500 hover:text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
          aria-label="Next Screen"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* Screen Details Box - Sleek Glassmorphism */}
      <div className="w-[270px] sm:w-[290px] mx-auto mt-2 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl text-center space-y-1"
          >
            <div className="flex items-center justify-center space-x-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentScreen.badgeColor}`}>
                {currentScreen.tag}
              </span>
            </div>
            
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
              {currentScreen.title}
            </h4>

            <p className="text-[11px] text-slate-300 font-light leading-relaxed">
              {currentScreen.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {screens.map((screen, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-6 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]' 
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to screen ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
}
