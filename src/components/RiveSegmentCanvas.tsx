import React, { useEffect, useRef } from 'react';
import { Alignment, Fit, Layout, Rive } from '@rive-app/canvas';
import { STAGE_WIDTH, type RiveSegment } from '@/utils/pianoLayout';

interface RiveSegmentCanvasProps {
  segment: RiveSegment;
  buffer: ArrayBuffer;
  stageWidth: number;
  onReady: (id: string, rive: Rive | null) => void;
}

const MAX_PIXEL_RATIO = 2;

const applyLayout = (rive: Rive, segment: RiveSegment, stageWidth: number) => {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  const unit = (stageWidth / STAGE_WIDTH) * dpr;
  const minX = (segment.artboardLeft - segment.left) * unit;
  const minY = segment.artboardTop * unit;

  rive.resizeDrawingSurfaceToCanvas(dpr);
  rive.layout = new Layout({
    fit: Fit.Fill,
    alignment: Alignment.TopLeft,
    minX,
    minY,
    maxX: minX + segment.artboardWidth * unit,
    maxY: minY + segment.artboardHeight * unit,
  });
};

export const RiveSegmentCanvas: React.FC<RiveSegmentCanvasProps> = ({
  segment,
  buffer,
  stageWidth,
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const riveRef = useRef<Rive | null>(null);
  const stageWidthRef = useRef(stageWidth);

  stageWidthRef.current = stageWidth;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rive = new Rive({
      buffer: buffer.slice(0),
      canvas,
      artboard: segment.artboard,
      stateMachine: segment.stateMachine,
      autoplay: true,
      shouldDisableRiveListeners: true,
      enableRiveAssetCDN: false,
      onLoad: () => {
        rive.volume = 0;
        riveRef.current = rive;
        if (stageWidthRef.current) {
          applyLayout(rive, segment, stageWidthRef.current);
        }
        onReady(segment.id, rive);
      },
    });

    return () => {
      riveRef.current = null;
      onReady(segment.id, null);
      rive.cleanup();
    };
  }, [buffer, segment, onReady]);

  useEffect(() => {
    const rive = riveRef.current;
    if (rive && stageWidth) {
      applyLayout(rive, segment, stageWidth);
    }
  }, [segment, stageWidth]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute top-0 h-full"
      style={{
        left: `${(segment.left / STAGE_WIDTH) * 100}%`,
        width: `${((segment.right - segment.left) / STAGE_WIDTH) * 100}%`,
        clipPath: segment.clipPath,
      }}
    />
  );
};
