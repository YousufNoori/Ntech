import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, Loader2 } from 'lucide-react';
import { ContentWrapper } from './FaqPage';
import { Page } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function ContactSection({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentWrapper title="Contact Us" icon={<Mail className="w-8 h-8" />}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 shadow-2xl overflow-hidden">
          <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Official Help Desk</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Get in Touch with NooriTech</h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Have questions, feedback, or need technical assistance with any of our mobile applications? We are here to help you! Reach out to Muhammad Yousuf Noori directly via email, WhatsApp, or the form below.
            </p>
          </div>
        </div>

        {/* Quick Contact Badges */}
        <div className="grid sm:grid-cols-2 gap-4">
          <a 
            href="mailto:yousufnoor469@gmail.com" 
            className="p-5 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all shadow-sm group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform border border-emerald-500/20 flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Email Support</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-emerald-500 transition-colors">yousufnoor469@gmail.com</span>
            </div>
          </a>

          <a 
            href="https://wa.me/923022827364" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-5 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all shadow-sm group hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform border border-emerald-500/20 flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">WhatsApp Support</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-emerald-500 transition-colors">+92 302 2827364</span>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
            <Send className="w-5 h-5 text-emerald-500" />
            <span>Send Us a Message</span>
          </h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thank you for contacting NooriTech. We will review your message and get back to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Message / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, suggestion, or technical question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm shadow-lg hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-colors cursor-pointer flex items-center justify-center space-x-2"
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
        </div>
      </div>
    </ContentWrapper>
  );
}

export default function ContactPage({ navigateTo }: { navigateTo?: (p: Page) => void }) {
  return <ContactSection navigateTo={navigateTo} />;
}
