import React, { useRef, useEffect } from 'react';
import pagemap from 'pagemap';

interface DashboardProps {
  onPrevious: () => void;
  onNext: () => void;
  keyboardRef: React.RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onPrevious,
  onNext,
  keyboardRef
}) => {
  const minimapRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (minimapRef.current && keyboardRef.current) {
      pagemap(minimapRef.current, {
        viewport: keyboardRef.current,
        back: 'rgb(18, 16, 14)',
        view: 'rgba(0, 0, 0, 0.4)',
        drag: 'rgba(0, 0, 0, 0.55)',
        styles: {
          '.piano-key-white': '#EBE6DB',
          '.piano-key-black': '#1A1816',
          '.piano__keyboard__key--white': '#EBE6DB',
          '.piano__keyboard__key--black': '#1A1816',
        },
      });
    }
  }, [keyboardRef]);

  return (
    <div className="dashboard-rail relative z-10 flex h-full w-full items-center justify-center px-[3vw] py-[1.5vh] box-border">
      <div className="flex h-[min(7.5vw,7.5vh)] w-full max-w-[1100px] items-stretch justify-center gap-[2.5vw]">
        <button
          type="button"
          aria-label="Previous"
          className="nav-button flex aspect-square h-full flex-shrink-0 cursor-pointer items-center justify-center rounded-none outline-none text-[max(1.6vw,1.6vh)]"
          onClick={onPrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="minimap-shell">
          <canvas
            className="minimap-frame rounded-none"
            ref={minimapRef}
          />
        </div>
        <button
          type="button"
          aria-label="Next"
          className="nav-button flex aspect-square h-full flex-shrink-0 cursor-pointer items-center justify-center rounded-none outline-none text-[max(1.6vw,1.6vh)]"
          onClick={onNext}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
