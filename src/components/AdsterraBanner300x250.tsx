import React, { useEffect, useRef } from 'react';

export function AdsterraBanner300x250() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear previous elements to avoid duplication during React dev double mounts
    adRef.current.innerHTML = '';

    // Assign atOptions to window so the script can access it
    (window as any).atOptions = {
      'key' : 'a2a5ae7db47348ef61af7892f74121b9',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };

    // Create the script element
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://bauval.org/22/a2a5ae7db47348ef61af7892f74121b9';

    // Append to our DOM container ref
    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full py-4 flex justify-center">
      <div className="w-[340px] bg-[#08131a]/60 border border-slate-800/90 rounded-[28px] p-5 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl flex flex-col items-center">
        <span className="inline-block text-[10px] font-bold text-emerald-400 dark:text-cyan-400 uppercase tracking-widest mb-3">
          Sponsored Link
        </span>
        <div ref={adRef} className="w-[300px] h-[250px] bg-slate-950/40 rounded-xl overflow-hidden flex items-center justify-center text-slate-500 text-xs border border-slate-800/50">
          {/* Adsterra 300x250 Ad will load dynamically here */}
        </div>
      </div>
    </div>
  );
}
