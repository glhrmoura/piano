import { Howler } from 'howler';

let unlocked = false;

export const unlockAudio = (): void => {
  const ctx = Howler.ctx;

  if (!ctx) {
    return;
  }

  try {
    if (typeof ctx.resume === 'function' && ctx.state !== 'running') {
      void ctx.resume();
    }

    if (!unlocked) {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      if (typeof source.stop === 'function') {
        source.stop(0);
      }
      unlocked = true;
    }
  } catch {
    unlocked = false;
  }
};

export const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};
