import React from 'react';
import { Page } from '../types';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#060a10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => navigateTo('apps')}
              className="flex items-center gap-3 cursor-pointer group focus-visible:outline-none"
            >
              <span className="w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-slate-900 shrink-0 block">
                <img
                  src="/noori-tech-logo.jpg"
                  alt="NooriTech Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </span>
              <div className="text-left">
                <span className="font-display text-lg font-bold text-white block leading-tight group-hover:text-emerald-400 transition-colors">
                  NooriTech
                </span>
                <span className="text-xs text-slate-400 block">
                  Muhammad Yousuf Noori · Pakistan
                </span>
              </div>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Independent Android software studio crafting offline-first accounting tools and hardware-accelerated media applications with zero advertising trackers.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 pt-1">
              <a
                href="mailto:yousufnoor469@gmail.com"
                className="hover:text-emerald-400 transition-colors"
              >
                yousufnoor469@gmail.com
              </a>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <a
                href="https://wa.me/923022827364"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                +92 302 2827364
              </a>
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-3.5">
            <h4 className="font-display text-xs font-semibold text-white tracking-wide">
              Applications
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('apps')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Apps Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('raqam-flow')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Raqam Flow
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('nexa-player')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Nexa Player Pro
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Developer
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3.5">
            <h4 className="font-display text-xs font-semibold text-white tracking-wide">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('blogs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Engineering Blogs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('help-center')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('sitemap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Site Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3.5">
            <h4 className="font-display text-xs font-semibold text-white tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('cookie-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('delete-account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Account Deletion
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Muhammad Yousuf Noori (NooriTech). All rights reserved.</p>
          <p>Official Android Apps Portfolio · Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
