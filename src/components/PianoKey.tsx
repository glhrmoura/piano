import React, { useCallback } from 'react';
import type { PianoKeyLayout } from '@/utils/pianoLayout';

interface PianoKeyProps {
  pianoKey: PianoKeyLayout;
  onPress: (note: string) => void;
  onRelease: (note: string) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ pianoKey, onPress, onRelease }) => {
  const { note, keyCode, isBlack, left, top, width, height } = pianoKey;

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onPress(note);
  }, [note, onPress]);

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onRelease(note);
  }, [note, onRelease]);

  return (
    <div
      className={`piano-key ${isBlack ? 'piano-key-black' : 'piano-key-white'}`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      data-key-code={keyCode}
      data-note={note}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    />
  );
};
