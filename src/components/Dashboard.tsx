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
        back: 'rgb(26, 26, 26)',
        view: 'rgba(74, 144, 226, 0.3)',
        drag: 'rgba(74, 144, 226, 0.5)',
        styles: {
          '.piano-key-white': '#E8E8E8',
          '.piano-key-black': '#2A2A2A',
          '.piano__keyboard__key--white': '#E8E8E8',
          '.piano__keyboard__key--black': '#2A2A2A',
        },
      });
    }
  }, [keyboardRef]);

      return (
    <div className="relative flex justify-center items-center h-full w-full bg-gradient-to-b from-[#2A2A2A] to-[#1B1B1B] p-3 box-border">
      <button
        className="flex-shrink-0 flex justify-center items-center w-[min(12vw,12vh)] h-[min(12vw,12vh)] bg-gradient-to-b from-[#4A4A4A] to-[#2A2A2A] hover:from-[#5A5A5A] hover:to-[#3A3A3A] rounded-full p-1.5 border-none outline-none cursor-pointer text-white border-[min(1.5vw,1.5vh)] border-solid border-black shadow-[2px_2px_8px_0px_rgba(0,0,0,0.5)] z-0 text-[max(3vw,3vh)] mr-[6vw] active:bg-gradient-to-b active:from-[#2A2A2A] active:to-[#4A4A4A] transition-all duration-150"
        onClick={onPrevious}
      >
        <i className="fas fa-backward"></i>
      </button>
      <canvas
        className="w-[60%] h-[8vh] z-0 border-[1.5vh] border-solid border-[#333333] rounded-[1vh] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.8),2px_2px_8px_rgba(255,255,255,0.1)] bg-[#1A1A1A]"
        ref={minimapRef}
      />
      <button
        className="flex-shrink-0 flex justify-center items-center w-[min(12vw,12vh)] h-[min(12vw,12vh)] bg-gradient-to-b from-[#4A4A4A] to-[#2A2A2A] hover:from-[#5A5A5A] hover:to-[#3A3A3A] rounded-full p-1.5 border-none outline-none cursor-pointer text-white border-[min(1.5vw,1.5vh)] border-solid border-black shadow-[2px_2px_8px_0px_rgba(0,0,0,0.5)] z-0 text-[max(3vw,3vh)] ml-[6vw] active:bg-gradient-to-b active:from-[#2A2A2A] active:to-[#4A4A4A] transition-all duration-150"
        onClick={onNext}
      >
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};
