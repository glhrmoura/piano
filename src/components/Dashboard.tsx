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
        back: 'rgb(0, 0, 0)',
        view: 'rgba(0, 0, 0, 0.5)',
        drag: 'rgba(0, 0, 0, 0.5)',
        styles: {
          '.piano__keyboard__key--white': '#fff',
          '.piano__keyboard__key--black': '#000',
        },
      });
    }
  }, [keyboardRef]);

  return (
    <div className="piano__dashboard">
      <button
        className="piano__dashboard__btn piano__dashboard__btn-prev"
        onClick={onPrevious}
      >
        <i className="fas fa-backward"></i>
      </button>
      <canvas
        className="piano__dashboard__minimap"
        ref={minimapRef}
      />
      <button
        className="piano__dashboard__btn piano__dashboard__btn-next"
        onClick={onNext}
      >
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};
