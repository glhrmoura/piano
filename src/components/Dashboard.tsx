import React from 'react';
import { Minimap } from '@/components/Minimap';

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
  return (
    <div className="dashboard-rail relative z-10 flex h-full w-full items-center justify-center px-[3vw] py-[1.5vh] box-border">
      <div className="flex h-[min(7.5vw,7.5vh)] w-full max-w-[1100px] items-stretch justify-center gap-[2.5vw]">
        <button
          type="button"
          aria-label="Previous"
          className="nav-button flex aspect-square h-full flex-shrink-0 cursor-pointer items-center justify-center outline-none text-[max(1.6vw,1.6vh)]"
          onClick={onPrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="minimap-shell">
          <Minimap keyboardRef={keyboardRef} />
        </div>
        <button
          type="button"
          aria-label="Next"
          className="nav-button flex aspect-square h-full flex-shrink-0 cursor-pointer items-center justify-center outline-none text-[max(1.6vw,1.6vh)]"
          onClick={onNext}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
