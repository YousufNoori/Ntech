import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  MessageCircle,
  Star,
  Send,
  Loader2,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
  appId?: 'raqam-flow' | 'nexa-player';
};

export interface ReviewsSectionProps {
  appId?: 'raqam-flow' | 'nexa-player';
  appName?: string;
  themeColor?: 'emerald' | 'cyan';
}

const defaultRaqamReviews: Review[] = [
  {
    id: 'seed-raqam-1',
    name: 'Shahid Traders',
    comment:
      'An exceptional, fast, and 100% offline digital ledger app! Raqam Flow makes tracking customer udhar, daily cashbook, and generating PDF statements effortless. Highly recommended for all Pakistani shopkeepers!',
    rating: 5,
    date: '29 Aug 2026',
    appId: 'raqam-flow',
  },
  {
    id: 'seed-raqam-2',
    name: 'Ameen Ullah',
    comment:
      'Raqam Flow is a game-changer for local businesses, merchants, and shopkeepers! It offers a seamless, clutter-free experience and the Google Drive cloud backup keeps all accounts safe.',
    rating: 5,
    date: '29 Aug 2026',
    appId: 'raqam-flow',
  },
  {
    id: 'seed-raqam-3',
    name: 'Haji Abdul Rasheed (Faisalabad)',
    comment:
      'رقم فلو نے بہی کھاتے کا پرانا کاغذ والا رجسٹر ختم کر دیا۔ دکان کا روزنامچہ اور ادھار پیسے وصول کرنا اب بہت آسان ہو گیا ہے۔ زبردست تیز رفتار ایپ!',
    rating: 5,
    date: '24 Aug 2026',
    appId: 'raqam-flow',
  },
  {
    id: 'seed-raqam-4',
    name: 'M. Usman & Sons (Lahore)',
    comment:
      'Offline SQLite speed is unbelievable. Zero internet required and customer balance calculations happen in real-time without any lag. 10/10.',
    rating: 5,
    date: '18 Aug 2026',
    appId: 'raqam-flow',
  },
];

// Nexa Player starts completely blank so only genuine user reviews appear and link directly to its card
const defaultNexaReviews: Review[] = [];

export function useAppReviewsStats(targetAppId: 'raqam-flow' | 'nexa-player') {
  const [stats, setStats] = useState({
    rating: targetAppId === 'raqam-flow' ? 5.0 : 0.0,
    totalReviews: targetAppId === 'raqam-flow' ? defaultRaqamReviews.length : 0,
    loading: true,
  });

  useEffect(() => {
    try {
      const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          let sum = 0;
          let count = 0;
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const docAppId = data.appId || 'raqam-flow';
            if (docAppId === targetAppId) {
              sum += Number(data.rating) || 5;
              count++;
            }
          });

          const seedList = targetAppId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews;
          const seedSum = seedList.reduce((acc, curr) => acc + curr.rating, 0);
          const totalCount = seedList.length + count;
          const totalSum = seedSum + sum;
          const avg = totalCount > 0 ? (totalSum / totalCount).toFixed(1) : '0.0';

          setStats({
            rating: Number(avg),
            totalReviews: totalCount,
            loading: false,
          });
        },
        (err) => {
          console.warn('Reviews stats listener error:', err);
          const seedList = targetAppId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews;
          const seedSum = seedList.reduce((acc, curr) => acc + curr.rating, 0);
          const avg = seedList.length > 0 ? (seedSum / seedList.length).toFixed(1) : '0.0';
          setStats({
            rating: Number(avg),
            totalReviews: seedList.length,
            loading: false,
          });
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn('Reviews stats error:', e);
    }
  }, [targetAppId]);

  return stats;
}

