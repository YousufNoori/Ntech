import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Menu, X, Info, BookOpen, ShieldCheck } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Page } from './types';
import { PageLoader } from './components/PageLoader';

export type { Page };

// Code-split every page on-demand so code is only downloaded when a user clicks the page
const AppsHubSection = lazy(() => import('./components/AppsHubSection').then(m => ({ default: m.AppsHubSection })));
const RaqamFlowPage = lazy(() => import('./pages/RaqamFlowPage'));
const NexaPlayerSection = lazy(() => import('./components/NexaPlayerSection').then(m => ({ default: m.NexaPlayerSection })));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const UniversalLegalSection = lazy(() => import('./components/UniversalLegalSection').then(m => ({ default: m.UniversalLegalSection })));
const SiteMapSection = lazy(() => import('./components/CommunityContentSection').then(m => ({ default: m.SiteMapSection })));
const BlogsSection = lazy(() => import('./components/CommunityContentSection').then(m => ({ default: m.BlogsSection })));
const HelpCenterSection = lazy(() => import('./components/CommunityContentSection').then(m => ({ default: m.HelpCenterSection })));
const ThreeBackground = lazy(() => import('./components/ThreeBackground').then(m => ({ default: m.ThreeBackground })));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Derive currentPage from the URL pathname
  const getCurrentPage = (): Page => {
    switch (location.pathname) {
      case '/raqam-flow': return 'raqam-flow';
      case '/nexa-player': return 'nexa-player';
      case '/about':
      case '/raqam-flow/about': return 'about';
      case '/contact': return 'contact';
      case '/faq': return 'faq';
      case '/sitemap': return 'sitemap';
      case '/blogs':
      case '/blog': return 'blogs';
      case '/help-center': return 'help-center';
      case '/privacy':
      case '/universal-privacy':
      case '/raqam-flow/privacy': return 'privacy';
      case '/terms':
      case '/universal-terms':
      case '/raqam-flow/terms': return 'terms';
      case '/cookie-policy': return 'cookie-policy';
      case '/apps':
      case '/':
      default:
        return 'apps';
    }
  };
  
  const currentPage = getCurrentPage();
  const isRaqamFlowContext = ['raqam-flow', 'about'].includes(currentPage);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navigateTo = (page: Page) => {
    const paths: Record<Page, string> = {
      'apps': '/',
      'raqam-flow': '/raqam-flow',
      'nexa-player': '/nexa-player',
      'about': '/about',
      'contact': '/contact',
      'faq': '/faq',
      'sitemap': '/sitemap',
      'blogs': '/blogs',
      'help-center': '/help-center',
      'privacy': '/privacy',
      'terms': '/terms',
      'cookie-policy': '/cookie-policy',
      'universal-privacy': '/privacy',
      'universal-terms': '/terms'
    };
    navigate(paths[page] || '/');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30 selection:text-emerald-100 font-sans overflow-x-hidden text-slate-100 bg-[#050b14]">
      {/* Background with adaptive hybrid rendering */}
      <Suspense fallback={null}>
        <ThreeBackground isDark={true} />
      </Suspense>
      
      {/* Navbar - Glassmorphic Permanent Dark */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          
          {/* Dynamic Brand Logo & Identity */}
          {currentPage === 'raqam-flow' ? (
            <div 
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
              onClick={() => navigateTo('apps')}
              title="Return to Home (Apps Hub)"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-shadow flex-shrink-0">
                <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 to-teal-100 bg-clip-text text-transparent leading-none">
                  Raqam Flow
                </span>
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 mt-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-[11px] font-semibold backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>v1.0.0 Live</span>
                </div>
              </div>
            </div>
          ) : currentPage === 'nexa-player' ? (
            <div 
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
              onClick={() => navigateTo('apps')}
              title="Return to Home (Apps Hub)"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-shadow flex-shrink-0">
                <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent leading-none">
                  Nexa Player
                </span>
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 mt-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-[11px] font-semibold backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                  </span>
                  <span>v1.0.0 Pro</span>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
              onClick={() => navigateTo('apps')}
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-amber-400/40 p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.35)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.7)] transition-all flex-shrink-0 flex items-center justify-center bg-slate-950">
                <img src="/noori-tech-logo.jpg" alt="Noori Tech Logo" className="w-full h-full object-cover rounded-[14px] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent leading-none">
                  Noori Tech
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold tracking-wide mt-0.5">
                  Illuminating Innovation
                </span>
              </div>
            </div>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks 
              navigateTo={navigateTo} 
              currentPage={currentPage} 
              isRaqamFlowContext={isRaqamFlowContext} 
            />
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-100 border border-white/10 active:scale-95 transition-transform cursor-pointer"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl px-5 py-6 flex flex-col space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <NavLinks 
              navigateTo={navigateTo} 
              currentPage={currentPage} 
              isRaqamFlowContext={isRaqamFlowContext}
              isMobile 
            />
          </div>
        )}
      </nav>

      {/* Main Content Area - Each page loads its chunk on click */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-16 min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Apps Hub Portal */}
            <Route 
              path="/" 
              element={
                <AppsHubSection 
                  onOpenRaqamFlow={() => navigateTo('raqam-flow')} 
                  onOpenNexaPlayer={() => navigateTo('nexa-player')}
                  onNavigateToUniversalPrivacy={() => navigateTo('universal-privacy')} 
                  onNavigateToUniversalTerms={() => navigateTo('universal-terms')} 
                  onNavigateToContact={() => navigateTo('contact')}
                  onNavigateToAbout={() => navigateTo('about')}
                />
              } 
            />
            <Route 
              path="/apps" 
              element={
                <AppsHubSection 
                  onOpenRaqamFlow={() => navigateTo('raqam-flow')} 
                  onOpenNexaPlayer={() => navigateTo('nexa-player')}
                  onNavigateToUniversalPrivacy={() => navigateTo('universal-privacy')} 
                  onNavigateToUniversalTerms={() => navigateTo('universal-terms')} 
                  onNavigateToContact={() => navigateTo('contact')}
                  onNavigateToAbout={() => navigateTo('about')}
                />
              } 
            />

            {/* Product Landing Pages */}
            <Route path="/raqam-flow" element={<RaqamFlowPage navigateTo={navigateTo} />} />
            <Route path="/nexa-player" element={<NexaPlayerSection navigateTo={navigateTo} />} />

            {/* Company & About Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/raqam-flow/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage navigateTo={navigateTo} />} />
            <Route path="/faq" element={<FaqPage navigateTo={navigateTo} />} />

            {/* Content & Community Pages */}
            <Route path="/sitemap" element={<SiteMapSection navigateTo={navigateTo} />} />
            <Route path="/blogs" element={<BlogsSection navigateTo={navigateTo} />} />
            <Route path="/blog" element={<BlogsSection navigateTo={navigateTo} />} />
            <Route path="/help-center" element={<HelpCenterSection navigateTo={navigateTo} />} />

            {/* Legal & Compliance Pages (Universal) */}
            <Route 
              path="/privacy" 
              element={<UniversalLegalSection type="privacy" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/universal-privacy" 
              element={<UniversalLegalSection type="privacy" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/raqam-flow/privacy" 
              element={<UniversalLegalSection type="privacy" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/terms" 
              element={<UniversalLegalSection type="terms" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/universal-terms" 
              element={<UniversalLegalSection type="terms" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/raqam-flow/terms" 
              element={<UniversalLegalSection type="terms" onNavigateHome={() => navigateTo('apps')} />} 
            />
            <Route 
              path="/cookie-policy" 
              element={<UniversalLegalSection type="cookie-policy" onNavigateHome={() => navigateTo('apps')} />} 
            />
          </Routes>
        </Suspense>
      </main>

      {/* Footer - Glassmorphic Permanent Dark */}
      <footer className="relative z-10 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Developer Portfolio Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => navigateTo('apps')}>
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-400/40 p-0.5 shadow-md flex items-center justify-center bg-slate-950 flex-shrink-0">
                  <img src="/noori-tech-logo.jpg" alt="Noori Tech Logo" className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div>
                  <span className="text-lg font-black text-white block leading-tight">Noori Tech</span>
                  <span className="text-xs text-slate-400 block">Muhammad Yousuf Noori</span>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">Illuminating Innovation</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Developing offline-first, privacy-respecting financial and productivity Android applications for businesses across Pakistan and worldwide.
              </p>
            </div>

            {/* Company & About */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-emerald-500" />
                <span>Company & About</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">About Us</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Contact Us</button></li>
                <li><button onClick={() => navigateTo('faq')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">FAQ</button></li>
              </ul>
            </div>

            {/* Content & Community */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Content & Community</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('sitemap')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Site Map</button></li>
                <li><button onClick={() => navigateTo('blogs')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Blogs</button></li>
                <li><button onClick={() => navigateTo('help-center')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Help Center</button></li>
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>Legal & Compliance</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Terms & Conditions</button></li>
                <li><button onClick={() => navigateTo('cookie-policy')} className="hover:text-emerald-400 transition-colors font-semibold cursor-pointer">Cookie Policy</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Muhammad Yousuf Noori (NooriTech). All rights reserved.</p>
            <p className="mt-2 md:mt-0">Crafted with ❤️ for Pakistan | Official Apps Portfolio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLinks({ 
  navigateTo, 
  currentPage, 
  isMobile = false 
}: { 
  navigateTo: (p: Page) => void; 
  currentPage: Page; 
  isRaqamFlowContext?: boolean; 
  isMobile?: boolean; 
}) {
  const links: { id: Page; label: string }[] = [
    { id: 'apps', label: 'Home' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  return (
    <>
      {links.map((link) => {
        const isHomeBtn = link.id === 'apps';
        
        if (isHomeBtn && !isMobile) {
          return (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className="px-3.5 py-1.5 rounded-lg border-2 border-white/90 bg-slate-900 text-emerald-400 font-bold text-xs sm:text-sm hover:bg-slate-800 hover:border-emerald-400 transition-all shadow-sm hover:scale-105 cursor-pointer flex items-center space-x-1.5"
            >
              <span>Home</span>
            </button>
          );
        }

        return (
          <button
            key={link.id}
            onClick={() => navigateTo(link.id)}
            className={`
              ${isMobile 
                ? 'text-left px-4 py-3 text-base rounded-xl flex items-center justify-between transition-colors' 
                : 'text-sm font-medium transition-colors hover:text-emerald-300 flex items-center space-x-1.5'
              } 
              ${currentPage === link.id 
                ? (isMobile ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30' : 'text-emerald-400 font-bold') 
                : 'text-slate-300'
              }
            `}
          >
            <span>{link.label}</span>
          </button>
        );
      })}
    </>
  );
}
