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

  const className = `piano__keyboard__key--${isBlack ? 'black' : 'white'} ${
    isActive ? 'active' : ''
  }`;

  return (
    <div
      className={className}
      data-key-code={keyCode}
      data-note={note}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};
