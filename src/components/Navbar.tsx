import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const PRIMARY_NAV: { id: Page; label: string }[] = [
  { id: 'apps', label: 'Home' },
  { id: 'raqam-flow', label: 'Raqam Flow' },
  { id: 'nexa-player', label: 'Nexa Player' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'help-center', label: 'Help Center' },
];

const MOBILE_GROUPS: { title: string; items: { id: Page; label: string }[] }[] = [
  {
    title: 'Applications',
    items: [
      { id: 'apps', label: 'Home (Apps Hub)' },
      { id: 'raqam-flow', label: 'Raqam Flow' },
      { id: 'nexa-player', label: 'Nexa Player' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { id: 'blogs', label: 'Blogs' },
      { id: 'help-center', label: 'Help Center' },
      { id: 'faq', label: 'FAQ' },
      { id: 'sitemap', label: 'Site Map' },
    ],
  },
  {
    title: 'Company & Legal',
    items: [
      { id: 'about', label: 'About Us' },
      { id: 'contact', label: 'Contact Us' },
      { id: 'privacy', label: 'Privacy Policy' },
      { id: 'terms', label: 'Terms & Conditions' },
      { id: 'cookie-policy', label: 'Cookie Policy' },
      { id: 'delete-account', label: 'Account Deletion' },
    ],
  },
];

export function Navbar({ currentPage, navigateTo }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const brandConfig =
    currentPage === 'raqam-flow'
      ? {
          name: 'Raqam Flow',
          logo: '/logo.png',
          logoRounded: 'rounded-lg',
          accent: 'emerald' as const,
        }
      : currentPage === 'nexa-player'
        ? {
            name: 'Nexa Player',
            logo: '/nexa-player.jpg',
            logoRounded: 'rounded-full',
            accent: 'cyan' as const,
          }
        : {
            name: 'NooriTech',
            logo: '/noori-tech-logo.jpg',
            logoRounded: 'rounded-lg',
            accent: 'emerald' as const,
          };

  const isCyan = brandConfig.accent === 'cyan';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060a10]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavigate('apps')}
          className="flex items-center gap-2.5 cursor-pointer group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
          title="NooriTech Home"
        >
          <span className={`w-8 h-8 ${brandConfig.logoRounded} overflow-hidden border border-white/15 bg-slate-900 shrink-0 block`}>
            <img
              src={brandConfig.logo}
              alt={`${brandConfig.name} Logo`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-[-0.02em] text-white group-hover:text-slate-200 transition-colors whitespace-nowrap">
            {brandConfig.name}
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {PRIMARY_NAV.map((link) => {
            const isActive = currentPage === link.id;
            const activeColor = link.id === 'nexa-player' ? 'text-cyan-400' : 'text-emerald-400';
            const underlineColor = link.id === 'nexa-player' ? 'bg-cyan-400' : 'bg-emerald-400';

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigate(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded ${
                  isActive ? activeColor : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute left-0 right-0 -bottom-[19px] h-[2px] ${underlineColor} rounded-full`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className={`hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a10] ${
              isCyan
                ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 focus-visible:ring-cyan-400'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 focus-visible:ring-emerald-400'
            }`}
          >
            Contact Us
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Directory Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#060a10]/98 backdrop-blur-2xl max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-6">
            {MOBILE_GROUPS.map((group) => (
              <div key={group.title} className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 px-3 tracking-wide">
                  {group.title}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map((item) => {
                    const isActive =
                      currentPage === item.id ||
                      (item.id === 'privacy' && currentPage === 'universal-privacy') ||
                      (item.id === 'terms' && currentPage === 'universal-terms');

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(item.id)}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? item.id === 'nexa-player'
                              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                            : 'text-slate-300 hover:bg-white/[0.05] hover:text-white border border-transparent'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
