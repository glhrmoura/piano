import React, { useCallback, useEffect, useRef } from 'react';
import { PIANO_KEYS_BY_LAYER } from '@/utils/pianoLayout';

interface MinimapProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
}

const PADDING = 3;
const BACKGROUND = '#0d0d0d';
const WHITE_KEY = '#f2f2f2';
const BLACK_KEY = '#111111';
const VIEW_FILL = 'rgba(110, 27, 33, 0.38)';
const VIEW_STROKE = '#8c2a32';

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, [0, 0, radius, radius]);
  } else {
    ctx.rect(x, y, width, height);
  }
  ctx.fill();
};

export const Minimap: React.FC<MinimapProps> = ({ keyboardRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const dragOffsetRef = useRef<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const scroller = keyboardRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !scroller || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    const pixelWidth = Math.round(cssWidth * dpr);
    const pixelHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const areaWidth = cssWidth - PADDING * 2;
    const areaHeight = cssHeight - PADDING * 2;

    PIANO_KEYS_BY_LAYER.forEach((key) => {
      ctx.fillStyle = key.isBlack ? BLACK_KEY : WHITE_KEY;
      roundedRect(
        ctx,
        PADDING + (key.left / 100) * areaWidth,
        PADDING + (key.top / 100) * areaHeight,
        (key.width / 100) * areaWidth,
        (key.height / 100) * areaHeight,
        key.isBlack ? 1 : 1.5,
      );
    });

    const contentWidth = scroller.scrollWidth || 1;
    const viewX = PADDING + (scroller.scrollLeft / contentWidth) * areaWidth;
    const viewWidth = Math.min(areaWidth, (scroller.clientWidth / contentWidth) * areaWidth);

    ctx.fillStyle = VIEW_FILL;
    ctx.fillRect(viewX, 0, viewWidth, cssHeight);
    ctx.strokeStyle = VIEW_STROKE;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(viewX + 0.75, 0.75, viewWidth - 1.5, cssHeight - 1.5);
  }, [keyboardRef]);

  const scheduleDraw = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroller = keyboardRef.current;
    if (!canvas || !scroller) return;

    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(canvas);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    scroller.addEventListener('scroll', scheduleDraw, { passive: true });
    window.addEventListener('resize', scheduleDraw);
    scheduleDraw();

    return () => {
      observer.disconnect();
      scroller.removeEventListener('scroll', scheduleDraw);
      window.removeEventListener('resize', scheduleDraw);
      cancelAnimationFrame(frameRef.current);
    };
  }, [keyboardRef, scheduleDraw]);

  const pointerToContent = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const scroller = keyboardRef.current;
    if (!canvas || !scroller) return null;

    const rect = canvas.getBoundingClientRect();
    const fraction = (event.clientX - rect.left - PADDING) / (rect.width - PADDING * 2);
    return { scroller, position: fraction * scroller.scrollWidth };
  }, [keyboardRef]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const target = pointerToContent(event);
    if (!target) return;

    const { scroller, position } = target;
    const insideView = position >= scroller.scrollLeft && position <= scroller.scrollLeft + scroller.clientWidth;

    dragOffsetRef.current = insideView ? position - scroller.scrollLeft : scroller.clientWidth / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    scroller.scrollLeft = position - dragOffsetRef.current;
  }, [pointerToContent]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragOffsetRef.current === null) return;

    const target = pointerToContent(event);
    if (!target) return;

    target.scroller.scrollLeft = target.position - dragOffsetRef.current;
  }, [pointerToContent]);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    dragOffsetRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="minimap-frame"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
};
