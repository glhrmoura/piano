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

  const press = useCallback(() => {
    setIsActive(true);
    handlePlay();
  }, [handlePlay]);

  const release = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!isTouchDevice()) {
      press();
    }
  }, [press, isTouchDevice]);

  const handleMouseUp = useCallback(() => {
    if (!isTouchDevice()) {
      release();
    }
  }, [release, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice()) {
      release();
    }
  }, [release, isTouchDevice]);

  const handleTouchStart = useCallback(() => {
    if (isTouchDevice()) {
      press();
    }
  }, [press, isTouchDevice]);

  const handleTouchEnd = useCallback(() => {
    if (isTouchDevice()) {
      release();
    }
  }, [release, isTouchDevice]);

  const interactionProps = {
    'data-key-code': keyCode,
    'data-note': note,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  if (isBlack) {
    return (
      <div className="piano-key-black-slot absolute top-0 box-border h-[62%] w-[58%] shadow-[var(--shadow-piano-black-hole)]">
        <div
          className={`piano-key-black box-border w-full ${
            isActive ? 'active h-[calc(100%-0.7vw)]' : 'h-full'
          }`}
          {...interactionProps}
        />
      </div>
    );
  }

  return (
    <div
      className={`piano-key-white box-border w-full rounded-b-[0.35vw] ${
        isActive
          ? 'active h-[99%] shadow-[var(--shadow-piano-white-active)]'
          : 'h-full shadow-[var(--shadow-piano-white)]'
      }`}
      style={{ zIndex: 1, position: 'relative' }}
      {...interactionProps}
    />
  );
};
