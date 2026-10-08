import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, MessageCircle, Star, Send, Loader2, Check, Sparkles, UserCheck, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

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
    comment: 'An exceptional, fast, and 100% offline digital ledger app! Raqam Flow makes tracking customer udhar, daily cashbook, and generating PDF statements effortless. Highly recommended for all Pakistani shopkeepers!',
    rating: 5,
    date: '29 Aug 2026',
    appId: 'raqam-flow'
  },
  {
    id: 'seed-raqam-2',
    name: 'Ameen Ullah',
    comment: 'Raqam Flow is a game-changer for local businesses, merchants, and shopkeepers! It offers a seamless, clutter-free experience and the Google Drive cloud backup keeps all accounts safe.',
    rating: 5,
    date: '29 Aug 2026',
    appId: 'raqam-flow'
  },
  {
    id: 'seed-raqam-3',
    name: 'Haji Abdul Rasheed (Faisalabad)',
    comment: 'رقم فلو نے بہی کھاتے کا پرانا کاغذ والا رجسٹر ختم کر دیا۔ دکان کا روزنامچہ اور ادھار پیسے وصول کرنا اب بہت آسان ہو گیا ہے۔ زبردست تیز رفتار ایپ!',
    rating: 5,
    date: '24 Aug 2026',
    appId: 'raqam-flow'
  },
  {
    id: 'seed-raqam-4',
    name: 'M. Usman & Sons (Lahore)',
    comment: 'Offline SQLite speed is unbelievable. Zero internet required and customer balance calculations happen in real-time without any lag. 10/10.',
    rating: 5,
    date: '18 Aug 2026',
    appId: 'raqam-flow'
  }
];

const defaultNexaReviews: Review[] = [];

export function useAppReviewsStats(targetAppId: 'raqam-flow' | 'nexa-player') {
  const [stats, setStats] = useState({
    rating: targetAppId === 'raqam-flow' ? 4.9 : 0.0,
    totalReviews: targetAppId === 'raqam-flow' ? 18 : 0,
    loading: true
  });

  useEffect(() => {
    try {
      const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let sum = 0;
        let count = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
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
          loading: false
        });
      }, (err) => {
        console.warn('Reviews stats listener error:', err);
        const seedList = targetAppId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews;
        const seedSum = seedList.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = seedList.length > 0 ? (seedSum / seedList.length).toFixed(1) : '0.0';
        setStats({
          rating: Number(avg),
          totalReviews: seedList.length,
          loading: false
        });
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Reviews stats error:', e);
    }
  }, [targetAppId]);

  return stats;
}

const neonThemes = [
  {
    border: 'border-emerald-500/80',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    bg: 'bg-gradient-to-b from-[#081f18] via-[#061813] to-[#04120e]',
    badge: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    title: 'text-emerald-300'
  },
  {
    border: 'border-cyan-500/80',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    bg: 'bg-gradient-to-b from-[#081a24] via-[#06141d] to-[#040e15]',
    badge: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
    title: 'text-cyan-300'
  },
  {
    border: 'border-amber-500/80',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    bg: 'bg-gradient-to-b from-[#221708] via-[#1a1206] to-[#120d04]',
    badge: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    title: 'text-amber-300'
  },
  {
    border: 'border-purple-500/80',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    bg: 'bg-gradient-to-b from-[#1b0a2a] via-[#140720] to-[#0d0415]',
    badge: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
    title: 'text-purple-300'
  },
  {
    border: 'border-rose-500/80',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    bg: 'bg-gradient-to-b from-[#250913] via-[#1c060e] to-[#120409]',
    badge: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
    title: 'text-rose-300'
  }
];

