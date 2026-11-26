import React from 'react';
import { EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

export default function CookiePolicyPage({ navigateTo }: { navigateTo: (page: Page) => void }) {
  const highlights = [
    {
      icon: <EyeOff className="w-5 h-5 text-cyan-400" />,
      title: 'Zero Tracking Cookies',
      desc: 'No advertising networks or cross-site behavior tracking.',
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: 'Essential Local State Only',
      desc: 'Session preferences stay exclusively inside your browser.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      title: 'No Marketing Pixels',
      desc: 'Zero third-party retargeting pixels or analytics beacons.',
    },
  ];

  const sections = [
    {
      num: '01.',
      title: 'What Are Cookies?',
      body: 'Cookies are small text files saved by your web browser when you visit websites. They are typically used to remember basic preferences or, on commercial ad sites, to track browsing behavior across the web.',
    },
    {
      num: '02.',
      title: 'Our Strict No-Tracking Cookie Standard',
      body: 'We do not deploy advertising cookies, profiling cookies, cross-site trackers, or third-party marketing pixels anywhere on the NooriTech website or inside our Android applications.',
    },
    {
      num: '03.',
      title: 'Essential Browser Storage Usage',
      body: 'Our web portal only uses minimal browser storage (such as sessionStorage for active visit counting and interface preferences). No personal identity data is collected or transmitted to ad brokers.',
    },
    {
      num: '04.',
      title: 'How to Control Browser Storage',
      body: 'You may clear or disable browser cookies and local storage at any time inside your browser settings. Because NooriTech does not rely on tracking cookies, blocking cookies will not disrupt browsing or downloading.',
    },
  ];

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <PageHeader
        kicker="Legal & Compliance"
        title="Cookie Policy"
        description="How cookies and browser storage are handled across the NooriTech website portfolio and Android application suite by Muhammad Yousuf Noori."
        breadcrumbLabel="Cookie Policy"
        accent="cyan"
        navigateTo={navigateTo}
        metadata={['Zero Ad Cookies', 'Privacy-First Portal']}
      />

      <div className="grid sm:grid-cols-3 gap-4">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-5 space-y-2.5"
          >
            {h.icon}
            <h2 className="text-sm font-bold text-white">{h.title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {sections.map((sec) => (
          <section
            key={sec.num}
            className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-7 space-y-3"
          >
            <h2 className="text-base sm:text-lg font-bold text-white">
              <span className="font-mono text-cyan-400 mr-2">{sec.num}</span>
              {sec.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{sec.body}</p>
          </section>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 space-y-2">
        <h3 className="text-sm font-bold text-white">Cookie &amp; Privacy Contact</h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Have questions about our Cookie Policy? Reach out directly:
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono pt-1">
          <a href="mailto:yousufnoor469@gmail.com" className="text-emerald-400 hover:underline">
            yousufnoor469@gmail.com
          </a>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <a
            href="https://wa.me/923022827364"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            WhatsApp: +92 302 2827364
          </a>
        </div>
      </div>
    </div>
  );
}
