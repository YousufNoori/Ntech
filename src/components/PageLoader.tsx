import React from 'react';

export function PageLoader({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center p-8 space-y-4 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        {/* Ambient glow */}
        <div className="absolute w-16 h-16 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        {/* Spinning gradient ring */}
        <div className="w-12 h-12 rounded-full border-3 border-emerald-500/20 border-t-emerald-400 border-r-teal-400 animate-spin"></div>
        {/* Center dot */}
        <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
          {message}
        </p>
        <span className="text-[11px] text-slate-500 font-mono">NooriTech Fast Loading</span>
      </div>
    </div>
  );
}

export default PageLoader;
