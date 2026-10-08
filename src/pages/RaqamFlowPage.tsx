import React, { Suspense, lazy } from 'react';
import { Download, BookOpen, Banknote, MessageCircle, Smartphone, Cloud, Globe, ShieldCheck, HelpCircle, Sparkles, Folder, Layers, Check } from 'lucide-react';
import { LiveStatsBanner, trackApkDownload } from '../components/LiveStatsBanner';
import { ReviewsSection } from '../components/ReviewsSection';
import { FaqSection } from './FaqPage';
import { Page } from '../types';

// Code-split heavy 3D phone model
const PhoneShowcase3D = lazy(() => import('../components/PhoneShowcase3D').then(m => ({ default: m.PhoneShowcase3D })));

export function FeatureGlassCard({ 
  number,
  icon, 
  title, 
  desc, 
  badge,
  features
}: { 
  number: string;
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  badge?: string;
  features?: string[];
}) {
  return (
    <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-b from-slate-200/90 via-emerald-500/20 to-slate-200/40 dark:from-emerald-500/30 dark:via-teal-500/10 dark:to-white/5 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
      <div className="h-full w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[22px] p-6 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
        
        {/* Subtle glow orb */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none"></div>
        
        {/* Number watermark in background */}
        <div className="absolute right-4 top-4 text-4xl font-black text-slate-100 dark:text-slate-900 select-none pointer-events-none transition-colors group-hover:text-emerald-500/10 dark:group-hover:text-emerald-400/10">
          {number}
        </div>

        <div>
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-slate-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-emerald-500 group-hover:to-teal-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300">
              {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            {badge && (
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-emerald-400/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-all shadow-xs">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {desc}
          </p>

          {features && features.length > 0 && (
            <div className="space-y-1.5">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RaqamFlowPage({ navigateTo }: { navigateTo: (p: Page) => void }) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Top Breadcrumb / Apps Suite Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => navigateTo('apps')}
            className="text-emerald-400 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>📱 Noori Tech</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Raqam Flow (Flagship)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 lg:pt-12 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Hero Text */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white">
            Aap Ka Apna Smart <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-300 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Digital Khata
            </span><br className="hidden sm:block" />
            {' '}& Expense Manager
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed transition-colors px-2 sm:px-0">
            Manage daily udhar, keep track of customer ledgers, and secure your business data with 100% automatic Google Drive Cloud Backup.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <a 
              href="https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1" 
              onClick={trackApkDownload}
              className="w-full sm:w-auto relative group flex items-center justify-center space-x-3 px-8 py-4 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-2xl font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] active:scale-95 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 dark:bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Download className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              <span className="relative z-10">Download Raqam Flow</span>
            </a>
          </div>
        </div>
        
        {/* 3D Animated Mobile Showcase Slider */}
        <div className="lg:w-1/2 flex justify-center w-full min-h-[420px]">
          <Suspense fallback={
            <div className="w-full h-96 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <PhoneShowcase3D />
          </Suspense>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-500/10 border border-emerald-300/60 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Khata Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Core <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">Feature</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto font-light">
            Designed specifically for shopkeepers and enterprise businesses with cutting-edge security, speed, and real-time offline workflows.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureGlassCard 
            number="01"
            icon={<BookOpen />} 
            title="Dokandar & Customer Khata" 
            desc="Easily manage separate ledgers. Keep clear records of 'Maine Diye' and 'Mujhe Mile' with exact dates."
            badge="Essential"
            features={["Separate Customer/Supplier", "Maine Diye / Mujhe Mile"]}
          />
          <FeatureGlassCard 
            number="02"
            icon={<Banknote />} 
            title="Daily Cashbook" 
            desc="Track daily cash in and cash out easily. View daily profits, cash balances, and expenses in real-time."
            badge="Financial"
            features={["Cash In / Cash Out", "Real-Time Balance"]}
          />
          <FeatureGlassCard 
            number="03"
            icon={<MessageCircle />} 
            title="SMS & WhatsApp Reminders" 
            desc="Send automated payment reminder messages to customers directly via WhatsApp or SMS in a single tap."
            badge="Automation"
            features={["1-Tap WhatsApp share", "Auto Free SMS alerts"]}
          />
          <FeatureGlassCard 
            number="04"
            icon={<Smartphone />} 
            title="Offline Local Storage" 
            desc="Works entirely offline. All transactions are saved locally on your phone instantly without internet."
            badge="Fast & Safe"
            features={["100% Zero-Lag Speed", "No Internet Required"]}
          />
          <FeatureGlassCard 
            number="05"
            icon={<Cloud />} 
            title="Google Cloud Backup" 
            desc="100% automatic secure backups to your own Google Drive. Never lose your business data."
            badge="1-Click Sync"
            features={["Private Google Drive", "Auto Daily Backups"]}
          />
          <FeatureGlassCard 
            number="06"
            icon={<Globe />} 
            title="9+ Languages Supported" 
            desc="Use app in Urdu, Roman Urdu, Pashto, Sindhi, English, Arabic, Persian, Turkish, or French."
            badge="Multilingual"
            features={["Urdu & Roman Urdu", "Regional Pakistani Languages"]}
          />
          <FeatureGlassCard 
            number="07"
            icon={<ShieldCheck />} 
            title="High Security" 
            desc="Your data is encrypted. Lock your app using built-in PIN or Biometric Fingerprint."
            badge="Encrypted"
            features={["Biometric Fingerprint", "Device Encryption"]}
          />
          <FeatureGlassCard 
            number="08"
            icon={<HelpCircle />} 
            title="Business Reports" 
            desc="Generate detailed PDFs and reports of your daily sales and customer ledgers easily."
            badge="Export PDF"
            features={["Printable PDF Statements", "Date-Range Filters"]}
          />
        </div>

        {/* How to install "Raqam Flow Apk ka Apna Digital Khata App" Section */}
        <div className="mt-16 relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-amber-500/40 shadow-2xl overflow-hidden">
          <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    How to install "Raqam Flow Apk ka Apna Digital Khata App"
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step guide to download & install the official Android APK</p>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Easy Installation
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                      1
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Step 1
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                    Download Official APK
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Click the "Download APK" button on this website to save the official Raqam Flow Android installer package.
                  </p>
                </div>

                {/* Step 1 Android Internal Storage Screenshot Graphic */}
                <div className="w-full rounded-2xl bg-slate-900 border border-emerald-500/40 p-3 flex flex-col justify-between overflow-hidden relative shadow-lg">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center space-x-1.5 font-bold text-slate-300">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Internal storage</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-sans font-bold border border-emerald-500/20">
                      Step 1 Screenshot
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 font-sans my-1">
                    <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">📁</div>
                      <span className="truncate">Android</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-slate-100 shadow-md">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-400">📦</div>
                        <div className="truncate">
                          <p className="text-[11px] font-bold text-emerald-300 truncate">Raqam-Flow...Apk.apk</p>
                          <p className="text-[9px] text-slate-400">Download folder</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/30 px-2 py-0.5 rounded-full">Tap APK</span>
                    </div>
                    <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">📁</div>
                      <span className="truncate">DCIM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-teal-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                      2
                    </span>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                      Step 2
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                    Allow Installation
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    If prompted by Android with <em>"Install unknown apps"</em>, click <strong>Settings</strong> and enable <strong>"Allow from this source"</strong>.
                  </p>
                </div>

                <div className="w-full rounded-2xl bg-slate-800 border border-teal-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                  <div className="absolute inset-0 bg-slate-950/60"></div>
                  <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-3xl p-4 shadow-2xl flex flex-col">
                    <div className="text-[14px] text-slate-900 font-bold mb-1 text-left pl-1">Install unknown app?</div>
                    <div className="text-[11px] text-slate-600 mb-3 text-left pl-1">Allow browser to install APK?</div>
                    <div className="w-full bg-[#415a8c] text-white text-[11px] py-1.5 rounded-[10px] text-center font-medium mt-1">OK</div>
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
                    Once installed, tap the <strong>Open</strong> button to start using Raqam Flow!
                  </p>
                </div>

                <div className="w-full rounded-2xl bg-slate-800 border border-cyan-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                  <div className="absolute inset-0 bg-slate-950/60"></div>
                  <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-3xl p-4 shadow-2xl flex flex-col">
                    <div className="text-[15px] text-slate-900 font-normal mb-4 text-left pl-1">App installed.</div>
                    <div className="flex items-center space-x-3 mb-8 pl-1">
                       <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center overflow-hidden shrink-0 relative shadow-sm">
                            <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-full" />
                       </div>
                       <div className="text-[13px] text-slate-900 font-medium">Raqam Flow</div>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-2 w-full">
                      <div className="text-[#415a8c] text-[12px] px-3 py-1.5 rounded-full border border-[#dce0e9] font-medium">Close</div>
                      <div className="relative inline-block">
                        <div className="bg-[#415a8c] text-white text-[12px] px-4 py-1.5 rounded-full font-medium relative z-10">Open</div>
                        <div className="absolute -inset-1.5 border-[1.5px] border-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.6)] bg-cyan-400/20 z-0 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Reviews & Feedback for Raqam Flow */}
      <div id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 relative z-10 scroll-mt-24">
        <ReviewsSection appId="raqam-flow" appName="Raqam Flow" themeColor="emerald" />
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <FaqSection />
      </div>

      {/* Real-Time Visitor & Download Metrics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        <LiveStatsBanner />
      </div>
    </div>
  );
}
