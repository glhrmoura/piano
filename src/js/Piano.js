export default class Piano {
  constructor (config) {
    if (!config.notes) {
      throw new Error('Passing the config.notes parameter is mandatory');
    }

    this.notes = config.notes;
  }

  playNote (note) {
    if (!this.notes[note]) {
      return;
    }

    this.notes[note].play();
  }

  isTouchDevice () {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function (query) {
      return window.matchMedia(query).matches;
    };
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true;
    }
  
    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  addKeyboardEvents () {
    window.addEventListener('keydown', (event) => {
      const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`);

      if (!$pianoKey || event.repeat) {
        return;
      }

      const note = $pianoKey.getAttribute('data-note');
      $pianoKey.classList.add('active');
      this.playNote(note);
    });

    window.addEventListener('keyup', (event) => {
      const $pianoKey = document.querySelector(`[data-key-code='${event.which}']`);

      if (!$pianoKey) {
        return;
      }

      $pianoKey.classList.remove('active');
    });
  }
  
  addClickEvents () {
    document.querySelectorAll('[data-key-code]').forEach((key) => {
      const handler = (event) => {
        const note = key.getAttribute('data-note');
        this.playNote(note);
      };
    
      if (this.isTouchDevice()) {
        key.addEventListener('touchstart', handler);
      } else {
        key.addEventListener('mousedown', handler);
      }
    });
  }
  
  install () {
    this.addClickEvents();
    this.addKeyboardEvents();
  };
};