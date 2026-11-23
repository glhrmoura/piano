import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  ready: boolean;
}

const WHITE_KEYS = 7;
const BLACK_KEY_SLOTS = [0, 1, 3, 4, 5];
const MIN_DURATION = 2000;
const FALLBACK_DELAY = 15000;
const FADE_DURATION = 700;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ ready }) => {
  const [timedOut, setTimedOut] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [mounted, setMounted] = useState(true);
  const hidden = (ready && minElapsed) || timedOut;

  useEffect(() => {
    const elapsed = performance.now();
    const minTimer = window.setTimeout(() => setMinElapsed(true), Math.max(0, MIN_DURATION - elapsed));
    const fallbackTimer = window.setTimeout(() => setTimedOut(true), Math.max(0, FALLBACK_DELAY - elapsed));

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const timer = window.setTimeout(() => setMounted(false), FADE_DURATION);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  if (!mounted) return null;

  return (
    <div
      className={`loading-screen ${hidden ? 'loading-screen-hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading piano"
    >
      <div className="loading-keys" aria-hidden="true">
        {Array.from({ length: WHITE_KEYS }, (_, index) => (
          <span
            key={`white-${index}`}
            className="loading-key-white"
            style={{ animationDelay: `${index * 0.11}s` }}
          />
        ))}
        {BLACK_KEY_SLOTS.map((slot) => (
          <span
            key={`black-${slot}`}
            className="loading-key-black"
            style={{ left: `calc(${slot + 1} * (var(--loading-key-width) + var(--loading-key-gap)) - var(--loading-key-gap) / 2)` }}
          />
        ))}
      </div>
      <span className="loading-felt" aria-hidden="true" />
    </div>
  );
};
