import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

type GuideCategory = 'all' | 'getting-started' | 'nexa-player' | 'backups' | 'troubleshooting';

const GUIDES: {
  id: number;
  category: Exclude<GuideCategory, 'all'>;
  categoryLabel: string;
  title: string;
  steps: string[];
}[] = [
  {
    id: 1,
    category: 'getting-started',
    categoryLabel: 'Raqam Flow · Getting Started',
    title: 'Creating Your First Customer Credit & Daily Cash Entries',
    steps: [
      'Open Raqam Flow and tap Add Customer on the Customer Credit Ledger tab.',
      'Enter the customer name and mobile number.',
      'Tap Gave Credit (Udhar Diya) or Received Cash (Udhar Liya) to log amounts with optional receipt photos.',
      'Switch to the Daily Cash Book tab to record cash sales, shop expenses, and closing cash balance.',
    ],
  },
  {
    id: 2,
    category: 'nexa-player',
    categoryLabel: 'Nexa Player · 8K & Media Playback',
    title: 'Playing Ultra 8K, 4K Videos & iPhone MOV / HEVC Files',
    steps: [
      'Launch Nexa Player Pro and allow media storage permissions to automatically index your folders.',
      'Browse Camera, Downloads, Movies, or WhatsApp folders directly from the Video Library.',
      'Tap any 8K, 4K, or MOV video to begin smooth hardware-accelerated (HW+) playback.',
      'Swipe left for brightness, swipe right for volume, and double-tap either side to seek 10 seconds.',
    ],
  },
  {
    id: 3,
    category: 'nexa-player',
    categoryLabel: 'Nexa Player · Audio Engine',
    title: 'Setting Up 10-Band Equalizer, Bass Boost & 3D Virtualizer',
    steps: [
      'During video or audio playback, tap the Equalizer (Sliders) control.',
      'Select an acoustic preset (Bass Boost, Vocal Clear, Rock, Classical) or tune the 10 frequency bands.',
      'Enable Bass Boost and adjust 3D Spatial Reverb for deeper headphone sound.',
      'Your custom preset is saved automatically for subsequent playback.',
    ],
  },
  {
    id: 4,
    category: 'nexa-player',
    categoryLabel: 'Nexa Player · Background Play',
    title: 'Enabling Background Audio & Floating Picture-in-Picture (PiP)',
    steps: [
      'Open Nexa Player Settings and enable Background Video Playback.',
      'Play any lecture, podcast, or music video and lock your screen or switch apps.',
      'Control playback from the notification panel without waking the video player.',
      'Tap the floating window icon to continue watching in Picture-in-Picture mode.',
    ],
  },
  {
    id: 5,
    category: 'nexa-player',
    categoryLabel: 'Nexa Player · Theme Studio',
    title: 'Customizing AMOLED Pure Black & Accent Themes',
    steps: [
      'Go to Nexa Settings → Theme & Styling.',
      'Select Night Mode, Day Mode, or System Auto appearance.',
      'Enable AMOLED Pure Black for deeper OLED contrast and lower battery draw.',
      'Choose your preferred accent palette: Cyber Cyan, Electric Mint, Violet, or Solar Blaze.',
    ],
  },
  {
    id: 6,
    category: 'backups',
    categoryLabel: 'Raqam Flow · Backups & Cloud Sync',
    title: 'Setting Up 1-Tap Google Drive Cloud Synchronization',
    steps: [
      'Go to App Settings → Cloud Backup & Restore.',
      'Tap Connect Google Account and approve official OAuth 2.0 access for your private app folder.',
      'Tap Backup Now to upload an encrypted backup snapshot directly to your personal Google Drive.',
      'On a new device, sign in with the same Google account and tap Restore Backup.',
    ],
  },
  {
    id: 7,
    category: 'backups',
    categoryLabel: 'Security & App Lock',
    title: 'Enabling 4-Digit PIN Code & Biometric Fingerprint Lock',
    steps: [
      'Open App Settings and choose Security & Lock.',
      'Turn on Enable 4-Digit PIN Lock and enter your personal code.',
      'Optionally enable Biometric Fingerprint Unlock for faster daily access.',
      'Your ledgers and app preferences are now locked every time the app launches.',
    ],
  },
  {
    id: 8,
    category: 'troubleshooting',
    categoryLabel: 'Safety & Recovery',
    title: 'Restoring Deleted Records from the 30-Day Recycle Bin',
    steps: [
      'Both Raqam Flow and Nexa Player include a built-in 30-day Safety Recycle Bin.',
      'Open App Settings → Recycle Bin.',
      'Locate the deleted transaction, customer profile, or playlist item.',
      'Tap Restore to bring it back immediately with zero data loss.',
    ],
  },
  {
    id: 9,
    category: 'troubleshooting',
    categoryLabel: 'Reports & Invoices',
    title: 'Exporting PDF & Excel Financial Ledger Statements',
    steps: [
      'Open any Customer Ledger or the Daily Cash Book in Raqam Flow.',
      'Tap Export Statement in the top-right corner.',
      'Choose PDF or Excel (.XLSX) format and select the desired date range.',
      'Share the report via WhatsApp, email, or print directly over Wi-Fi.',
    ],
  },
];

export default function HelpCenterPage({ navigateTo }: { navigateTo: (page: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = GUIDES.filter((g) => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.categoryLabel.toLowerCase().includes(q) ||
      g.steps.some((s) => s.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <PageHeader
        kicker="Documentation & Tutorials"
        title="NooriTech Help Center"
        description="Step-by-step setup guides, cloud backup walkthroughs, audio tuning tips, and recovery instructions for Raqam Flow and Nexa Player Pro."
        breadcrumbLabel="Help Center"
        accent="cyan"
        navigateTo={navigateTo}
        metadata={[`${GUIDES.length} Official Guides`, 'Raqam Flow & Nexa Player']}
      >
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search backup, 8K, equalizer, PIN..."
            aria-label="Search help guides"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0b111c] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
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

      {/* Segmented Category Filter */}
      <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b111c] border border-white/[0.08] overflow-x-auto no-scrollbar max-w-full">
        {[
          { id: 'all' as const, label: 'All Guides' },
          { id: 'getting-started' as const, label: 'Getting Started' },
          { id: 'nexa-player' as const, label: 'Nexa Player' },
          { id: 'backups' as const, label: 'Backups & Security' },
          { id: 'troubleshooting' as const, label: 'Troubleshooting' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guides List */}
      {filteredGuides.length === 0 ? (
        <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-12 text-center space-y-2">
          <p className="text-base font-semibold text-white">No guides found</p>
          <p className="text-sm text-slate-400">Try a different search term or reset filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 px-4 py-2 rounded-lg bg-white text-slate-950 text-xs font-semibold cursor-pointer"
          >
            Show All Guides
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredGuides.map((guide) => (
            <section
              key={guide.id}
              className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="font-sans font-semibold text-cyan-400">
                  {guide.categoryLabel}
                </span>
                <span className="text-slate-500">Guide {String(guide.id).padStart(2, '0')}</span>
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">{guide.title}</h2>

              <ol className="space-y-2.5 pt-1">
                {guide.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="font-mono text-xs font-semibold text-cyan-400 mt-0.5 shrink-0">
                      {String(sIdx + 1).padStart(2, '0')}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}

      {/* Help Desk CTA */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Need direct technical assistance?</h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Contact Muhammad Yousuf Noori directly via email or WhatsApp.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('contact')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          Contact Help Desk
        </button>
      </div>
    </div>
  );
}
