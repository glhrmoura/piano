import React, { useState, useCallback } from 'react';
import { useUtils } from '@/hooks/useUtils';

interface PianoKeyProps {
  keyCode: number;
  note: string;
  isBlack?: boolean;
  onPlay: (note: string) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({
  keyCode,
  note,
  isBlack = false,
  onPlay
}) => {
  const [isActive, setIsActive] = useState(false);
  const { isTouchDevice } = useUtils();

  const handlePlay = useCallback(() => {
    onPlay(note);
  }, [note, onPlay]);

  const handleMouseDown = useCallback(() => {
    if (!isTouchDevice()) {
      setIsActive(true);
      handlePlay();
    }
  }, [handlePlay, isTouchDevice]);

  const handleMouseUp = useCallback(() => {
    if (!isTouchDevice()) {
      setIsActive(false);
    }
  }, [isTouchDevice]);

  const handleTouchStart = useCallback(() => {
    if (isTouchDevice()) {
      setIsActive(true);
      handlePlay();
    }
  }, [handlePlay, isTouchDevice]);

  const handleTouchEnd = useCallback(() => {
    if (isTouchDevice()) {
      setIsActive(false);
    }
  }, [isTouchDevice]);

  const interactionProps = {
    'data-key-code': keyCode,
    'data-note': note,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  if (isBlack) {
    return (
      <div className="piano-key-black-slot absolute top-0 w-[65%] h-[65%] shadow-[var(--shadow-piano-black-hole)] box-border">
        <div
          className={`w-full rounded-b-[0.2vw] bg-black piano-key-black box-border shadow-[var(--shadow-piano-black-inset)] ${
            isActive ? 'h-[calc(100%+1vw)] active' : 'h-full'
          }`}
          {...interactionProps}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-b-[0.5vw] bg-white piano-key-white ${
        isActive
          ? 'h-[99%] shadow-[var(--shadow-piano-white-active)] active'
          : 'h-full shadow-[var(--shadow-piano-white)]'
      }`}
      style={{ zIndex: 1, position: 'relative' }}
      {...interactionProps}
    />
  );
};
