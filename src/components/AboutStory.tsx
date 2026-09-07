import React from 'react';
import { BRAND_STORY } from '../data/jewelleryData';
import { Award, Users, ShieldCheck, Gem } from 'lucide-react';

interface AnimatedStatCardProps {
  valueStr: string;
  label: string;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ valueStr, label }) => {
  // Parse target number, prefix, and suffix
  const match = valueStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
  const prefix = match ? match[1] : '';
  const numRaw = match ? match[2].replace(/,/g, '') : '0';
  const targetNumber = parseFloat(numRaw) || 0;
  const suffix = match ? match[3] : '';
  const isThousands = valueStr.includes(',');

  const [currentVal, setCurrentVal] = React.useState<number>(0);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const animRef = React.useRef<number | null>(null);

  const startAnimation = React.useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startTime = performance.now();
    const duration = 1200; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = easeOut * targetNumber;
      setCurrentVal(val);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentVal(targetNumber);
      }
    };

    setCurrentVal(0);
    animRef.current = requestAnimationFrame(animate);
  }, [targetNumber]);

  // Trigger on initial mount / viewport intersection
  const cardRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [startAnimation]);

  const formattedDisplay = React.useMemo(() => {
    let formattedNum: string;
    if (isThousands) {
      formattedNum = Math.round(currentVal).toLocaleString('en-US');
    } else {
      formattedNum = Math.round(currentVal).toString();
    }
    return `${prefix}${formattedNum}${suffix}`;
  }, [currentVal, isThousands, prefix, suffix]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setIsHovered(true);
        startAnimation();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-espresso-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gold-500/20 hover:border-gold-400/60 hover:bg-espresso-900/90 hover:scale-[1.03] transition-all duration-300 shadow-xl text-center group cursor-pointer"
    >
      <div className="font-mono text-3xl sm:text-4xl font-bold text-gold-300 group-hover:text-champagne-200 transition-colors mb-2 select-none tracking-tight">
        {formattedDisplay}
      </div>
      <div className="text-xs sm:text-sm text-white/70 font-light group-hover:text-white/90 transition-colors">
        {label}
      </div>
    </div>
  );
};

export const AboutStory: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-12 sm:py-16 px-6 sm:px-12 bg-espresso-950 relative overflow-hidden border-t border-gold-500/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-ruby-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <span className="text-[11px] font-mono tracking-[0.4em] text-gold-400 uppercase block mb-2">
          HERITAGE & VISION
        </span>

        {/* Section Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide mb-4">
          {BRAND_STORY.title}
        </h2>

        {/* Body Copy */}
        <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-white/75 font-light leading-relaxed mb-8 sm:mb-10">
          <p>{BRAND_STORY.paragraph1}</p>
          <p>{BRAND_STORY.paragraph2}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {BRAND_STORY.stats.map((stat, i) => (
            <AnimatedStatCard key={i} valueStr={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};
