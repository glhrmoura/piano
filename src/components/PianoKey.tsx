import React, { useState, useCallback } from 'react';

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

  const press = useCallback(() => {
    setIsActive(true);
    onPlay(note);
  }, [note, onPlay]);

  const release = useCallback(() => {
    setIsActive(false);
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    press();
  }, [press]);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    release();
  }, [release]);

  const interactionProps = {
    'data-key-code': keyCode,
    'data-note': note,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
  };

  if (isBlack) {
    return (
      <div className="piano-key-black-slot absolute top-0 box-border h-[62%] w-[58%] shadow-[var(--shadow-piano-black-hole)]">
        <div
          className={`piano-key-black box-border w-full touch-manipulation ${
            isActive ? 'active h-[calc(100%-0.35vw)]' : 'h-full'
          }`}
          {...interactionProps}
        />
      </div>
    );
  }

  return (
    <div
      className={`piano-key-white box-border w-full touch-manipulation rounded-b-[0.35vw] ${
        isActive
          ? 'active h-[99%] shadow-[var(--shadow-piano-white-active)]'
          : 'h-full shadow-[var(--shadow-piano-white)]'
      }`}
      style={{ zIndex: 1, position: 'relative' }}
      {...interactionProps}
    />
  );
};
