import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { Keyboard } from '@/components/Keyboard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useNotes } from '@/hooks/useNotes';
import { unlockAudio } from '@/utils/audio';

export const Piano: React.FC = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const { playNote, preloadAll } = useNotes();
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const handleScroll = useCallback((direction: number) => {
    if (keyboardRef.current) {
      keyboardRef.current.scrollTo({
        top: 0,
        left: keyboardRef.current.scrollLeft + direction,
        behavior: 'smooth',
      });
    }
  }, []);

  const handlePrevious = useCallback(() => {
    handleScroll(-500);
  }, [handleScroll]);

  const handleNext = useCallback(() => {
    handleScroll(500);
  }, [handleScroll]);

  useEffect(() => {
    const unlockOnGesture = () => {
      unlockAudio();
      preloadAll();
    };

    document.addEventListener('touchstart', unlockOnGesture, { capture: true, passive: true });
    document.addEventListener('touchend', unlockOnGesture, { capture: true, passive: true });
    document.addEventListener('pointerdown', unlockOnGesture, { capture: true });
    document.addEventListener('click', unlockOnGesture, { capture: true });

    return () => {
      document.removeEventListener('touchstart', unlockOnGesture, true);
      document.removeEventListener('touchend', unlockOnGesture, true);
      document.removeEventListener('pointerdown', unlockOnGesture, true);
      document.removeEventListener('click', unlockOnGesture, true);
    };
  }, [preloadAll]);

  return (
    <div className="piano-shell relative grid w-screen grid-cols-1 grid-rows-[0.28fr_1fr] box-border overflow-hidden">
      <Dashboard onPrevious={handlePrevious} onNext={handleNext} keyboardRef={keyboardRef} />
      <Keyboard onPlay={playNote} onReady={handleReady} ref={keyboardRef} />
      <LoadingScreen ready={ready} />
    </div>
  );
};
