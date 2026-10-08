import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Cloud, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Printer, 
  Boxes, 
  Lightbulb, 
  MessageSquare,
  Lock,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { AdsterraBanner728x90 } from './AdsterraBanner728x90';

interface EcosystemComboHubProps {
  onOpenRaqamFlow: () => void;
  onOpenNexaPlayer?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToAbout?: () => void;
}

export function EcosystemComboHub({
  onOpenRaqamFlow,
  onOpenNexaPlayer,
  onNavigateToContact,
  onNavigateToAbout
}: EcosystemComboHubProps) {
  return (
    <div className="w-full space-y-12 my-6">

      {/* ========================================================
          TIER 1: Why Noori Tech? (4 Core Architectural Pillars)
      ======================================================== */}
      <div className="bg-[#08131a] border border-slate-800/90 rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow Ambient Lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why Choose Noori Tech?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Architectural Pillars of <span className="text-emerald-400">Noori Tech</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu">
                (نوری ٹیک کا آف لائن، پرائیویسی فرسٹ اور ہائی پرفارمنس وژن)
              </p>
            </div>
            <p className="text-xs text-slate-400 max-w-md text-left md:text-right">
              Built from the ground up for zero latency, absolute data ownership, and clean distraction-free user experiences.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-[#0c1c24] border border-slate-800 hover:border-amber-400/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base mb-1.5 group-hover:text-amber-300 transition-colors">
                  100% Offline-First
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sub-millisecond local SQLite queries with Write-Ahead Logging (WAL). Zero internet dependence, no server timeouts, and 100% uptime in load shedding.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Response Speed</span>
                <span className="text-amber-400 font-mono font-bold">&lt; 2ms Latency</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-[#0c1c24] border border-slate-800 hover:border-emerald-400/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base mb-1.5 group-hover:text-emerald-300 transition-colors">
                  Zero Data Tracking
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your accounting records and media stay isolated in Linux UID device sandboxes. No telemetry tracking, no analytics spying, and zero third-party selling.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Privacy Status</span>
                <span className="text-emerald-400 font-mono font-bold">100% Confidential</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-[#0c1c24] border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base mb-1.5 group-hover:text-cyan-300 transition-colors">
                  Hardware Acceleration
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct GPU acceleration for 8K video rendering, 10-band IIR audio digital signal processing (DSP), and 60 FPS animations with negligible battery draw.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Rendering Engine</span>
                <span className="text-cyan-400 font-mono font-bold">60 FPS Hardware+</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl bg-[#0c1c24] border border-slate-800 hover:border-teal-400/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base mb-1.5 group-hover:text-teal-300 transition-colors">
                  Private Cloud Backup
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1-Tap encrypted synchronization directly into your personal Google Drive account via official Google OAuth 2.0. The developer has zero access.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Cloud Protocol</span>
                <span className="text-teal-400 font-mono font-bold">Encrypted OAuth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          Sponsored Ad Placement Directly Above Engineering Excellence
      ======================================================== */}
      <div className="w-full pt-2 pb-1">
        <AdsterraBanner728x90 />
      </div>

      {/* ========================================================
          TIER 2: Dual Ecosystem Comparison & Feature Launcher
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Two Specialized Domains</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Standard of Engineering Excellence
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Whether managing retail finance or immersing in high-definition acoustics, Noori Tech provides tailored applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Ecosystem Card A: Raqam Flow */}
          <div className="rounded-[28px] p-[2px] bg-gradient-to-b from-emerald-500/60 via-teal-500/40 to-slate-800 shadow-xl group hover:shadow-emerald-500/20 transition-all duration-300">
            <div className="bg-[#08131a] rounded-[26px] p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#0d2222] border-2 border-emerald-400 p-1 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-500/30">
                      <img src="/logo.png" alt="Raqam Flow" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase block">Commerce & Ledger</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white">Raqam Flow</h4>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Flagship v1.0.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Designed specifically for retail shopkeepers, wholesalers, and entrepreneurs across Pakistan to replace cumbersome paper registers.
                </p>

                <div className="space-y-2.5 pt-1">
                  {[
                    "Customer Udhar & Credit Ledger with billing photo receipts",
                    "Daily Roznamcha (Cashbook) with automatic drawer reconciliation",
                    "1-Tap professional WhatsApp billing PDF statements & reminders",
                    "30-Day Safety Recycle Bin with zero accidental loss guarantee"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenRaqamFlow}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                <span>Explore Raqam Flow Ledger</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Ecosystem Card B: Nexa Player Pro */}
          <div className="rounded-[28px] p-[2px] bg-gradient-to-b from-cyan-500/60 via-blue-500/40 to-slate-800 shadow-xl group hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="bg-[#08131a] rounded-[26px] p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-full bg-slate-950 border-4 border-cyan-400 p-0.5 flex items-center justify-center overflow-hidden shadow-lg shadow-cyan-500/30">
                      <img src="/nexa-player.jpg" alt="Nexa Player" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase block">Pro Media Engine</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white">Nexa Player Pro</h4>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    Pro Media v1.1.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  High-performance media powerhouse engineered for universal 8K/4K decoding, studio acoustic shaping, and smooth multitasking.
                </p>

                <div className="space-y-2.5 pt-1">
                  {[
                    "Hardware-accelerated 8K & 4K decoding (MKV, MP4, MOV, HEVC)",
                    "10-Band Studio Hardware Equalizer with Bass Boost & 3D Reverb",
                    "Floating Picture-in-Picture (PiP) multitasking & background audio",
                    "AMOLED Pure Black theme with intuitive swipe volume gestures"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenNexaPlayer || onOpenRaqamFlow}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              >
                <span>Explore Nexa Player Pro</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TIER 3: Upcoming Roadmap & Community Innovation Desk
      ======================================================== */}
      <div className="bg-[#08131a] border border-slate-800/90 rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
          
          {/* Left: Future Teasers */}
          <div className="space-y-5 lg:w-2/3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-white">Innovation Roadmap & Pipeline</h4>
                <p className="text-xs text-slate-400">Next utility releases planned under Noori Tech software studio</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Pipeline 1 */}
              <div className="p-4 rounded-2xl bg-[#0c1c24] border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-extrabold text-sm text-white">Bluetooth POS Printer Suite</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      In Development
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Direct 58mm/80mm thermal receipt printing, custom store logos, Urdu receipt lines, and instant payment slips.
                  </p>
                </div>
              </div>

              {/* Pipeline 2 */}
              <div className="p-4 rounded-2xl bg-[#0c1c24] border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-extrabold text-sm text-white">Smart Inventory & Barcode</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      Planned
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Fast camera batch barcode scanning, low-stock threshold warnings, and wholesale profit margin tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Suggest an App Idea Card */}
          <div className="lg:w-1/3 bg-gradient-to-br from-[#10252a] to-[#0c1c24] border border-teal-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-teal-400 mb-2">
                <Lightbulb className="w-5 h-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider">User-Driven Software</span>
              </div>
              <h5 className="font-black text-white text-base">Have an App Idea or Feature Request?</h5>
              <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                Every application in Noori Tech is shaped by real feedback. Send your proposal directly to Muhammad Yousuf Noori.
              </p>
            </div>

            <button
              onClick={onNavigateToContact || onNavigateToAbout}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 hover:text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Developer Directly</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
