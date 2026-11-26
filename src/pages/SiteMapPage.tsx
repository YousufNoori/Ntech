import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

interface SiteMapPageProps {
  navigateTo: (page: Page) => void;
}

const SITE_MAP_GROUPS: {
  category: string;
  urduCategory: string;
  accent: string;
  items: {
    label: string;
    path: Page;
    routeLabel: string;
    desc: string;
  }[];
}[] = [
  {
    category: 'Main Apps Hub & Applications',
    urduCategory: 'ایپس پورٹ فولیو اور ڈاؤن لوڈز',
    accent: 'text-emerald-400',
    items: [
      {
        label: 'NooriTech Official Apps Hub',
        path: 'apps',
        routeLabel: '/',
        desc: 'Explore all official Android applications by Muhammad Yousuf Noori with live download counts and direct APKs.',
      },
      {
        label: 'Raqam Flow (Digital Khata)',
        path: 'raqam-flow',
        routeLabel: '/raqam-flow',
        desc: 'Offline digital ledger, customer udhar tracking, daily cashbook, PDF reports, and Google Drive backup.',
      },
      {
        label: 'Nexa Player Pro (HD Media)',
        path: 'nexa-player',
        routeLabel: '/nexa-player',
        desc: '4K & 8K hardware-accelerated video and music player with 10-band equalizer, PiP mode, and subtitles.',
      },
    ],
  },
  {
    category: 'Company & Support',
    urduCategory: 'کمپنی اور ڈویلپر معلومات',
    accent: 'text-teal-400',
    items: [
      {
        label: 'About Us & Developer Profile',
        path: 'about',
        routeLabel: '/about',
        desc: 'Meet founder Muhammad Yousuf Noori, explore our offline-first philosophy, and submit app suggestions.',
      },
      {
        label: 'Contact Us & Help Desk',
        path: 'contact',
        routeLabel: '/contact',
        desc: 'Direct WhatsApp (+92 302 2827364), official email support, and instant message form.',
      },
      {
        label: 'Frequently Asked Questions (FAQ)',
        path: 'faq',
        routeLabel: '/faq',
        desc: 'Searchable answers regarding offline storage, cloud backup recovery, media formats, and APK safety.',
      },
    ],
  },
  {
    category: 'Guides & Publications',
    urduCategory: 'رہنمائی اور تکنیکی مضامین',
    accent: 'text-amber-400',
    items: [
      {
        label: 'Engineering & Insights Blogs',
        path: 'blogs',
        routeLabel: '/blogs',
        desc: 'In-depth technical articles covering offline SQLite architecture, 8K video decoding, and mobile privacy.',
      },
      {
        label: 'Help Center & Step-by-Step Guides',
        path: 'help-center',
        routeLabel: '/help-center',
        desc: 'Structured tutorials for customer ledgers, equalizer tuning, PIN locks, and Google Drive sync.',
      },
      {
        label: 'Interactive Visual Site Map',
        path: 'sitemap',
        routeLabel: '/sitemap',
        desc: 'Complete directory index of every standalone page across the NooriTech web portal.',
      },
    ],
  },
  {
    category: 'Legal & Privacy Compliance',
    urduCategory: 'قانونی پالیسی اور تحفظ',
    accent: 'text-cyan-400',
    items: [
      {
        label: 'Privacy Policy',
        path: 'privacy',
        routeLabel: '/privacy',
        desc: 'Zero-tracking disclosure, local SQLite sandboxing, minimal device permissions, and data ownership.',
      },
      {
        label: 'Terms & Conditions',
        path: 'terms',
        routeLabel: '/terms',
        desc: 'License terms, intellectual property protection, official APKPure publisher link, and backup notice.',
      },
      {
        label: 'Cookie Policy',
        path: 'cookie-policy',
        routeLabel: '/cookie-policy',
        desc: 'Clear statement confirming zero advertising cookies, zero trackers, and essential local storage only.',
      },
    ],
  },
];

export default function SiteMapPage({ navigateTo }: SiteMapPageProps) {
  return (
    <div className="page-enter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <PageHeader
        kicker="Website Directory"
        title="Visual Site Map"
        description="Jump directly to any standalone product page, help tutorial, technical blog, or legal document across NooriTech."
        breadcrumbLabel="Site Map"
        navigateTo={navigateTo}
        metadata={['12 Dedicated Pages', '1-Click Navigation']}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {SITE_MAP_GROUPS.map((group) => (
          <section
            key={group.category}
            className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 space-y-5"
          >
            <div className="border-b border-white/[0.08] pb-4">
              <h2 className="text-base font-bold text-white">{group.category}</h2>
              <p className={`font-urdu text-xs font-medium mt-0.5 ${group.accent}`}>
                {group.urduCategory}
              </p>
            </div>

            <div className="space-y-2.5">
              {group.items.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigateTo(item.path)}
                  className="group w-full text-left p-4 rounded-xl bg-[#0e1624] hover:bg-[#131e30] border border-white/[0.06] hover:border-white/[0.15] flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.routeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
