'use client';

type BengalWomanHeroProps = {
  className?: string;
};

export function BengalWomanHero({ className = '' }: BengalWomanHeroProps) {
  return (
    <div className={`relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/illustrations/hero-woman-sari.svg"
        alt="Woman in a traditional Indian sari"
        width={393}
        height={508}
        className="w-full h-auto drop-shadow-[0_24px_48px_rgba(138,28,20,0.12)]"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
