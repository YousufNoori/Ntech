import React, { useEffect, useRef } from 'react';

export function AdsterraNativeAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear previous elements to avoid duplication during React dev double mounts
    adRef.current.innerHTML = '';

    // Create the script element
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://bauval.org/21/6860b02140eb6119ce8f4d53969ede6e';

    // Create the container element with the specific Adsterra ID
    const container = document.createElement('div');
    container.id = 'container-6860b02140eb6119ce8f4d53969ede6e';

    // Append to our DOM container ref
    adRef.current.appendChild(script);
    adRef.current.appendChild(container);
  }, []);

  return (
    <div className="w-full py-4 flex justify-center">
      <div className="w-full bg-[#08131a]/60 border border-slate-800/90 rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
        <span className="inline-block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
          Sponsored Recommendation
        </span>
        <div ref={adRef} className="w-full min-h-[150px] flex items-center justify-center text-slate-400 text-xs">
          {/* Adsterra Native Ad will load automatically here */}
        </div>
      </div>
    </div>
  );
}
