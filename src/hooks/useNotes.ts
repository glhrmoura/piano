import { useCallback, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { isIOS, unlockAudio } from '@/utils/audio';

type NotesType = Record<string, Howl>;

const NOTE_NAMES = [
  'A0', 'A0s', 'B0',
  'C1', 'C1s', 'D1', 'D1s', 'E1', 'F1', 'F1s', 'G1', 'G1s', 'A1', 'A1s', 'B1',
  'C2', 'C2s', 'D2', 'D2s', 'E2', 'F2', 'F2s', 'G2', 'G2s', 'A2', 'A2s', 'B2',
  'C3', 'C3s', 'D3', 'D3s', 'E3', 'F3', 'F3s', 'G3', 'G3s', 'A3', 'A3s', 'B3',
  'C4', 'C4s', 'D4', 'D4s', 'E4', 'F4', 'F4s', 'G4', 'G4s', 'A4', 'A4s', 'B4',
  'C5', 'C5s', 'D5', 'D5s', 'E5', 'F5', 'F5s', 'G5', 'G5s', 'A5', 'A5s', 'B5',
  'C6', 'C6s', 'D6', 'D6s', 'E6', 'F6', 'F6s', 'G6', 'G6s', 'A6', 'A6s', 'B6',
  'C7', 'C7s', 'D7', 'D7s', 'E7', 'F7', 'F7s', 'G7', 'G7s', 'A7', 'A7s', 'B7',
  'C8',
] as const;

if (isIOS()) {
  Howler.html5PoolSize = 25;
}

const createNote = (note: string): Howl => {
  return new Howl({
    src: [`/audio/${note}.mp3`],
    preload: true,
    html5: isIOS(),
    format: ['mp3'],
  });
};

const prefetchAudioFiles = async () => {
  const batchSize = 8;

  for (let index = 0; index < NOTE_NAMES.length; index += batchSize) {
    const batch = NOTE_NAMES.slice(index, index + batchSize);
    await Promise.all(
      batch.map((note) =>
        fetch(`/audio/${note}.mp3`, { cache: 'force-cache' }).catch(() => null)
      )
    );
  }
};

export const useNotes = () => {
  const notesRef = useRef<NotesType>({});
  const warmedRef = useRef(false);

  const getNote = useCallback((note: string): Howl | undefined => {
    if (!NOTE_NAMES.includes(note as typeof NOTE_NAMES[number])) {
      return undefined;
    }

    if (!notesRef.current[note]) {
      notesRef.current[note] = createNote(note);
    }

    return notesRef.current[note];
  }, []);

  const preloadAll = useCallback(() => {
    if (warmedRef.current) return;
    warmedRef.current = true;

    unlockAudio();

    NOTE_NAMES.forEach((note, index) => {
      window.setTimeout(() => {
        const sound = getNote(note);
        if (sound && sound.state() === 'unloaded') {
          sound.load();
        }
      }, Math.floor(index / 10) * 40);
    });
  }, [getNote]);

  useEffect(() => {
    void prefetchAudioFiles();

    if (!isIOS()) {
      const idle = window.requestIdleCallback
        ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 1));

      const idleId = idle(() => {
        preloadAll();
      });

      return () => {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleId as number);
        } else {
          window.clearTimeout(idleId as number);
        }
      };
    }
  }, [preloadAll]);

  const playNote = useCallback((note: string) => {
    unlockAudio();
    preloadAll();

    const sound = getNote(note);
    if (!sound) return;

    const playNow = () => {
      if (sound.playing()) {
        sound.stop();
      }
      sound.play();
    };

    if (sound.state() === 'loaded') {
      playNow();
      return;
    }

    sound.once('load', () => {
      unlockAudio();
      playNow();
    });

    if (sound.state() === 'unloaded') {
      sound.load();
    }
  }, [getNote, preloadAll]);

  return { playNote, preloadAll };
};
