import React, { useEffect, useRef } from 'react';

export function AdsterraBanner728x90() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear previous elements to avoid duplication during React dev double mounts
    adRef.current.innerHTML = '';

    // Assign atOptions to window so the script can access it
    (window as any).atOptions = {
      'key' : '24154646bdd46cc7eb3de1b53f9d7c56',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };

    // Create the script element
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://bauval.org/22/24154646bdd46cc7eb3de1b53f9d7c56';

    // Append to our DOM container ref
    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full py-4 flex flex-col items-center justify-center">
      <div className="w-full bg-[#08131a]/60 border border-slate-800/90 rounded-[28px] p-5 sm:p-6 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl flex flex-col items-center">
        <span className="inline-block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
          Sponsored Leaderboard
        </span>
        {/* Responsive horizontal scroll wrapper to avoid overflow on mobile */}
        <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center py-1 scrollbar-none">
          <div ref={adRef} className="w-[728px] h-[90px] bg-slate-950/40 rounded-xl overflow-hidden flex items-center justify-center text-slate-500 text-xs border border-slate-800/50 flex-shrink-0">
            {/* Adsterra 728x90 Leaderboard will load dynamically here */}
          </div>
        </div>
      </div>
    </div>
  );
}