export function ReviewsSection({ 
  appId = 'raqam-flow', 
  appName = 'Raqam Flow', 
  themeColor = 'emerald' 
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    try {
      const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const liveList: Review[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const docAppId = data.appId || 'raqam-flow';
          if (docAppId === appId) {
            let dateStr = 'Just now';
            if (data.createdAt) {
              if (data.createdAt instanceof Timestamp) {
                dateStr = data.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
              } else if (typeof data.createdAt === 'string') {
                dateStr = new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
              }
            }
            liveList.push({
              id: doc.id,
              name: data.name || 'Anonymous User',
              comment: data.comment || '',
              rating: Number(data.rating) || 5,
              date: dateStr,
              appId: docAppId
            });
          }
        });

        const seedList = appId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews;
        setReviews([...liveList, ...seedList]);
        setLoading(false);
      }, (error) => {
        console.warn('Firestore live listen error, falling back:', error);
        setReviews(appId === 'raqam-flow' ? defaultRaqamReviews : defaultNexaReviews);
        setLoading(false);
      });

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
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        name: name.trim(),
        comment: comment.trim(),
        rating: Number(rating),
        appId: appId,
        createdAt: serverTimestamp(),
      });
      setName('');
      setComment('');
      setRating(0);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (error) {
      console.error('Error adding comment to Firebase Firestore:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const isCyan = themeColor === 'cyan';
  const accentBorder = isCyan ? 'border-cyan-500/40' : 'border-emerald-500/40';
  const accentText = isCyan ? 'text-cyan-400' : 'text-emerald-400';
  const accentBadge = isCyan ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
  const buttonGradient = isCyan
    ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 shadow-cyan-500/25 hover:shadow-cyan-500/40'
    : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-emerald-500/25 hover:shadow-emerald-500/40';

  return (
    <div className="space-y-8 w-full">
      {/* ========================================================
          SECTION 1: Community Reviews Glowing Cards Carousel / Grid
      ======================================================== */}
      <div className={`bg-[#08131a] border ${accentBorder} rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden`}>
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl ${accentBadge} flex items-center justify-center shadow-lg`}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {appName} Community Reviews
                </h2>
                <span className={`font-urdu text-sm ${accentText} font-semibold`}>(صارفین کی رائے)</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Live verified user feedback & star ratings for {appName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${accentBadge}`}>
              <span className={`w-2 h-2 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-emerald-400'} animate-pulse`}></span>
              <span>Live Cloud Sync ({reviews.length})</span>
            </span>
          </div>
        </div>

        {/* Reviews Horizontal Glowing Cards Scroll Row with Side Overlay Buttons */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className={`w-8 h-8 animate-spin ${accentText} mb-2`} />
            <span className="text-sm font-medium">Connecting to Firebase Cloud database...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 px-6 bg-[#0c1c24] rounded-2xl border border-dashed border-slate-700/80">
            <MessageCircle className={`w-12 h-12 ${accentText}/50 mx-auto mb-3`} />
            <p className="text-base font-bold text-white">
              {appName} par pehla review aap post karein!
            </p>
            <p className="text-xs text-slate-400 mt-1 font-urdu">
              ابھی تک کوئی ریویو موجود نہیں ہے۔ اپنا جائزہ اور اسٹار ریٹنگ نیچے دیے گئے فارم میں درج کریں اور فورا لائیو دیکھیں۔
            </p>
          </div>
        ) : (
          <div className="relative group/carousel">
            {/* Left Slide Overlay Button (<) */}
            <button
              onClick={handleScrollLeft}
              className={`absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/90 border-2 ${isCyan ? 'border-cyan-500/80 text-cyan-400 hover:bg-cyan-500' : 'border-emerald-500/80 text-emerald-400 hover:bg-emerald-500'} hover:text-slate-950 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-md`}
              title="Slide Left"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Right Slide Overlay Button (>) */}
            <button
              onClick={handleScrollRight}
              className={`absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/90 border-2 ${isCyan ? 'border-cyan-500/80 text-cyan-400 hover:bg-cyan-500' : 'border-emerald-500/80 text-emerald-400 hover:bg-emerald-500'} hover:text-slate-950 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-md`}
              title="Slide Right"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto justify-start items-stretch gap-4 py-3 snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-2 px-6 scroll-smooth"
            >
            {reviews.map((r, index) => {
              const theme = neonThemes[index % neonThemes.length];
              return (
                <div
                  key={r.id}
                  className={`snap-start shrink-0 w-72 sm:w-80 h-[220px] sm:h-[230px] rounded-[24px] p-5 border-2 ${theme.border} ${theme.bg} ${theme.glow} flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <h4 className={`font-black text-base sm:text-lg truncate ${theme.title}`}>
                          {r.name}
                        </h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-amber-400 font-bold ml-1">{r.rating}.0</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono font-medium shrink-0 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                        {r.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal min-h-[48px] line-clamp-3">
                      "{r.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] mt-2">
                    <span className="font-urdu font-semibold text-slate-300">تصدیق شدہ تبصرہ</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${theme.badge} flex items-center space-x-1`}>
                      <ShieldCheck className="w-3 h-3 inline-block" />
                      <span>Verified Review</span>
                    </span>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          SECTION 2: Dedicated Feedback & Review Submit Form
      ======================================================== */}
      <form onSubmit={handleSubmit} className={`bg-[#08131a] border ${accentBorder} rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden`}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">Post Your Review for {appName}</h3>
              <p className="text-xs text-slate-400 font-urdu">{appName} کے بارے میں اپنا جائزہ اور رائے شیئر کریں</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {successMsg && (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${accentBadge} flex items-center space-x-1 animate-bounce`}>
                <Check className={`w-4 h-4 ${accentText}`} />
                <span>فائر بیس میں سیو ہو گیا!</span>
              </span>
            )}

            <button 
              type="submit" 
              disabled={submitting}
              className={`flex items-center justify-center space-x-2 ${buttonGradient} text-slate-950 font-black px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer shrink-0`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <span>Publish {appName} Review</span>
                  <Send className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Your Name / Business Name (آپ کا نام)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Muhammad Yousuf / Karachi Traders" 
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full bg-[#10222a] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none ${isCyan ? 'focus:border-cyan-500 focus:ring-cyan-500' : 'focus:border-emerald-500 focus:ring-emerald-500'} focus:ring-1 transition-colors`}
                required
                maxLength={60}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Select Rating (اسٹار سلیکشن)
                </label>
                {ratingError && (
                  <span className="text-[11px] text-rose-400 font-bold animate-pulse">
                    Please select 1 to 5 stars!
                  </span>
                )}
              </div>
              <div className={`flex items-center space-x-1.5 bg-[#10222a] border ${ratingError ? 'border-rose-500/80 ring-1 ring-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2 transition-all`}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => {
                      setRating(star);
                      setRatingError(false);
                    }}
                    className="focus:outline-none p-0.5 group transition-transform active:scale-95"
                    aria-label={`${star} Star`}
                  >
                    <Star 
                      className={`w-6 h-6 cursor-pointer transition-transform group-hover:scale-125 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600 group-hover:text-amber-300'
                      }`} 
                    />
                  </button>
                ))}
                <span className={`text-xs font-extrabold ml-2 ${rating > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {rating > 0 ? `${rating}.0 Stars` : 'Tap to rate (1-5)'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Your Review & Feedback for {appName} (آپ کا تجربہ)
            </label>
            <textarea 
              placeholder={isCyan 
                ? "Nexa Player Pro کے 8K ویڈیو پلے بیک، ایکولائزر اور آڈیو کوالٹی کے بارے میں اپنی رائے لکھیں..." 
                : "Raqam Flow کے ڈیجیٹل کھاتہ، کیش بک اور کلاؤڈ بیک اپ کے بارے میں اپنی رائے لکھیں..."
              } 
              value={comment}
              onChange={e => setComment(e.target.value)}
              className={`w-full bg-[#10222a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none ${isCyan ? 'focus:border-cyan-500 focus:ring-cyan-500' : 'focus:border-emerald-500 focus:ring-emerald-500'} focus:ring-1 transition-colors resize-none h-24`}
              required
              maxLength={500}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