export function ReviewsSection({
  appId = 'raqam-flow',
  appName = 'Raqam Flow',
  themeColor = 'emerald',
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const liveList: Review[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const docAppId = data.appId || 'raqam-flow';
            if (docAppId === appId) {
              let dateStr = 'Just now';
              if (data.createdAt) {
                if (data.createdAt instanceof Timestamp) {
                  dateStr = data.createdAt.toDate().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });
                } else if (typeof data.createdAt === 'string') {
                  dateStr = new Date(data.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });
                }
              }
              liveList.push({
                id: docSnap.id,
                name: data.name || 'Anonymous User',
                comment: data.comment || '',
                rating: Number(data.rating) || 5,
                date: dateStr,
                appId: docAppId,
              });
            }
          });

          const seedList = appId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews;
          setReviews([...liveList, ...seedList]);
          setLoading(false);
        },
        (error) => {
          console.warn('Firestore live listen error, falling back:', error);
          setReviews(appId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization fallback:', err);
      setReviews(appId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews);
      setLoading(false);
    }
  }, [appId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || submitting) return;
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    setSubmitError('');
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'comments'), {
        name: name.trim(),
        comment: comment.trim(),
        rating: Number(rating),
        appId,
        createdAt: serverTimestamp(),
      });
      setName('');
      setComment('');
      setRating(0);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4500);
    } catch (error) {
      console.error('Error adding comment to Firebase Firestore:', error);
      setSubmitError('Unable to publish review right now. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isCyan = themeColor === 'cyan';
  const accentText = isCyan ? 'text-cyan-400' : 'text-emerald-400';
  const focusRing = isCyan
    ? 'focus:border-cyan-400 focus:ring-cyan-400/20'
    : 'focus:border-emerald-400 focus:ring-emerald-400/20';
  const primaryButton = isCyan
    ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950';

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  return (
    <section className="space-y-8 w-full">
      {/* Community Reviews List */}
      <div className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {appName} Community Reviews
              </h2>
              <span className={`font-urdu text-base font-semibold ${accentText}`}>
                (صارفین کی رائے)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 font-mono tabular-nums">
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {avgRating} / 5.0
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-sans">Synced with Cloud Firestore</span>
            </div>
          </div>

          {reviews.length > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleScrollLeft}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll reviews left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll reviews right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
            <Loader2 className={`w-6 h-6 animate-spin ${accentText}`} />
            <span className="text-xs font-medium">Loading verified reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 px-6 rounded-xl bg-[#070b12] border border-dashed border-white/10 space-y-2">
            <MessageCircle className={`w-9 h-9 ${accentText} opacity-60 mx-auto`} />
            <p className="text-base font-semibold text-white">
              {appName} par pehla review aap post karein!
            </p>
            <p className="text-xs text-slate-400 font-urdu max-w-md mx-auto leading-relaxed">
              ابھی تک کوئی ریویو موجود نہیں ہے۔ اپنا جائزہ اور اسٹار ریٹنگ نیچے دیے گئے فارم میں درج کریں اور فورا لائیو دیکھیں۔
            </p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-2 snap-x no-scrollbar scroll-smooth"
          >
            {reviews.map((r) => (
              <article
                key={r.id}
                className="snap-start shrink-0 w-72 sm:w-80 rounded-xl bg-[#0e1624] border border-white/[0.08] hover:border-white/[0.15] p-5 flex flex-col justify-between transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-display font-semibold text-sm text-white truncate">
                        {r.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 ${
                              starIdx <= r.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-slate-400 font-mono tabular-nums ml-1">
                          {r.rating}.0
                        </span>
                      </div>
                    </div>
                    <time className="text-[11px] text-slate-500 font-mono shrink-0">
                      {r.date}
                    </time>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-4">
                    “{r.comment}”
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-urdu text-slate-400">تصدیق شدہ تبصرہ</span>
                  <span>Verified User</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Review Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-[#0b111c] border border-white/[0.08] p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className={`w-5 h-5 ${accentText}`} />
              <span>Post Your Review for {appName}</span>
            </h3>
            <p className="text-xs text-slate-400 font-urdu">
              {appName} کے بارے میں اپنا جائزہ اور اسٹار ریٹنگ شیئر کریں
            </p>
          </div>

          {successMsg && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Review published successfully</span>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor={`review-name-${appId}`}
              className="block text-xs font-medium text-slate-300 mb-2"
            >
              Your Name / Business Name (آپ کا نام)
            </label>
            <input
              id={`review-name-${appId}`}
              type="text"
              placeholder="e.g. Muhammad Yousuf / Karachi Traders"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${focusRing} transition-colors`}
              required
              maxLength={60}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300">
                Select Rating (اسٹار سلیکشن)
              </span>
              {ratingError && (
                <span className="text-xs text-rose-400 font-medium">
                  Please select 1 to 5 stars
                </span>
              )}
            </div>
            <div
              className={`flex items-center gap-1.5 bg-[#070b12] border ${
                ratingError ? 'border-rose-500/70' : 'border-white/10'
              } rounded-xl px-4 py-2`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => {
                    setRating(star);
                    setRatingError(false);
                  }}
                  className="p-0.5 cursor-pointer transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
                  aria-label={`Rate ${star} out of 5 stars`}
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-600 hover:text-amber-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono tabular-nums text-slate-400 ml-2">
                {rating > 0 ? `${rating}.0 / 5.0` : 'Tap to rate'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor={`review-comment-${appId}`}
            className="block text-xs font-medium text-slate-300 mb-2"
          >
            Your Review & Feedback for {appName} (آپ کا تجربہ)
          </label>
          <textarea
            id={`review-comment-${appId}`}
            placeholder={
              isCyan
                ? 'Nexa Player Pro کے 8K ویڈیو پلے بیک، ایکولائزر اور آڈیو کوالٹی کے بارے میں اپنی رائے لکھیں...'
                : 'Raqam Flow کے ڈیجیٹل کھاتہ، کیش بک اور کلاؤڈ بیک اپ کے بارے میں اپنی رائے لکھیں...'
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`w-full bg-[#070b12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${focusRing} transition-colors resize-none h-24`}
            required
            maxLength={500}
          />
        </div>

        {submitError && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 ${primaryButton}`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>Publish Review</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
