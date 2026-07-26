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
    <div className="piano-key-group relative w-[11.5vw] min-w-[78px] flex-shrink-0 cursor-pointer">
      <PianoKey
        keyCode={whiteKey.keyCode}
        note={whiteKey.note}
        onPlay={onPlay}
      />
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
