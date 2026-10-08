import React, { useState } from 'react';
import { 
  Map, 
  BookOpen, 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Layers,
  FileText,
  Mail,
  Info,
  Lock,
  Database,
  Globe,
  Share2,
  Copy,
  Check,
  ChevronLeft
} from 'lucide-react';
import { Page } from '../App';
import { AdsterraNativeAd } from './AdsterraNativeAd';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';

interface ComponentProps {
  navigateTo: (page: Page) => void;
}

// ============================================================================
// 1. SITE MAP COMPONENT
// ============================================================================
export function SiteMapSection({ navigateTo }: ComponentProps) {
  const siteMapData = [
    {
      category: "Main Apps Hub & Android Portfolios",
      urduCategory: "ایپس پورٹ فولیو اور ڈاؤن لوڈز",
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      items: [
        { 
          label: "NooriTech Apps Hub Store", 
          path: "apps" as Page, 
          badge: "Main Store",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          desc: "Explore all official Android mobile applications created by Muhammad Yousuf Noori with direct APK mirrors & ratings." 
        },
        { 
          label: "Raqam Flow (Digital Khata)", 
          path: "raqam-flow" as Page, 
          badge: "Finance v1.0.0",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          desc: "Pakistan's premier offline digital ledger, customer udhar tracking, daily cash book & 1-tap Google Drive cloud backup." 
        },
        { 
          label: "Nexa Player Pro (HD Media)", 
          path: "nexa-player" as Page, 
          badge: "New Release v1.1.0",
          badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
          desc: "Ultra HD 4K/8K hardware-accelerated video & audio player with 10-band equalizer, bass boost, floating PIP window & gestures." 
        },
      ]
    },
    {
      category: "Company & Developer Identity",
      urduCategory: "کمپنی اور ڈویلپر معلومات",
      icon: <Info className="w-5 h-5 text-teal-500" />,
      items: [
        { 
          label: "About Us & Developer Profile", 
          path: "about" as Page, 
          badge: "Founder",
          badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
          desc: "Learn about Muhammad Yousuf Noori, our technical architecture, offline-first philosophy, and vision for Pakistani businesses." 
        },
        { 
          label: "Contact Us & Official Help Desk", 
          path: "contact" as Page, 
          badge: "Live Support",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          desc: "Direct WhatsApp support (+92 302 2827364), official developer email (yousufnoor469@gmail.com) and instant inquiry forms." 
        },
        { 
          label: "Frequently Asked Questions (FAQ)", 
          path: "faq" as Page, 
          badge: "Knowledge",
          badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          desc: "Quick answers to common questions regarding local data storage, cloud backup restoration, pricing, and APK installation safety." 
        },
      ]
    },
    {
      category: "Content, Knowledge & Community",
      urduCategory: "رہنمائی اور تکنیکی مضامین",
      icon: <BookOpen className="w-5 h-5 text-amber-500" />,
      items: [
        { 
          label: "Help Center & User Guides", 
          path: "help-center" as Page, 
          badge: "Tutorials",
          badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          desc: "Visual step-by-step guides on creating customer ledgers, setting up automated Google Drive backups, and securing PIN locks." 
        },
        { 
          label: "Blogs & Technical Insights", 
          path: "blogs" as Page, 
          badge: "Articles",
          badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          desc: "In-depth engineering articles covering offline-first Android architectures, Room SQLite optimization, and modern mobile UX." 
        },
        { 
          label: "Interactive Visual Site Map", 
          path: "sitemap" as Page, 
          badge: "Active View",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          desc: "Structured index and complete navigation directory of every application page, legal resource, and product route." 
        },
      ]
    },
    {
      category: "Legal, Security & Compliance",
      urduCategory: "قانونی پالیسی اور تحفظ",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-500" />,
      items: [
        { 
          label: "Privacy Policy (Universal Standard)", 
          path: "privacy" as Page, 
          badge: "Zero-Tracking",
          badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
          desc: "Detailed legal disclosure of local SQLite storage, Google OAuth security scope, zero third-party telemetry, and complete user data custody." 
        },
        { 
          label: "Terms & Conditions", 
          path: "terms" as Page, 
          badge: "Legal Terms",
          badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
          desc: "End-user license agreement, intellectual property protection, offline data disclaimer, and acceptable usage policy." 
        },
        { 
          label: "Cookie & Storage Policy", 
          path: "cookie-policy" as Page, 
          badge: "Compliance",
          badgeColor: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
          desc: "Official statement regarding zero advertising tracking cookies and safe client-side theme preferences storage." 
        },
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-amber-500/40 shadow-2xl overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
              <Map className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Website Architecture</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Interactive Visual Site Map</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Navigate seamlessly through all sections, product pages, legal policies, user guides, and technical blog articles of the official NooriTech application portal.
          </p>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {siteMapData.map((section, sIdx) => (
          <div 
            key={sIdx} 
            className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex-shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">{section.category}</h3>
                  {section.urduCategory && (
                    <span className="text-[11px] font-urdu font-medium text-emerald-600 dark:text-emerald-400 block mt-0.5">{section.urduCategory}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => navigateTo(item.path)}
                    className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {item.label}
                        </h4>
                        {item.badge && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sponsored Native Banner Ad */}
      <div className="pt-6">
        <AdsterraNativeAd />
      </div>
    </div>
  );
}

// ============================================================================
// 2. BLOGS COMPONENT
// ============================================================================
export function BlogsSection({ navigateTo }: ComponentProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'raqam-flow' | 'nexa-player' | 'security' | 'business'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedArticle = BLOG_ARTICLES.find(a => a.id === selectedArticleId) || null;
  const selectedIndex = selectedArticle ? BLOG_ARTICLES.indexOf(selectedArticle) : -1;

  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const url = window.location.origin + '/#blogs';
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedArticleId(BLOG_ARTICLES[selectedIndex - 1].id);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (selectedIndex < BLOG_ARTICLES.length - 1) {
      setSelectedArticleId(BLOG_ARTICLES[selectedIndex + 1].id);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const filteredArticles = BLOG_ARTICLES.filter(art => {
    const matchesFilter = activeFilter === 'all' || art.filterGroup === activeFilter;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.urduTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.appTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-amber-500/40 shadow-2xl overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Official Publication & Tech Insights</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black border border-amber-500/20">
                  {BLOG_ARTICLES.length} Comprehensive Articles
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">NooriTech Engineering & Insights Blog</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In-depth architectural analyses, accounting best practices, 4K video engineering guides, and data security deep dives by Muhammad Yousuf Noori.
          </p>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 12 articles by title, keywords, audio, video, khata, or security..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All Articles (تمام ${BLOG_ARTICLES.length} مضامین)` },
              { id: 'raqam-flow', label: 'Raqam Flow (اکاؤنٹنگ و کھاتہ)' },
              { id: 'nexa-player', label: 'Nexa Player (میڈیا و ویڈیو)' },
              { id: 'security', label: 'Security & Privacy (ڈیٹا تحفظ)' },
              { id: 'business', label: 'Business Growth (کاروباری رہنمائی)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div id="article-reader-container" className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-amber-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <button
                onClick={() => navigateTo(selectedArticle.appRoute)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <span>Explore {selectedArticle.appTag}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Article Metadata Badges */}
          <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 font-semibold flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full border text-xs font-extrabold ${selectedArticle.badgeColor}`}>
              {selectedArticle.appTag}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-bold">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {selectedArticle.date}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {selectedArticle.readTime}
            </span>
          </div>

          {/* Main Title & Urdu Translation */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {selectedArticle.title}
            </h2>
            {selectedArticle.urduTitle && (
              <p className="font-urdu text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-bold leading-relaxed">
                {selectedArticle.urduTitle}
              </p>
            )}
            <div className="flex items-center space-x-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white font-bold text-[11px]">
                YN
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{selectedArticle.author}</span>
                <span className="text-[10px] text-slate-400">{selectedArticle.authorRole}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
            <span className="font-bold text-amber-600 dark:text-amber-400 block not-italic uppercase text-[10px] tracking-wider mb-1">Executive Summary</span>
            "{selectedArticle.summary}"
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed border-t border-slate-200 dark:border-white/10 pt-4">
            {selectedArticle.content}
          </div>

          {/* Bottom Reader Action Bar */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                disabled={selectedIndex <= 0}
                onClick={handlePrev}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                disabled={selectedIndex >= BLOG_ARTICLES.length - 1}
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <span>Next Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Article
              </button>
              <button
                onClick={() => navigateTo(selectedArticle.appRoute)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center space-x-2"
              >
                <span>Download & Try {selectedArticle.appTag}</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Status Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing {filteredArticles.length} of {BLOG_ARTICLES.length} published articles</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-amber-500 hover:underline cursor-pointer font-bold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between hover:border-amber-500/40 transition-all hover:-translate-y-1 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${article.badgeColor}`}>
                    {article.appTag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {article.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors leading-snug">
                {article.title}
              </h3>

              {article.urduTitle && (
                <p className="font-urdu text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2.5 line-clamp-1">
                  {article.urduTitle}
                </p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                By {article.author}
              </span>
              <button
                onClick={() => {
                  setSelectedArticleId(article.id);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sponsored Native Banner Ad */}
      <div className="pt-6">
        <AdsterraNativeAd />
      </div>
    </div>
  );
}

// ============================================================================
// 3. HELP CENTER COMPONENT
// ============================================================================
export function HelpCenterSection({ navigateTo }: ComponentProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'getting-started' | 'nexa-player' | 'backups' | 'troubleshooting'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 1,
      category: 'getting-started',
      categoryLabel: 'Raqam Flow • Getting Started',
      title: "Creating Your First Customer Credit & Daily Cash Entries",
      steps: [
        "Open Raqam Flow and tap 'Add Customer' on the main Customer Credit Ledger tab.",
        "Type the customer's name and mobile number.",
        "Tap 'Gave Credit' (Udhar Diya) or 'Received Cash' (Udhar Liya) to log amounts with optional bill photo attachments.",
        "Switch to the 'Daily Cash Book' tab to record daily cash sales, shop expenses, and cash closing balances."
      ]
    },
    {
      id: 2,
      category: 'nexa-player',
      categoryLabel: 'Nexa Player • 8K & Media Playback',
      title: "Playing Ultra 8K, 4K Videos & iPhone MOV/HEVC Files",
      steps: [
        "Launch Nexa Player Pro and allow media storage permissions to auto-index videos.",
        "Browse your video folders (Camera, Downloads, Movies, WhatsApp).",
        "Tap any 8K/4K or iPhone MOV video to start smooth hardware-accelerated (HW+) playback.",
        "Use gesture controls: swipe left for brightness, right for volume, and double-tap to seek 10 seconds."
      ]
    },
    {
      id: 3,
      category: 'nexa-player',
      categoryLabel: 'Nexa Player • Audio Engine',
      title: "Setting Up 10-Band Equalizer, Bass Boost & 3D Virtualizer",
      steps: [
        "During any video or music playback, tap the Equalizer (Sliders) icon.",
        "Choose an acoustic preset (Bass Boost, Vocal Clear, Rock, Classical) or adjust 10 individual frequency sliders.",
        "Enable 'Bass Boost' and adjust '3D Spatial Reverb' for studio-grade headphone immersion.",
        "Your custom equalizer preset is automatically saved and applied to future playback."
      ]
    },
    {
      id: 4,
      category: 'nexa-player',
      categoryLabel: 'Nexa Player • Background Play',
      title: "How to Enable Background Audio & Floating Picture-in-Picture (PiP)",
      steps: [
        "In Nexa Player Settings, toggle ON 'Background Video Playback'.",
        "Play any video podcast, music track, or lecture and switch to other apps or lock your phone screen.",
        "Audio continues playing uninterrupted with convenient lockscreen playback notification controls.",
        "Tap the floating window icon or swipe to home to engage floating Picture-in-Picture mode."
      ]
    },
    {
      id: 5,
      category: 'nexa-player',
      categoryLabel: 'Nexa Player • Theme Studio',
      title: "Customizing Theme Studio: AMOLED Pure Black & Cyber Frosted Glass",
      steps: [
        "Navigate to 'Nexa Settings' -> 'Theme & Styling'.",
        "Choose your Appearance Mode: 'Night Mode', 'Day Mode', or 'System Auto'.",
        "Toggle 'AMOLED Pure Black' for deep OLED battery efficiency or 'Cyber Frosted Glass' for translucent glassmorphism.",
        "Select your active Cosmic Accent: Cyber Cyan, Electric Mint, Neon Violet, or Solar Blaze."
      ]
    },
    {
      id: 6,
      category: 'backups',
      categoryLabel: 'Raqam Flow • Backups & Cloud Sync',
      title: "Setting Up 1-Tap Google Drive Cloud Synchronization",
      steps: [
        "Go to App Settings -> Cloud Backup & Restore.",
        "Tap 'Connect Google Account' and accept official OAuth 2.0 read/write permissions for private app data folder.",
        "Tap 'Backup Now' to generate an encrypted JSON backup file.",
        "To restore on a new device, simply sign into the same Google account and tap 'Restore Backup'."
      ]
    },
    {
      id: 7,
      category: 'backups',
      categoryLabel: 'Security & App Lock',
      title: "How to Enable PIN Code & Biometric Fingerprint Lock",
      steps: [
        "Open App Settings and select 'Security & Lock'.",
        "Toggle ON 'Enable 4-Digit PIN Lock' and choose your secret 4-digit code.",
        "Optionally toggle ON 'Biometric Fingerprint Authentication' for quick unlock.",
        "Your financial records and media preferences will now be protected every time the app opens."
      ]
    },
    {
      id: 8,
      category: 'troubleshooting',
      categoryLabel: 'Safety & Recovery',
      title: "How to Restore Deleted Items from Safety Recycle Bin",
      steps: [
        "Both Raqam Flow and Nexa Player include a built-in 30-day protected Safety Recycle Bin.",
        "Go to App Settings -> Recycle Bin.",
        "Find the deleted transaction record, customer profile, or playlist item.",
        "Tap 'Restore' to instantly recover the item with zero data loss."
      ]
    },
    {
      id: 9,
      category: 'troubleshooting',
      categoryLabel: 'Reports & Invoices',
      title: "Exporting PDF & Excel Financial Ledger Reports",
      steps: [
        "Select any Customer Ledger or open the Daily Cash Book.",
        "Tap the 'Export Statement' button at the top right.",
        "Choose PDF or Excel (.XLSX) format and select date ranges.",
        "Share the generated PDF statement directly via WhatsApp, Email, or print via Wi-Fi printer."
      ]
    }
  ];

  const filteredGuides = guides.filter(g => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const matchesQuery = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.steps.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 shadow-2xl overflow-hidden">
        <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-500">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">Documentation & User Guides</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">NooriTech Official Help Center</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Step-by-step instructions, feature tutorials, cloud backup guides, and troubleshooting solutions for all NooriTech mobile applications (Raqam Flow & Nexa Player Pro).
          </p>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help articles (e.g. equalizer, 8K video, backup, PIN lock, restore)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Guides' },
          { id: 'getting-started', label: '🚀 Getting Started' },
          { id: 'nexa-player', label: '🎬 Nexa Player (Media)' },
          { id: 'backups', label: '☁️ Backups & Security' },
          { id: 'troubleshooting', label: '🔧 Troubleshooting' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guides List */}
      <div className="space-y-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                {guide.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 font-mono">Guide #{guide.id}</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>{guide.title}</span>
            </h3>

            <div className="space-y-2.5 pl-2">
              {guide.steps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-200 dark:border-white/10">
                    {sIdx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Help Desk Footer Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">Need Direct Developer Assistance?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">Our official support team is available via email and WhatsApp to assist you.</p>
        </div>
        <button
          onClick={() => navigateTo('contact')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-500 transition-colors cursor-pointer flex-shrink-0"
        >
          Contact Help Desk
        </button>
      </div>

      {/* Sponsored Native Banner Ad */}
      <div className="pt-6">
        <AdsterraNativeAd />
      </div>
    </div>
  );
}
