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
    <div className="piano__keyboard__key">
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
