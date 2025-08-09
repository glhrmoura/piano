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

  const baseClasses = isBlack
    ? "absolute top-0 w-[65%] rounded-b-[0.2vw] bg-black piano-key-black box-border"
    : "w-full rounded-b-[0.5vw] bg-white piano-key-white";

  const shadowClasses = isBlack
    ? isActive
      ? "shadow-[var(--shadow-piano-black-active)]"
      : "shadow-[var(--shadow-piano-black)]"
    : isActive
      ? "shadow-[var(--shadow-piano-white-active)]"
      : "shadow-[var(--shadow-piano-white)]";

  const heightClasses = isBlack
    ? isActive
      ? "h-[calc(65%+1vw)]"
      : "h-[65%]"
    : isActive
      ? "h-[99%]"
      : "h-full";

  return (
    <div
      className={`${baseClasses} ${heightClasses} ${shadowClasses} ${isActive ? 'active' : ''}`}
      style={isBlack ? { zIndex: 999999, position: 'absolute' } : { zIndex: 1, position: 'relative' }}
      data-key-code={keyCode}
      data-note={note}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};
