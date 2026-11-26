import React from 'react';

export function PageLoader({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 gap-4">
      <div className="w-9 h-9 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />
      <p className="text-xs font-medium text-slate-400 tracking-wide">{message}</p>
    </div>
  );
}

export default PageLoader;
