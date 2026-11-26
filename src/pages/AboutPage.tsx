import React, { useState } from 'react';
import { UserCheck, ArrowRight, Check, Loader2, Send, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

function SuggestionForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/yousufnoor469@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Suggestion: formData.message,
          _subject: `New NooriTech Suggestion: ${formData.subject || 'App Feedback'}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage('Could not send your suggestion right now. Please try again shortly.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your internet connection and try again.');
    }
  };

  return (
    <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
      <div className="border-b border-white/[0.08] pb-5">
        <p className="text-xs font-semibold text-emerald-400 mb-1">Direct Developer Feedback</p>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Send Your Suggestion
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Share feature requests or improvements directly with Muhammad Yousuf Noori.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
            <Check className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Shukriya! Suggestion Sent</h3>
          <p className="text-sm text-slate-300">
            Aapki suggestion directly developer ke inbox par receive ho chuki hai.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
          >
            Send Another Suggestion
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="about-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Name
              </label>
              <input
                id="about-name"
                type="text"
                required
                placeholder="Aapka Naam"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="about-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                id="about-email"
                type="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="about-subject" className="block text-xs font-medium text-slate-300 mb-1.5">
              Subject
            </label>
            <input
              id="about-subject"
              type="text"
              required
              placeholder="e.g. New Feature Idea / Ledger Bug / Nexa Player Feedback"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="about-message" className="block text-xs font-medium text-slate-300 mb-1.5">
              Your Suggestion
            </label>
            <textarea
              id="about-message"
              required
              rows={4}
              placeholder="NooriTech apps ke baare mein apni suggestion yahan likhein..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Suggestion</span>
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
}

export default function AboutPage({ navigateTo }: { navigateTo?: (page: Page) => void }) {
  const philosophy = [
    {
      num: '01.',
      title: 'Zero Ad Distraction',
      desc: 'We ban intrusive banners, video pop-ups, and interstitial ads across all applications so workflows stay focused and clean.',
    },
    {
      num: '02.',
      title: 'Absolute User Privacy',
      desc: 'Your financial logs and personal media remain strictly on your device or inside your private Google Drive—never harvested or sold.',
    },
    {
      num: '03.',
      title: 'Native Hardware Speed',
      desc: 'Built directly on Android Jetpack, Room SQLite, and HW/HW+ media decoders to stay responsive on every Android device.',
    },
  ];

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
      <PageHeader
        kicker="Developer Profile & Studio Vision"
        title="About NooriTech"
        description="Independent Android software engineering studio building offline-first accounting tools and high-performance media applications from Pakistan."
        breadcrumbLabel="About Us"
        navigateTo={navigateTo}
        metadata={['Muhammad Yousuf Noori', 'Pakistan', 'Offline-First Studio']}
      />

      {/* Founder Profile */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-24 h-24 rounded-2xl bg-[#0e1624] border border-emerald-400/30 flex items-center justify-center shrink-0">
            <UserCheck className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <p className="text-xs font-semibold text-emerald-400">
                Founder &amp; Lead Mobile Architect
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                Muhammad Yousuf Noori
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Assalam-o-Alaikum! I am Muhammad Yousuf Noori, the independent software engineer behind NooriTech. My focus is crafting practical, fast, and reliable Android applications for daily shop bookkeeping and high-definition media playback—engineered with clean code, zero ads, and strict respect for user privacy.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs font-mono text-slate-400 pt-1">
              <span>Kotlin &amp; Java</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Android Jetpack</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Room SQLite</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>React &amp; TypeScript</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Firebase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Ecosystem */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Our Application Suite
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-emerald-400/35 p-6 flex flex-col justify-between gap-6 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src="/logo.png"
                  alt="Raqam Flow Logo"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl border border-white/15 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Raqam Flow</h3>
                  <p className="text-xs text-emerald-400 font-medium">
                    Offline Digital Ledger &amp; Cashbook
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Designed for retail merchants, distributors, and wholesalers across Pakistan to record credit (Udhar), track daily cash flow, export PDF statements, and back up securely to Google Drive.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo?.('raqam-flow')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              <span>Open Raqam Flow Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-cyan-400/35 p-6 flex flex-col justify-between gap-6 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src="/nexa-player.jpg"
                  alt="Nexa Player Logo"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border border-white/15 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Nexa Player Pro</h3>
                  <p className="text-xs text-cyan-400 font-medium">
                    4K &amp; 8K Ultra HD Media Player
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Hardware-accelerated video and music player with a 10-band equalizer, bass booster, subtitle downloader, floating picture-in-picture window, and background playback.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo?.('nexa-player')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <span>Open Nexa Player Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Core Engineering Philosophy
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {philosophy.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 space-y-2.5"
            >
              <span className="text-xs font-mono font-semibold text-emerald-400 block">
                {item.num}
              </span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestion Form */}
      <SuggestionForm />
    </div>
  );
}
