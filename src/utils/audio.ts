import { Howler } from 'howler';

export const unlockAudio = (): void => {
  const ctx = Howler.ctx;
  if (ctx && ctx.state === 'suspended') {
    void ctx.resume();
  }
};
