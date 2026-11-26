import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  ExternalLink,
  Download,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { Page } from '../types';

interface BlogsPageProps {
  navigateTo: (page: Page) => void;
}

type BlogFilter = 'all' | 'raqam-flow' | 'nexa-player' | 'security' | 'business';

function renderFormattedLine(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function ArticleBody({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
      {blocks.map((line, i) => {
        if (line.startsWith('### ')) {
          return (
            <h3 key={i} className="text-xl font-bold text-white pt-4 tracking-tight">
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('#### ')) {
          return (
            <h4 key={i} className="text-base font-bold text-emerald-400 pt-2">
              {line.replace('#### ', '')}
            </h4>
          );
        }
        if (/^\d+\.\s/.test(line) || line.startsWith('- ')) {
          return (
            <p key={i} className="pl-4 text-slate-300">
              {renderFormattedLine(line)}
            </p>
          );
        }
        return <p key={i}>{renderFormattedLine(line)}</p>;
      })}
    </div>
  );
}

export default function BlogsPage({ navigateTo }: BlogsPageProps) {
  const { slug } = useParams<{ slug?: string }>();
  const routerNavigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedArticle: BlogArticle | null = slug
    ? BLOG_ARTICLES.find((a) => a.id === slug) || null
    : null;
  const selectedIndex = selectedArticle ? BLOG_ARTICLES.indexOf(selectedArticle) : -1;

  useEffect(() => {
    if (selectedArticle) {
      document.title = `${selectedArticle.title} - NooriTech`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.title = 'Blogs - NooriTech';
    }
  }, [selectedArticle]);

  const openArticle = (articleId: string) => {
    routerNavigate(`/blogs/${articleId}`);
  };

  const closeArticle = () => {
    routerNavigate('/blogs');
  };

  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const shareUrl = `${window.location.origin}/blogs/${selectedArticle.id}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    const matchesFilter = activeFilter === 'all' || art.filterGroup === activeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.urduTitle.includes(searchQuery.trim()) ||
      art.summary.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.appTag.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  // Dedicated Single Article View (/blogs/:slug)
  if (selectedArticle) {
    return (
      <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={closeArticle}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0b111c] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedLink ? 'Link Copied' : 'Copy Share Link'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(selectedArticle.appRoute)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Open {selectedArticle.appTag}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <article className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-10 space-y-8">
          <header className="space-y-4 border-b border-white/[0.08] pb-6">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 font-mono">
              <span className="font-sans font-semibold text-emerald-400">
                {selectedArticle.appTag}
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="font-sans text-slate-300">{selectedArticle.category}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            {selectedArticle.urduTitle && (
              <p className="font-urdu text-lg sm:text-xl text-emerald-400 font-semibold leading-relaxed">
                {selectedArticle.urduTitle}
              </p>
            )}

            <div className="pt-2 text-xs text-slate-400">
              By <strong className="text-white font-semibold">{selectedArticle.author}</strong> —{' '}
              {selectedArticle.authorRole}
            </div>
          </header>

          <div className="rounded-xl bg-[#0e1624] border border-white/[0.06] p-5 text-sm text-slate-300 leading-relaxed">
            <span className="text-xs font-semibold text-amber-400 block mb-1.5">
              Executive Summary
            </span>
            {selectedArticle.summary}
          </div>

          <ArticleBody content={selectedArticle.content} />

          <footer className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                disabled={selectedIndex <= 0}
                onClick={() => openArticle(BLOG_ARTICLES[selectedIndex - 1].id)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                disabled={selectedIndex >= BLOG_ARTICLES.length - 1}
                onClick={() => openArticle(BLOG_ARTICLES[selectedIndex + 1].id)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 cursor-pointer"
              >
                <span>Next Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigateTo(selectedArticle.appRoute)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download {selectedArticle.appTag}</span>
            </button>
          </footer>
        </article>
      </div>
    );
  }

  // Blog Directory Index View (/blogs)
  return (
    <div className="page-enter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <PageHeader
        kicker="Official Publication"
        title="Engineering & Insights Blog"
        description="Technical architecture guides, accounting best practices, 4K/8K media engineering notes, and privacy deep dives by Muhammad Yousuf Noori."
        breadcrumbLabel="Blogs"
        accent="amber"
        navigateTo={navigateTo}
        metadata={[`${BLOG_ARTICLES.length} Published Articles`, 'Raqam Flow & Nexa Player']}
      >
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, khata, 8K video..."
            aria-label="Search blog articles"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0b111c] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b111c] border border-white/[0.08] overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'all' as const, label: `All (${BLOG_ARTICLES.length})` },
            { id: 'raqam-flow' as const, label: 'Raqam Flow' },
            { id: 'nexa-player' as const, label: 'Nexa Player' },
            { id: 'security' as const, label: 'Security & Privacy' },
            { id: 'business' as const, label: 'Business Growth' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono tabular-nums text-slate-500">
          Showing {filteredArticles.length} of {BLOG_ARTICLES.length}
        </span>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-12 text-center space-y-2">
          <p className="text-base font-semibold text-white">No articles match your search</p>
          <p className="text-sm text-slate-400">Try a broader topic or reset the filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="mt-2 px-4 py-2 rounded-lg bg-white text-slate-950 text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => openArticle(article.id)}
              className="group rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-amber-400/35 p-6 flex flex-col justify-between gap-5 transition-colors cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 font-mono">
                  <span
                    className={`font-sans font-semibold ${
                      article.appRoute === 'nexa-player' ? 'text-cyan-400' : 'text-emerald-400'
                    }`}
                  >
                    {article.appTag}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="font-sans text-slate-300">{article.category}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {article.title}
                </h2>

                {article.urduTitle && (
                  <p className="font-urdu text-sm text-emerald-400 font-medium line-clamp-1">
                    {article.urduTitle}
                  </p>
                )}

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500">{article.date}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
