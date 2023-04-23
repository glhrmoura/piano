import pagemap from 'pagemap';

import { notes } from './notes';

import { isTouchDevice } from './util';

const $btnPrev = document.querySelector('.piano__dashboard__btn-prev');
const $btnNext = document.querySelector('.piano__dashboard__btn-next');
const $keyboardCotainer = document.querySelector('.piano__keyboard-container');

const initMinimap = () => {
  pagemap(document.querySelector('.piano__dashboard__minimap'), {
    viewport: document.querySelector('.piano__keyboard-container'),
    back: 'rgb(0, 0, 0)',
    view: 'rgba(0, 0, 0, 0.5)',
    drag: 'rgba(0, 0, 0, 0.5)',
    styles: {
      '.piano__keyboard__key--white': '#fff',
      '.piano__keyboard__key--black': '#000',
    },
  });
};

const initHandlers = () => {
  const preventHandler = event => event.preventDefault();
  const getScrollHandler = fat => () => {
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

const playNote = (note) => {
  notes[note]?.play();
}

const addKeyboardEvents = () => {
  window.addEventListener('keydown', (event) => {
    const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`);

    if (!$pianoKey) return;

    const note = $pianoKey.getAttribute('data-note');
    $pianoKey.classList.add('active');
    playNote(note);
  });

  window.addEventListener('keyup', (event) => {
    const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`);

    if (!$pianoKey) return;

    $pianoKey.classList.remove('active');
  });
};
  
const addClickEvents = () => {
  document.querySelectorAll('[data-key-code]').forEach((key) => {
    const handler = () => {
      const note = key.getAttribute('data-note');

      playNote(note);
    };
  
    if (isTouchDevice()) {
      key.addEventListener('touchstart', handler);
    } else {
      key.addEventListener('mousedown', handler);
    }
  });
};

const install = () => {
  initMinimap();
  initHandlers();
  addClickEvents();
  addKeyboardEvents();
};

export {
  install,
};
