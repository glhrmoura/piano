import { useRef, useEffect, useCallback, forwardRef } from 'react';
import type { MutableRefObject } from 'react';
import { PianoKeyGroup } from '@/components/PianoKeyGroup';

interface KeyboardProps {
  onPlay: (note: string) => void;
}

export const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(({ onPlay }, ref) => {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    localRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [ref]);

  useEffect(() => {
    const keyboard = localRef.current;
    if (!keyboard) return;

    let startX = 0;

    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentX = event.touches[0]?.clientX ?? 0;
      const deltaX = currentX - startX;
      const maxScrollLeft = keyboard.scrollWidth - keyboard.clientWidth;
      const atStart = keyboard.scrollLeft <= 0;
      const atEnd = keyboard.scrollLeft >= maxScrollLeft - 1;

      if ((atStart && deltaX > 0) || (atEnd && deltaX < 0)) {
        event.preventDefault();
      }
    };

    keyboard.addEventListener('touchstart', onTouchStart, { passive: true });
    keyboard.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      keyboard.removeEventListener('touchstart', onTouchStart);
      keyboard.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const keyGroups = [
    { white: { keyCode: 20, note: 'A0' }, black: { keyCode: 81, note: 'A0s' } },
    { white: { keyCode: 83, note: 'B0' } },
    { white: { keyCode: 20, note: 'C1' }, black: { keyCode: 81, note: 'C1s' } },
    { white: { keyCode: 65, note: 'D1' }, black: { keyCode: 87, note: 'D1s' } },
    { white: { keyCode: 83, note: 'E1' } },
    { white: { keyCode: 68, note: 'F1' }, black: { keyCode: 82, note: 'F1s' } },
    { white: { keyCode: 70, note: 'G1' }, black: { keyCode: 84, note: 'G1s' } },
    { white: { keyCode: 71, note: 'A1' }, black: { keyCode: 89, note: 'A1s' } },
    { white: { keyCode: 72, note: 'B1' } },
    { white: { keyCode: 20, note: 'C2' }, black: { keyCode: 81, note: 'C2s' } },
    { white: { keyCode: 65, note: 'D2' }, black: { keyCode: 87, note: 'D2s' } },
    { white: { keyCode: 83, note: 'E2' } },
    { white: { keyCode: 68, note: 'F2' }, black: { keyCode: 82, note: 'F2s' } },
    { white: { keyCode: 70, note: 'G2' }, black: { keyCode: 84, note: 'G2s' } },
    { white: { keyCode: 71, note: 'A2' }, black: { keyCode: 89, note: 'A2s' } },
    { white: { keyCode: 72, note: 'B2' } },
    { white: { keyCode: 20, note: 'C3' }, black: { keyCode: 81, note: 'C3s' } },
    { white: { keyCode: 65, note: 'D3' }, black: { keyCode: 87, note: 'D3s' } },
    { white: { keyCode: 83, note: 'E3' } },
    { white: { keyCode: 68, note: 'F3' }, black: { keyCode: 82, note: 'F3s' } },
    { white: { keyCode: 70, note: 'G3' }, black: { keyCode: 84, note: 'G3s' } },
    { white: { keyCode: 71, note: 'A3' }, black: { keyCode: 89, note: 'A3s' } },
    { white: { keyCode: 72, note: 'B3' } },
    { white: { keyCode: 20, note: 'C4' }, black: { keyCode: 81, note: 'C4s' } },
    { white: { keyCode: 65, note: 'D4' }, black: { keyCode: 87, note: 'D4s' } },
    { white: { keyCode: 83, note: 'E4' } },
    { white: { keyCode: 68, note: 'F4' }, black: { keyCode: 82, note: 'F4s' } },
    { white: { keyCode: 70, note: 'G4' }, black: { keyCode: 84, note: 'G4s' } },
    { white: { keyCode: 71, note: 'A4' }, black: { keyCode: 89, note: 'A4s' } },
    { white: { keyCode: 72, note: 'B4' } },
    { white: { keyCode: 20, note: 'C5' }, black: { keyCode: 81, note: 'C5s' } },
    { white: { keyCode: 65, note: 'D5' }, black: { keyCode: 87, note: 'D5s' } },
    { white: { keyCode: 83, note: 'E5' } },
    { white: { keyCode: 68, note: 'F5' }, black: { keyCode: 82, note: 'F5s' } },
    { white: { keyCode: 70, note: 'G5' }, black: { keyCode: 84, note: 'G5s' } },
    { white: { keyCode: 71, note: 'A5' }, black: { keyCode: 89, note: 'A5s' } },
    { white: { keyCode: 72, note: 'B5' } },
    { white: { keyCode: 20, note: 'C6' }, black: { keyCode: 81, note: 'C6s' } },
    { white: { keyCode: 65, note: 'D6' }, black: { keyCode: 87, note: 'D6s' } },
    { white: { keyCode: 83, note: 'E6' } },
    { white: { keyCode: 68, note: 'F6' }, black: { keyCode: 82, note: 'F6s' } },
    { white: { keyCode: 70, note: 'G6' }, black: { keyCode: 84, note: 'G6s' } },
    { white: { keyCode: 71, note: 'A6' }, black: { keyCode: 89, note: 'A6s' } },
    { white: { keyCode: 72, note: 'B6' } },
    { white: { keyCode: 20, note: 'C7' }, black: { keyCode: 81, note: 'C7s' } },
    { white: { keyCode: 65, note: 'D7' }, black: { keyCode: 87, note: 'D7s' } },
    { white: { keyCode: 83, note: 'E7' } },
    { white: { keyCode: 68, note: 'F7' }, black: { keyCode: 82, note: 'F7s' } },
    { white: { keyCode: 70, note: 'G7' }, black: { keyCode: 84, note: 'G7s' } },
    { white: { keyCode: 71, note: 'A7' }, black: { keyCode: 89, note: 'A7s' } },
    { white: { keyCode: 72, note: 'B7' } },
    { white: { keyCode: 83, note: 'C8' } },
  ];

  return (
    <div className="keyboard-bed relative z-0 h-full w-full overflow-x-auto overflow-y-hidden scrollbar-hide" ref={setRefs}>
      <div className="box-border flex h-full w-max min-w-[800px] gap-[0.2vw] px-[1.2vw] pb-[1.8vh] pt-[0.6vh]">
        {keyGroups.map((group, index) => (
          <PianoKeyGroup
            key={index}
            whiteKey={group.white}
            blackKey={group.black}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
});
