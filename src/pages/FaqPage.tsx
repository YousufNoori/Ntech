import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Layers, Banknote } from 'lucide-react';
import { Page } from '../types';

export const ContentWrapper = ({ 
  title, 
  subTitle, 
  icon, 
  children 
}: { 
  title: string; 
  subTitle?: string; 
  icon: React.ReactNode; 
  children: React.ReactNode 
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 animate-in slide-in-from-bottom-8 duration-700">
    <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 border-b border-slate-200 dark:border-white/10 pb-4 sm:pb-6 gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-2xl flex-shrink-0 border border-emerald-500/20">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h2>
            {subTitle && (
              <p className="font-urdu text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{subTitle}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-slate-700 dark:text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export function FaqSection({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'general' | 'raqam' | 'nexa'>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const generalFaqs = [
    {
      q: "Are NooriTech applications 100% free of invasive advertisements?",
      a: "Yes, absolutely! We strictly ban banners, pop-up videos, or intrusive interstitial ads. We believe in providing a clean, premium, distraction-free environment for both productivity and media playback."
    },
    {
      q: "Where is Muhammad Yousuf Noori (NooriTech) located?",
      a: "Muhammad Yousuf Noori is an independent premium Android software developer located in Pakistan (🇵🇰). All apps are designed, compiled, and tested locally."
    },
    {
      q: "Can I download and install official APK packages directly?",
      a: "Yes! You can download official, cryptographically signed APK packages directly from our official web portfolio, which guarantees authentic, secure builds."
    },
    {
      q: "Do NooriTech apps work offline?",
      a: "Yes! Offline-first architecture is our core engineering pillar. All critical operations in Raqam Flow and Nexa Player work 100% offline with zero lag, using fast local databases."
    }
  ];

  const raqamFaqs = [
    {
      q: "Is my shop's cash book and credit ledger data stored on a server?",
      a: "No! All ledger accounts, customer entries, cash flows, and credit files are saved strictly on your local device's high-speed Room SQLite database. We do not operate any background data-harvesting servers."
    },
    {
      q: "How secure is the Google Drive Cloud Sync feature?",
      a: "Highly secure. It leverages official Google OAuth 2.0 to establish a private connection between the app and your personal Google Drive account. The data is saved inside an isolated, encrypted application folder where only you have access."
    },
    {
      q: "Can I print customer transactions or generate billing records?",
      a: "Yes! Raqam Flow allows you to export clean PDF invoices, customer transaction ledgers, and cash book spreadsheets, which you can easily print or share."
    },
    {
      q: "What happens if I lose my phone? Can I recover my credit books?",
      a: "Yes! If you have enabled Google Drive cloud sync or have saved a local JSON/ZIP backup, simply install Raqam Flow on your new phone, log in, and click 'Restore Backup' to retrieve your accounts."
    }
  ];

  const nexaFaqs = [
    {
      q: "What video formats does Nexa Player Pro support?",
      a: "Nexa Player features universal media decoding. It natively plays MKV, MP4, AVI, MOV, WebM, TS, FLV, and MP3 files. It supports advanced 4K, 8K, and HDR playback with zero frame-drops."
    },
    {
      q: "How does 10-Band Hardware Equalizer improve audio?",
      a: "Our advanced DSP audio core communicates directly with your device's audio hardware, allowing real-time equalization, heavy bass-boosting, 3D surround sound virtualization, and vocal clarity enhancement."
    },
    {
      q: "Is there a floating popup/picture-in-picture mode?",
      a: "Yes! Nexa Player supports floating Picture-in-Picture (PIP) mode, allowing you to watch videos or listen to lectures while replying to messages or browsing other apps."
    },
    {
      q: "Does it support subtitle downloading and synchronization?",
      a: "Yes! Nexa Player includes an online subtitle finder where you can search, download, and synchronize multi-language subtitles (SRT, SSA, ASS) directly inside the video interface."
    }
  ];

  const getFaqsByTab = () => {
    switch (activeTab) {
      case 'raqam': return raqamFaqs;
      case 'nexa': return nexaFaqs;
      case 'general':
      default:
        return generalFaqs;
    }
  };

  const filteredFaqs = getFaqsByTab().filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getThemeColors = () => {
    switch (activeTab) {
      case 'raqam':
        return {
          accent: 'text-emerald-500 dark:text-emerald-400',
          bgAccent: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          buttonActive: 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 border-emerald-500',
          hover: 'hover:bg-emerald-500/10'
        };
      case 'nexa':
        return {
          accent: 'text-cyan-500 dark:text-cyan-400',
          bgAccent: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          buttonActive: 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 border-cyan-500',
          hover: 'hover:bg-cyan-500/10'
        };
      case 'general':
      default:
        return {
          accent: 'text-teal-500 dark:text-teal-400',
          bgAccent: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
          buttonActive: 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30 border-teal-500',
          hover: 'hover:bg-teal-500/10'
        };
    }
  };

  const colors = getThemeColors();

  const content = (
    <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300">
      
      {/* Header and Interactive Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-2xl ${colors.bgAccent} border flex items-center justify-center transition-colors shadow-inner`}>
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Find answers to common questions about NooriTech apps and services.</p>
          </div>
        </div>

        {/* Live Search Bar inside FAQs */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-all"
          />
          <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Interactive Tabs Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">
        <button
          onClick={() => { setActiveTab('general'); setOpenIndex(0); }}
          className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'general' ? colors.buttonActive : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>General</span>
        </button>
        <button
          onClick={() => { setActiveTab('raqam'); setOpenIndex(0); }}
          className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'raqam' ? colors.buttonActive : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Banknote className="w-4 h-4" />
          <span>Raqam Flow</span>
        </button>
        <button
          onClick={() => { setActiveTab('nexa'); setOpenIndex(0); }}
          className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'nexa' ? colors.buttonActive : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <img src="/nexa-player.jpg" alt="Nexa" className="w-4.5 h-4.5 rounded-full object-cover inline-block" />
          <span>Nexa Player</span>
        </button>
      </div>

      {/* FAQs List with Collapsible Accordion */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-white/5">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No matching FAQs found.</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for other words or clear the search query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`rounded-2xl border transition-all duration-300 bg-slate-50/50 dark:bg-slate-950/40 ${
                  isOpen 
                    ? 'border-emerald-500/30 dark:border-emerald-500/20 shadow-md shadow-emerald-500/5' 
                    : 'border-slate-200 dark:border-white/5'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between space-x-3 transition-colors cursor-pointer rounded-2xl"
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-start space-x-3">
                    <span className={`font-black ${colors.accent} shrink-0 mt-0.5`}>Q.</span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90 ' + colors.accent : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Support Desk Redirect */}
      {navigateTo && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-slate-200 dark:border-white/5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Still have questions or need technical support?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get directly in touch with Muhammad Yousuf Noori on our Support Desk.</p>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 cursor-pointer shrink-0"
          >
            Contact Support Desk
          </button>
        </div>
      )}
    </div>
  );

  if (navigateTo) {
    return <ContentWrapper title="Frequently Asked Questions (FAQ)" icon={<HelpCircle className="w-8 h-8" />}>{content}</ContentWrapper>;
  }

  return content;
}

export default function FaqPage({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  return <FaqSection navigateTo={navigateTo} />;
}
