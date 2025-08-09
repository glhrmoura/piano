import React from 'react';
import { PianoKey } from '@/components/PianoKey';

interface PianoKeyGroupProps {
  whiteKey: { keyCode: number; note: string };
  blackKey?: { keyCode: number; note: string };
  onPlay: (note: string) => void;
}

export const PianoKeyGroup: React.FC<PianoKeyGroupProps> = ({
  whiteKey,
  blackKey,
  onPlay
}) => {
  return (
    <div className="relative w-[12vw] min-w-[85px] flex-shrink-0 mx-0.5 cursor-pointer piano-key-group">
      {/* Render white key first */}
      <PianoKey
        keyCode={whiteKey.keyCode}
        note={whiteKey.note}
        onPlay={onPlay}
      />
      {/* Render black key AFTER white key in DOM order */}
      {blackKey && (
        <PianoKey
          keyCode={blackKey.keyCode}
          note={blackKey.note}
          isBlack
          onPlay={onPlay}
        />
      )}
    </div>
  );
};
