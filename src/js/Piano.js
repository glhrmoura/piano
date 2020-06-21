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
      key.addEventListener('mousedown', (event) => {
        const note = key.getAttribute('data-note');
        this.playNote(note);
      });
    });
  }
  
  install () {
    this.addClickEvents();
    this.addKeyboardEvents();
  };
};