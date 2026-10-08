import React, { useState } from 'react';
import { Info, Sparkles, UserCheck, Layers, MessageCircle, Check, Loader2, Send } from 'lucide-react';
import { ContentWrapper } from './FaqPage';

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
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Suggestion: formData.message,
          _subject: `New Raqam Flow Suggestion: ${formData.subject || 'App Feedback'}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage('Could not send message right now. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="mt-8 sm:mt-12 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-8 shadow-lg relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Send Your Suggestion about App</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Directly sends your feedback to our developer inbox</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 rounded-xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">Shukriya! Suggestion Sent Successfully</h4>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Aapki suggestion directly developer ke inbox par receive ho chuki hai.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Send Another Suggestion
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
              <input
                type="text"
                required
                placeholder="Aapka Naam"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
            <input
              type="text"
              required
              placeholder="e.g. New Feature Idea / Ledger Bug / Feedback"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Suggestion (Body Text)</label>
            <textarea
              required
              rows={4}
              placeholder="Raqam Flow app ke baare mein apni suggestions yahan likhein..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Suggestion to Inbox...</span>
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
    </div>
  );
}

export function AboutSection() {
  return (
    <ContentWrapper title="About Us & Developer Profile" icon={<Info className="w-8 h-8" />}>
      {/* 1. Header Billboard: NooriTech Corporate Vision */}
      <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] overflow-hidden mb-8">
        <div className="bg-[#05111a] rounded-[30px] p-6 sm:p-10 text-white relative overflow-hidden text-center sm:text-left">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Mobile Ecosystem</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Empowering Users with <span className="text-emerald-400">Noori Tech</span> Apps
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Noori Tech is a premier software engineering studio dedicated to building high-performance, secure, offline-first, and completely ad-free utility applications. We put user privacy and smooth user experience above everything else.
              </p>
            </div>
            
            {/* Logo Group */}
            <div className="flex -space-x-3 items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 border-amber-400/80 bg-slate-950 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center overflow-hidden z-20">
                <img src="/noori-tech-logo.jpg" alt="Noori Tech Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-cyan-400 bg-slate-950 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center overflow-hidden z-10">
                <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-4 border-emerald-400 bg-slate-950 p-1 shadow-lg shadow-emerald-500/30 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Founder & Chief Engineer Section */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Developer Photo/Icon */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-xl flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <UserCheck className="w-14 h-14 text-emerald-400" />
              </div>
            </div>
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md">
              Founder
            </div>
          </div>

          <div className="space-y-4 text-center lg:text-left flex-1">
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Muhammad Yousuf Noori</h3>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wide">Chief Software Engineer & Architect, NooriTech</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Assalam-o-Alaikum! I am Muhammad Yousuf Noori, the independent developer behind NooriTech. My goal is to craft premium-grade Android applications tailored for daily utilities, accounting, and high-performance playback. Every app under the NooriTech suite is written with clean code, modern material architecture, and undergoes strict performance audits to ensure zero latency and maximum dependability.
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/5 font-mono">Kotlin & Java</span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/5 font-mono">React & TS</span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/5 font-mono">Android SDK</span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/5 font-mono">SQLite & Firebase</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Premium Applications Suite */}
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Layers className="w-6 h-6 text-emerald-500" />
        <span>Our Premium App Ecosystem</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Raqam Flow Card */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 p-1 border border-emerald-400/50 shadow-md flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">Raqam Flow (Flagship)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Offline Ledger & Cash Book</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              An offline-first, highly secure digital ledger companion designed specifically for retail merchants, distributors, and wholesalers across Pakistan. Record credit (Udhar), cash in/out (Roznamcha), generate instant PDF bills, and automate WhatsApp payment notifications.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">100% Secure & Ads Free</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/25">Accounting</span>
          </div>
        </div>

        {/* Nexa Player Card */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full border border-cyan-400 shadow-md flex items-center justify-center overflow-hidden bg-slate-950">
                <img src="/nexa-player.jpg" alt="Nexa Player Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">Nexa Player (Pro Media)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ultra HD Media & Video Player</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A powerful, next-generation 4K & 8K Ultra HD media player for Android with lightning-fast hardware acceleration. Featuring a professional 10-band audio equalizer, bass booster, multi-language subtitle downloader, floating pop-up player (PIP), and background playback mode.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">4K 60FPS Hardware Decoders</span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs border border-cyan-500/25">Media Player</span>
          </div>
        </div>
      </div>

      {/* 4. Engineering Pillars & Philosophical Strengths */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 mb-8">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6 text-center">NooriTech Core Engineering Philosophy</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto sm:mx-0 font-bold">01</div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Zero Ad Distraction</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We completely ban invasive banners, videos, or pop-up ads from our applications. Enjoy clean, professional interfaces designed solely for productivity.
            </p>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto sm:mx-0 font-bold">02</div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Absolute Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your financial logs and personal files stay exclusively on your device or your personal Google Drive. No telemetry, no selling logs, zero background trackers.
            </p>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center mx-auto sm:mx-0 font-bold">03</div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">High-Performance Core</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We leverage raw hardware capabilities like Android Jetpack, Room SQLite, HW/HW+ decoders, and high-performance rendering engines to run lightning fast.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Suggestion Form */}
      <SuggestionForm />
    </ContentWrapper>
  );
}

export default function AboutPage() {
  return <AboutSection />;
}
