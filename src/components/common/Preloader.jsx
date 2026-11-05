import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Cultivating living specimens...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Disable background scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Smooth counter animation up to 100%
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText('Germinating rare botanical cultivars...');
      } else if (pct < 65) {
        setStatusText('Hardening root architecture & foliage...');
      } else if (pct < 95) {
        setStatusText('Arranging living architectural gallery...');
      } else {
        setStatusText('Welcome to VERDORA.');
      }

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 300);
      }
    }, 25);

    // Allow user to press Escape to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(timer);
        setProgress(100);
        setIsFinished(true);
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const brandLetters = ['V', 'E', 'R', 'D', 'O', 'R', 'A'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Cinematic luxury curtain wipe
            },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#183D2B] text-[#F5F1E7] select-none overflow-hidden"
        >
          {/* Subtle ambient botanical background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(49,91,64,0.45),transparent_60%)] pointer-events-none" />

          {/* Top Bar: Brand Coordinates & Skip CTA */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#A3B89B]/80">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3B89B] animate-pulse" />
              VERDORA Botanical Living
            </span>
            <button
              type="button"
              onClick={() => {
                setProgress(100);
                setIsFinished(true);
                document.body.style.overflow = '';
                if (onComplete) onComplete();
              }}
              className="text-[#F5F1E7]/50 hover:text-[#F5F1E7] transition-colors tracking-widest text-[10px] uppercase font-mono py-1 px-2 border border-white/10 rounded hover:border-white/30"
            >
              Skip Intro [Esc]
            </button>
          </div>

          {/* Center Stage: Blooming Botanical Monogram & Letter-by-Letter Reveal */}
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 my-auto">
            {/* Animated Botanical Leaf Sprout Emblem */}
            <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#A3B89B]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Central Stem */}
                <motion.path
                  d="M50 85 C50 60 48 35 50 15"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />

                {/* Left Leaflet */}
                <motion.path
                  d="M50 60 C35 55 25 40 32 25 C42 22 48 40 50 48"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="rgba(163, 184, 155, 0.15)"
                  initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
                  animate={{ pathLength: 1, scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />

                {/* Right Leaflet */}
                <motion.path
                  d="M50 45 C65 40 75 25 68 12 C58 10 52 28 50 35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="rgba(163, 184, 155, 0.15)"
                  initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
                  animate={{ pathLength: 1, scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Staggered Serif Brand Typography */}
            <div className="overflow-hidden py-1">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.25em] sm:tracking-[0.35em] text-[#F5F1E7] flex justify-center items-center">
                {brandLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 60, opacity: 0, rotate: 3 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Brand Manifesto Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-serif italic text-base sm:text-xl text-[#A3B89B] tracking-wide"
            >
              Bring Nature Into Your Space.
            </motion.p>
          </div>

          {/* Bottom Bar: Live Counter & Botanical Status Ticker */}
          <div className="relative z-10 max-w-xl w-full mx-auto space-y-3">
            <div className="flex items-end justify-between font-mono text-xs text-[#A3B89B]">
              <motion.span
                key={statusText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="tracking-wider uppercase text-[11px] truncate pr-4 text-[#F5F1E7]/80"
              >
                {statusText}
              </motion.span>
              <span className="font-bold tracking-widest text-[#F5F1E7] text-sm shrink-0">
                {progress < 10 ? `0${progress}` : progress}%
              </span>
            </div>

            {/* Elegant Hairline Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#A3B89B] to-[#F5F1E7] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

