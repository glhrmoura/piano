import { useRef, useEffect, useCallback, useState, forwardRef } from 'react';
import type { MutableRefObject, PointerEvent as ReactPointerEvent } from 'react';
import { RuntimeLoader, type Rive } from '@rive-app/canvas';
import riveWasmUrl from '@rive-app/canvas/rive.wasm?url';
import { PianoKey } from '@/components/PianoKey';
import { RiveSegmentCanvas } from '@/components/RiveSegmentCanvas';
import {
  PIANO_KEYS_BY_LAYER,
  PIANO_KEY_BY_NOTE,
  RIVE_SEGMENTS,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  findKeyByCode,
} from '@/utils/pianoLayout';

interface KeyboardProps {
  onPlay: (note: string) => void;
  onReady?: () => void;
}

interface StageSize {
  width: number;
  height: number;
}

const ASPECT_RATIO = STAGE_WIDTH / STAGE_HEIGHT;

RuntimeLoader.setWasmUrl(riveWasmUrl);

const noteAt = (x: number, y: number) => {
  const element = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-note]');
  return element?.dataset.note ?? null;
};

export const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(({ onPlay, onReady }, ref) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const instancesRef = useRef(new Map<string, Rive>());
  const [stage, setStage] = useState<StageSize>({ width: 0, height: 0 });
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [ref]);

  useEffect(() => {
    let active = true;

    fetch('/piano.riv')
      .then((response) => response.arrayBuffer())
      .then((data) => {
        if (active) setBuffer(data);
      })
      .catch(() => null);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const measure = () => {
      const availableWidth = scroller.clientWidth;
      const availableHeight = scroller.clientHeight;
      let width = availableHeight * ASPECT_RATIO;
      let height = availableHeight;

      if (width < availableWidth) {
        width = availableWidth;
        height = availableWidth / ASPECT_RATIO;
      }

      setStage({ width, height });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let startX = 0;

    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentX = event.touches[0]?.clientX ?? 0;
      const deltaX = currentX - startX;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const atStart = scroller.scrollLeft <= 0;
      const atEnd = scroller.scrollLeft >= maxScrollLeft - 1;

      if ((atStart && deltaX > 0) || (atEnd && deltaX < 0)) {
        event.preventDefault();
      }
    };

    scroller.addEventListener('touchstart', onTouchStart, { passive: true });
    scroller.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      scroller.removeEventListener('touchstart', onTouchStart);
      scroller.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);

  onReadyRef.current = onReady;

  const handleReady = useCallback((id: string, rive: Rive | null) => {
    if (rive) {
      instancesRef.current.set(id, rive);
    } else {
      instancesRef.current.delete(id);
    }

    if (!readyRef.current && instancesRef.current.size === RIVE_SEGMENTS.length) {
      readyRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => onReadyRef.current?.());
      });
    }
  }, []);

  const setPressed = useCallback((note: string, pressed: boolean) => {
    const key = PIANO_KEY_BY_NOTE.get(note);
    if (!key) return;

    key.targets.forEach(({ segment, path }) => {
      const rive = instancesRef.current.get(segment);
      if (!rive) return;

      if (path) {
        rive.setBooleanStateAtPath('pressed', pressed, path);
        return;
      }

      const input = rive.stateMachineInputs('Press')?.find((item) => item.name === 'pressed');
      if (input) input.value = pressed;
    });
  }, []);

  const press = useCallback((note: string) => {
    setPressed(note, true);
    onPlay(note);
  }, [onPlay, setPressed]);

  const release = useCallback((note: string) => {
    setPressed(note, false);
  }, [setPressed]);

  const glideRef = useRef<{ pointerId: number; note: string | null } | null>(null);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;

    const note = (event.target as HTMLElement).closest<HTMLElement>('[data-note]')?.dataset.note;
    if (!note) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    glideRef.current = { pointerId: event.pointerId, note };
    press(note);
  }, [press]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const glide = glideRef.current;
    if (!glide || glide.pointerId !== event.pointerId) return;

    const note = noteAt(event.clientX, event.clientY);
    if (note === glide.note) return;

    if (glide.note) release(glide.note);
    if (note) press(note);
    glide.note = note;
  }, [press, release]);

  const handlePointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const glide = glideRef.current;
    if (!glide || glide.pointerId !== event.pointerId) return;

    if (glide.note) release(glide.note);
    glideRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, [release]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = findKeyByCode(event.which);
      if (key) press(key.note);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = findKeyByCode(event.which);
      if (key) release(key.note);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [press, release]);

  return (
    <div
      className="keyboard-bed keyboard-scroll relative z-0 h-full w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
      ref={setRefs}
    >
      <div
        className="relative"
        style={{ width: stage.width, height: stage.height }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {buffer && stage.width > 0 && RIVE_SEGMENTS.map((segment) => (
          <RiveSegmentCanvas
            key={segment.id}
            segment={segment}
            buffer={buffer}
            stageWidth={stage.width}
            onReady={handleReady}
          />
        ))}
        {PIANO_KEYS_BY_LAYER.map((pianoKey) => (
          <PianoKey
            key={pianoKey.note}
            pianoKey={pianoKey}
            onPress={press}
            onRelease={release}
          />
        ))}
      </div>
    </div>
  );
});
