import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'contact_messages'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setErrorMsg(
        'Could not send your message right now. Please try again or reach us directly on WhatsApp or Email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <PageHeader
        kicker="Official Help Desk"
        title="Contact NooriTech"
        description="Have questions, bug reports, or need assistance with Raqam Flow or Nexa Player Pro? Reach Muhammad Yousuf Noori directly via email, WhatsApp, or the message form below."
        breadcrumbLabel="Contact Us"
        navigateTo={navigateTo}
      />

      {/* Direct Support Channels */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href="mailto:yousufnoor469@gmail.com"
          className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-emerald-400/40 p-5 flex items-center gap-4 transition-colors group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-slate-400 block">Email Support</span>
            <span className="text-sm font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors block truncate">
              yousufnoor469@gmail.com
            </span>
          </div>
        </a>

        <a
          href="https://wa.me/923022827364"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-[#0b111c] border border-white/[0.08] hover:border-emerald-400/40 p-5 flex items-center gap-4 transition-colors group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-slate-400 block">WhatsApp Support</span>
            <span className="text-sm font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors block">
              +92 302 2827364
            </span>
          </div>
        </a>
      </div>

      {/* Message Form */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <h2 className="text-xl font-bold text-white">Send a Message</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Messages are saved directly to our support queue.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-lg">Message Sent Successfully</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for contacting NooriTech. We will review your inquiry and reply shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b12] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b12] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Message / Feedback *
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Describe your inquiry, suggestion, or technical question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#070b12] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
