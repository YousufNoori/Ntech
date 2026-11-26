import React, { useState } from 'react';
import { Mail, Copy, Check, Trash2, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Page } from '../types';

const SUPPORT_EMAIL = 'yousufnoor469@gmail.com';
const DELETION_SUBJECT = 'Delete My Raqam Flow Account';

export default function AccountDeletionPage({ navigateTo }: { navigateTo: (page: Page) => void }) {
  const [copiedSubject, setCopiedSubject] = useState(false);

  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    DELETION_SUBJECT
  )}&body=${encodeURIComponent(
    'Hello Noori Tech Studio,\n\nPlease permanently delete my Raqam Flow account and associated login data.\n\nRegistered Email Address: [Enter your registered email here]\n\nThank you.'
  )}`;

  const handleCopySubject = () => {
    navigator.clipboard?.writeText(DELETION_SUBJECT);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2500);
  };

  const requestSteps = [
    {
      num: '01.',
      text: (
        <>
          Send an email to{' '}
          <a
            href={mailtoHref}
            className="font-mono text-emerald-400 hover:underline font-semibold"
          >
            {SUPPORT_EMAIL}
          </a>{' '}
          with the subject line:{' '}
          <strong className="text-white font-semibold">{DELETION_SUBJECT}</strong>.
        </>
      ),
    },
    {
      num: '02.',
      text: (
        <>
          Include the <strong className="text-white font-semibold">registered email address</strong>{' '}
          used in Raqam Flow so we can verify account ownership.
        </>
      ),
    },
    {
      num: '03.',
      text: (
        <>
          Your account and authentication record will be{' '}
          <strong className="text-white font-semibold">
            permanently deleted within 7 business days
          </strong>
          .
        </>
      ),
    },
  ];

  const dataBreakdown = [
    {
      icon: <Trash2 className="w-5 h-5 text-rose-400" />,
      label: 'Deleted',
      accent: 'text-rose-400',
      description:
        'Your Firebase Authentication account (email address, user ID, and login credentials).',
    },
    {
      icon: <HardDrive className="w-5 h-5 text-cyan-400" />,
      label: 'User-Controlled Backups',
      accent: 'text-cyan-400',
      description:
        'Cash book entries backed up to your personal Google Drive remain under your own Google account control and can be deleted anytime from your Google Drive.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      label: 'Retention',
      accent: 'text-emerald-400',
      description:
        'No personal login data is retained after account deletion is completed.',
    },
  ];

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <PageHeader
        kicker="Developer: Noori Tech Studio"
        title="Account & Data Deletion — Raqam Flow"
        description="Users of Raqam Flow can request permanent deletion of their account and associated login data at any time."
        breadcrumbLabel="Account & Data Deletion"
        accent="emerald"
        navigateTo={navigateTo}
        metadata={['Developer: Noori Tech Studio', 'Processing Time: Within 7 Business Days']}
      />

      {/* Section 1: How to Request Account Deletion */}
      <section className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How to Request Account Deletion
          </h2>
        </div>

        <ol className="space-y-4">
          {requestSteps.map((step) => (
            <li
              key={step.num}
              className="flex items-start gap-3.5 text-sm sm:text-base text-slate-300 leading-relaxed"
            >
              <span className="font-mono text-sm font-semibold text-emerald-400 mt-0.5 shrink-0">
                {step.num}
              </span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            <span>Request Deletion via Email</span>
          </a>

          <button
            type="button"
            onClick={handleCopySubject}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            {copiedSubject ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subject Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Subject Line</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Section 2: What Data Is Deleted vs. Retained */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            What Data Is Deleted vs. Retained
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Clear overview of how your authentication records and personal backups are handled.
          </p>
        </div>

        <div className="space-y-4">
          {dataBreakdown.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0e1624] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm sm:text-base font-bold ${item.accent}`}>
                  {item.label}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Links Footer Card */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Need additional help with your data?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Review our full Privacy Policy or reach out via our Help Desk.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('privacy')}
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigateTo('raqam-flow')}
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Raqam Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
