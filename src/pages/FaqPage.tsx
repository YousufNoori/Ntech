import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

const FAQ_DATA = {
  general: [
    {
      q: 'Are NooriTech applications 100% free of invasive advertisements?',
      a: 'Yes. We strictly ban banners, pop-up videos, and intrusive interstitial ads so both accounting and media workflows stay completely distraction-free.',
    },
    {
      q: 'Where is Muhammad Yousuf Noori (NooriTech) based?',
      a: 'Muhammad Yousuf Noori is an independent Android software developer based in Pakistan. Every app is designed, compiled, and tested locally.',
    },
    {
      q: 'Can I download and install official APK packages directly?',
      a: 'Yes. You can download cryptographically signed official APK packages directly from this website, ensuring authentic builds without third-party tampering.',
    },
    {
      q: 'Do NooriTech apps work offline?',
      a: 'Yes. Offline-first architecture is our core principle. All essential operations in Raqam Flow and Nexa Player Pro run 100% offline with zero lag.',
    },
  ],
  raqam: [
    {
      q: 'Is my shop cash book and credit ledger data stored on an external server?',
      a: 'No. All ledger accounts, customer entries, and daily cash records are stored locally on your device using a sandboxed Room SQLite database.',
    },
    {
      q: 'How secure is the Google Drive Cloud Sync feature?',
      a: 'It uses official Google OAuth 2.0 to create a private connection between Raqam Flow and your own Google Drive app folder. Only you can access your backup files.',
    },
    {
      q: 'Can I print customer transactions or generate billing PDFs?',
      a: 'Yes. Raqam Flow exports clean PDF invoices, customer transaction statements, and cashbook reports ready for WhatsApp sharing or printing.',
    },
    {
      q: 'What happens if I lose my phone? Can I recover my credit books?',
      a: 'Yes. If you enabled Google Drive cloud backup or saved a local backup file, install Raqam Flow on your new phone, sign in, and tap Restore Backup.',
    },
  ],
  nexa: [
    {
      q: 'What video formats does Nexa Player Pro support?',
      a: 'Nexa Player plays MKV, MP4, AVI, MOV, WebM, TS, FLV, and MP3 files natively, including high-bitrate 4K, 8K, and HDR streams.',
    },
    {
      q: 'How does the 10-Band Equalizer improve audio?',
      a: 'Our audio DSP lets you adjust 10 individual frequency bands in real time, enable Bass Boost, and toggle 3D surround virtualization.',
    },
    {
      q: 'Is there a floating popup / Picture-in-Picture mode?',
      a: 'Yes. Nexa Player supports Picture-in-Picture (PiP) mode so you can keep watching videos while replying to messages or browsing other apps.',
    },
    {
      q: 'Does it support subtitle downloading and synchronization?',
      a: 'Yes. Nexa Player includes an online subtitle finder supporting SRT, SSA, and ASS formats with timing synchronization and font styling.',
    },
  ],
};

type FaqTab = 'general' | 'raqam' | 'nexa';

export default function FaqPage({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<FaqTab>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_DATA[activeTab].filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const accentText = activeTab === 'nexa' ? 'text-cyan-400' : 'text-emerald-400';

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <PageHeader
        kicker="Knowledge Base"
        title="Frequently Asked Questions"
        description="Quick answers about NooriTech applications, offline data security, cloud backups, and Android APK installation."
        breadcrumbLabel="FAQ"
        navigateTo={navigateTo}
      >
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search FAQs"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0b111c] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
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
      </PageHeader>

      {/* Segmented Category Tabs */}
      <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b111c] border border-white/[0.08]">
        {[
          { id: 'general' as const, label: 'General' },
          { id: 'raqam' as const, label: 'Raqam Flow' },
          { id: 'nexa' as const, label: 'Nexa Player' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                active
                  ? tab.id === 'nexa'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-base font-semibold text-white">No matching questions found</p>
            <p className="text-sm text-slate-400">
              Try another keyword or clear your search query.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 px-4 py-2 rounded-lg bg-white text-slate-950 text-xs font-semibold cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                      <span className={`font-mono mr-2.5 ${accentText}`}>
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform ${
                        isOpen ? `rotate-180 ${accentText}` : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 pl-8 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Support Redirect */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Still have questions?</h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Reach out to Muhammad Yousuf Noori on our official support desk.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo?.('contact')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          Contact Support Desk
        </button>
      </div>
    </div>
  );
}
