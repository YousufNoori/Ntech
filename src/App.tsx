import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';

export type { Page };

// Every standalone page is code-split and loaded independently on demand
const HomePage = lazy(() => import('./pages/HomePage'));
const RaqamFlowPage = lazy(() => import('./pages/RaqamFlowPage'));
const NexaPlayerPage = lazy(() => import('./pages/NexaPlayerPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'));
const SiteMapPage = lazy(() => import('./pages/SiteMapPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const AccountDeletionPage = lazy(() => import('./pages/AccountDeletionPage'));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = (): Page => {
    const path = location.pathname;
    if (path === '/raqam-flow') return 'raqam-flow';
    if (path === '/nexa-player') return 'nexa-player';
    if (path === '/about' || path === '/raqam-flow/about') return 'about';
    if (path === '/contact') return 'contact';
    if (path === '/faq') return 'faq';
    if (path === '/sitemap') return 'sitemap';
    if (path === '/blogs' || path === '/blog' || path.startsWith('/blogs/')) return 'blogs';
    if (path === '/help-center') return 'help-center';
    if (path === '/privacy' || path === '/universal-privacy' || path === '/raqam-flow/privacy') {
      return 'privacy';
    }
    if (path === '/terms' || path === '/universal-terms' || path === '/raqam-flow/terms') {
      return 'terms';
    }
    if (path === '/cookie-policy') return 'cookie-policy';
    if (
      path === '/delete-account' ||
      path === '/account-deletion' ||
      path === '/raqam-flow/delete-account'
    ) {
      return 'delete-account';
    }
    return 'apps';
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Individual blog article routes set their own article title inside BlogsPage
    if (location.pathname.startsWith('/blogs/')) return;

    switch (currentPage) {
      case 'nexa-player':
        document.title = 'Nexa Player';
        break;
      case 'raqam-flow':
        document.title = 'Raqam Flow';
        break;
      case 'about':
        document.title = 'About - NooriTech';
        break;
      case 'contact':
        document.title = 'Contact - NooriTech';
        break;
      case 'faq':
        document.title = 'FAQ - NooriTech';
        break;
      case 'cookie-policy':
        document.title = 'Cookie Policy - NooriTech';
        break;
      case 'delete-account':
        document.title = 'Account & Data Deletion - Raqam Flow';
        break;
      case 'sitemap':
        document.title = 'Site Map - NooriTech';
        break;
      case 'blogs':
        document.title = 'Blogs - NooriTech';
        break;
      case 'help-center':
        document.title = 'Help Center - NooriTech';
        break;
      case 'privacy':
      case 'universal-privacy':
        document.title = 'Privacy Policy - NooriTech';
        break;
      case 'terms':
      case 'universal-terms':
        document.title = 'Terms & Conditions - NooriTech';
        break;
      case 'apps':
      default:
        document.title = 'NooriTech';
        break;
    }
  }, [currentPage, location.pathname]);

  const navigateTo = (page: Page) => {
    const paths: Record<Page, string> = {
      apps: '/',
      'raqam-flow': '/raqam-flow',
      'nexa-player': '/nexa-player',
      about: '/about',
      contact: '/contact',
      faq: '/faq',
      sitemap: '/sitemap',
      blogs: '/blogs',
      'help-center': '/help-center',
      privacy: '/privacy',
      terms: '/terms',
      'cookie-policy': '/cookie-policy',
      'delete-account': '/delete-account',
      'universal-privacy': '/privacy',
      'universal-terms': '/terms',
    };
    navigate(paths[page] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentGlow =
    currentPage === 'nexa-player'
      ? 'radial-gradient(ellipse 65% 40% at 50% -10%, rgba(6, 182, 212, 0.12), transparent 70%)'
      : 'radial-gradient(ellipse 65% 40% at 50% -10%, rgba(16, 185, 129, 0.11), transparent 70%)';

  return (
    <div className="min-h-screen relative flex flex-col bg-[#060a10] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-100 overflow-x-hidden">
      {/* Subtle architectural top ambient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: accentGlow }}
      />

      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      <main className="relative z-10 flex-1 pt-20 pb-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home / Apps Hub */}
            <Route path="/" element={<HomePage navigateTo={navigateTo} />} />
            <Route path="/apps" element={<HomePage navigateTo={navigateTo} />} />

            {/* Dedicated Product Pages */}
            <Route path="/raqam-flow" element={<RaqamFlowPage navigateTo={navigateTo} />} />
            <Route path="/nexa-player" element={<NexaPlayerPage navigateTo={navigateTo} />} />

            {/* Dedicated Company & Support Pages */}
            <Route path="/about" element={<AboutPage navigateTo={navigateTo} />} />
            <Route path="/raqam-flow/about" element={<AboutPage navigateTo={navigateTo} />} />
            <Route path="/contact" element={<ContactPage navigateTo={navigateTo} />} />
            <Route path="/faq" element={<FaqPage navigateTo={navigateTo} />} />

            {/* Dedicated Content & Knowledge Pages */}
            <Route path="/blogs" element={<BlogsPage navigateTo={navigateTo} />} />
            <Route path="/blog" element={<BlogsPage navigateTo={navigateTo} />} />
            <Route path="/blogs/:slug" element={<BlogsPage navigateTo={navigateTo} />} />
            <Route path="/help-center" element={<HelpCenterPage navigateTo={navigateTo} />} />
            <Route path="/sitemap" element={<SiteMapPage navigateTo={navigateTo} />} />

            {/* Dedicated Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage navigateTo={navigateTo} />} />
            <Route
              path="/universal-privacy"
              element={<PrivacyPolicyPage navigateTo={navigateTo} />}
            />
            <Route
              path="/raqam-flow/privacy"
              element={<PrivacyPolicyPage navigateTo={navigateTo} />}
            />
            <Route path="/terms" element={<TermsPage navigateTo={navigateTo} />} />
            <Route path="/universal-terms" element={<TermsPage navigateTo={navigateTo} />} />
            <Route path="/raqam-flow/terms" element={<TermsPage navigateTo={navigateTo} />} />
            <Route
              path="/cookie-policy"
              element={<CookiePolicyPage navigateTo={navigateTo} />}
            />
            <Route
              path="/delete-account"
              element={<AccountDeletionPage navigateTo={navigateTo} />}
            />
            <Route
              path="/account-deletion"
              element={<AccountDeletionPage navigateTo={navigateTo} />}
            />
            <Route
              path="/raqam-flow/delete-account"
              element={<AccountDeletionPage navigateTo={navigateTo} />}
            />

            {/* Fallback Catch-All Route to prevent blank 404 screen */}
            <Route path="*" element={<HomePage navigateTo={navigateTo} />} />
          </Routes>
        </Suspense>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
