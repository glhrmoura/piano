import React, { useRef, useCallback, useEffect } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { Keyboard } from '@/components/Keyboard';
import { useNotes } from '@/hooks/useNotes';

export const Piano: React.FC = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const notes = useNotes();

  const playNote = useCallback((note: string) => {
    notes[note]?.play();
  }, [notes]);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      const pianoKey = document.querySelector(`[data-key-code='${event.which}']`) as HTMLElement;

      if (!pianoKey) return;

      const note = pianoKey.getAttribute('data-note');
      if (!note) return;

      pianoKey.classList.add('active');
      playNote(note);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const pianoKey = document.querySelector(`[data-key-code='${event.which}']`) as HTMLElement;

      if (!pianoKey) return;

      pianoKey.classList.remove('active');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote]);

  return (
    <div className="piano">
      <Dashboard onPrevious={handlePrevious} onNext={handleNext} keyboardRef={keyboardRef} />
      <Keyboard onPlay={playNote} ref={keyboardRef} />
    </div>
  );
};
