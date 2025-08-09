import pagemap from 'pagemap';

import { notes } from './notes.ts';

import { isTouchDevice } from './util.ts';

const $btnPrev = document.querySelector('.piano__dashboard__btn-prev') as HTMLButtonElement;
const $btnNext = document.querySelector('.piano__dashboard__btn-next') as HTMLButtonElement;
const $keyboardCotainer = document.querySelector('.piano__keyboard-container') as HTMLElement;

const initMinimap = (): void => {
  pagemap(document.querySelector('.piano__dashboard__minimap') as HTMLCanvasElement, {
    viewport: document.querySelector('.piano__keyboard-container') as HTMLElement,
    back: 'rgb(0, 0, 0)',
    view: 'rgba(0, 0, 0, 0.5)',
    drag: 'rgba(0, 0, 0, 0.5)',
    styles: {
      '.piano__keyboard__key--white': '#fff',
      '.piano__keyboard__key--black': '#000',
    },
  });
};

const initHandlers = (): void => {
  const preventHandler = (event: Event): void => event.preventDefault();
  const getScrollHandler = (fat: number) => (): void => {
    $keyboardCotainer.scrollTo({
      top: 0,
      left: $keyboardCotainer.scrollLeft + fat,
      behavior: 'smooth',
    });
  };

  $btnPrev.addEventListener('click', getScrollHandler(-500));
  $btnNext.addEventListener('click', getScrollHandler(500));
  $keyboardCotainer.addEventListener('touchmove', preventHandler);
  $keyboardCotainer.addEventListener('DOMMouseScroll', preventHandler);
};

const playNote = (note: string): void => {
  notes[note]?.play();
}

const addKeyboardEvents = (): void => {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`) as HTMLElement;

    if (!$pianoKey) return;

    const note = $pianoKey.getAttribute('data-note');
    if (!note) return;
    
    $pianoKey.classList.add('active');
    playNote(note);
  });

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`) as HTMLElement;

    if (!$pianoKey) return;

    $pianoKey.classList.remove('active');
  });
};
  
const addClickEvents = (): void => {
  document.querySelectorAll('[data-key-code]').forEach((key) => {
    const handler = (): void => {
      const note = key.getAttribute('data-note');
      if (!note) return;

      playNote(note);
    };
  
    if (isTouchDevice()) {
      key.addEventListener('touchstart', handler);
    } else {
      key.addEventListener('mousedown', handler);
    }
  });
};

const install = (): void => {
  initMinimap();
  initHandlers();
  addClickEvents();
  addKeyboardEvents();
};

export {
  install,
};
