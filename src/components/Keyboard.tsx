import { useRef, useEffect, useCallback, forwardRef } from 'react';
import { PianoKeyGroup } from '@/components/PianoKeyGroup';

interface KeyboardProps {
  onPlay: (note: string) => void;
}

export const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(({ onPlay }, ref) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const preventHandler = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    const keyboard = keyboardRef.current;
    if (keyboard) {
      keyboard.addEventListener('touchmove', preventHandler);
      keyboard.addEventListener('DOMMouseScroll', preventHandler);

      return () => {
        keyboard.removeEventListener('touchmove', preventHandler);
        keyboard.removeEventListener('DOMMouseScroll', preventHandler);
      };
    }
  }, [preventHandler]);

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
    <div className="piano__keyboard-container" ref={ref || keyboardRef}>
      <div className="piano__keyboard">
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
