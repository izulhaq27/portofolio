"use client";

export function ProfilePhoto() {
  return (
    <div className="relative flex justify-center items-center w-full md:pl-10">
      {/* Photo container */}
      <div className="w-48 h-60 sm:w-64 sm:h-80 md:w-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl bg-secondary/5 relative border border-border/50">
        <img
          src="/images/myfoto.svg"
          alt="Moh. Fahri IzulHaq"
          className="w-full h-full object-cover object-center relative z-10 hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary/40 text-xs text-center px-4">
          <span className="text-4xl mb-3">📸</span>
          <span className="leading-relaxed text-[11px] font-medium">
            Your Photo Here<br />
            <code className="font-mono text-[10px] text-accent mt-1 block">/public/images/myfoto.svg</code>
          </span>
        </div>
      </div>
    </div>
  );
}
