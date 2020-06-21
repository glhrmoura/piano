import './scss/index.scss';
import { Howl } from 'howler';
import Piano from './js/Piano';

const notes = {
  '1C': new Howl({ src: ['audio/261-C.mp3'] }),
  '1Cs': new Howl({ src: ['audio/277-C-sharp.mp3'] }),
  '1D': new Howl({ src: ['audio/293-D.mp3'] }),
  '1Ds': new Howl({ src: ['audio/311-D-sharp.mp3'] }),
  '1E': new Howl({ src: ['audio/329-E.mp3'] }),
  '1F': new Howl({ src: ['audio/349-F.mp3'] }),
  '1Fs': new Howl({ src: ['audio/369F-sharp.mp3'] }),
  '1G': new Howl({ src: ['audio/391-G.mp3'] }),
  '1Gs': new Howl({ src: ['audio/415-G-sharp.mp3'] }),
  '2A': new Howl({ src: ['audio/440-A.mp3'] }),
  '2As': new Howl({ src: ['audio/466-A-sharp.mp3'] }),
  '2B': new Howl({ src: ['audio/495-B.mp3'] }),
  '2C': new Howl({ src: ['audio/523-C.mp3'] }),
  '2Cs': new Howl({ src: ['audio/545-C-sharp.mp3'] }),
  '2D': new Howl({ src: ['audio/587-D.mp3'] }),
  '2Ds': new Howl({ src: ['audio/622-D-sharp.mp3'] }),
  '2E': new Howl({ src: ['audio/659-E.mp3'] }),
  '2F': new Howl({ src: ['audio/698-F.mp3'] }),
  '2Fs': new Howl({ src: ['audio/698-F-sharp.mp3'] }),
  '2G': new Howl({ src: ['audio/783-G.mp3'] }),
  '2Gs': new Howl({ src: ['audio/830-G-sharp.mp3'] }),
  '3A': new Howl({ src: ['audio/880-A.mp3'] }),
  '3As': new Howl({ src: ['audio/932-A-sharp.mp3'] }),
  '3B': new Howl({ src: ['audio/987-B.mp3'] })
};

new Piano({ notes })
  .install();