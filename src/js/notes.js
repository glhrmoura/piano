import { Howl } from 'howler';

const notes = {
  'A0': new Howl({ src: ['audio/A0.mp3'] }),
  'A0s': new Howl({ src: ['audio/A0s.mp3'] }),
  'B0': new Howl({ src: ['audio/B0.mp3'] }),
  'C1': new Howl({ src: ['audio/C1.mp3'] }),
  'C1s': new Howl({ src: ['audio/C1s.mp3'] }),
  'D1': new Howl({ src: ['audio/D1.mp3'] }),
  'D1s': new Howl({ src: ['audio/D1s.mp3'] }),
  'E1': new Howl({ src: ['audio/E1.mp3'] }),
  'F1': new Howl({ src: ['audio/F1.mp3'] }),
  'F1s': new Howl({ src: ['audio/F1s.mp3'] }),
  'G1': new Howl({ src: ['audio/G1.mp3'] }),
  'G1s': new Howl({ src: ['audio/G1s.mp3'] }),
  'A1': new Howl({ src: ['audio/A1.mp3'] }),
  'A1s': new Howl({ src: ['audio/A1s.mp3'] }),
  'B1': new Howl({ src: ['audio/B1.mp3'] }),
  'C2': new Howl({ src: ['audio/C2.mp3'] }),
  'C2s': new Howl({ src: ['audio/C2s.mp3'] }),
  'D2': new Howl({ src: ['audio/D2.mp3'] }),
  'D2s': new Howl({ src: ['audio/D2s.mp3'] }),
  'E2': new Howl({ src: ['audio/E2.mp3'] }),
  'F2': new Howl({ src: ['audio/F2.mp3'] }),
  'F2s': new Howl({ src: ['audio/F2s.mp3'] }),
  'G2': new Howl({ src: ['audio/G2.mp3'] }),
  'G2s': new Howl({ src: ['audio/G2s.mp3'] }),
  'A2': new Howl({ src: ['audio/A2.mp3'] }),
  'A2s': new Howl({ src: ['audio/A2s.mp3'] }),
  'B2': new Howl({ src: ['audio/B2.mp3'] }),
  'C3': new Howl({ src: ['audio/C3.mp3'] }),
  'C3s': new Howl({ src: ['audio/C3s.mp3'] }),
  'D3': new Howl({ src: ['audio/D3.mp3'] }),
  'D3s': new Howl({ src: ['audio/D3s.mp3'] }),
  'E3': new Howl({ src: ['audio/E3.mp3'] }),
  'F3': new Howl({ src: ['audio/F3.mp3'] }),
  'F3s': new Howl({ src: ['audio/F3s.mp3'] }),
  'G3': new Howl({ src: ['audio/G3.mp3'] }),
  'G3s': new Howl({ src: ['audio/G3s.mp3'] }),
  'A3': new Howl({ src: ['audio/A3.mp3'] }),
  'A3s': new Howl({ src: ['audio/A3s.mp3'] }),
  'B3': new Howl({ src: ['audio/B3.mp3'] }),
  'C4': new Howl({ src: ['audio/C4.mp3'] }),
  'C4s': new Howl({ src: ['audio/C4s.mp3'] }),
  'D4': new Howl({ src: ['audio/D4.mp3'] }),
  'D4s': new Howl({ src: ['audio/D4s.mp3'] }),
  'E4': new Howl({ src: ['audio/E4.mp3'] }),
  'F4': new Howl({ src: ['audio/F4.mp3'] }),
  'F4s': new Howl({ src: ['audio/F4s.mp3'] }),
  'G4': new Howl({ src: ['audio/G4.mp3'] }),
  'G4s': new Howl({ src: ['audio/G4s.mp3'] }),
  'A4': new Howl({ src: ['audio/A4.mp3'] }),
  'A4s': new Howl({ src: ['audio/A4s.mp3'] }),
  'B4': new Howl({ src: ['audio/B4.mp3'] }),
  'C5': new Howl({ src: ['audio/C5.mp3'] }),
  'C5s': new Howl({ src: ['audio/C5s.mp3'] }),
  'D5': new Howl({ src: ['audio/D5.mp3'] }),
  'D5s': new Howl({ src: ['audio/D5s.mp3'] }),
  'E5': new Howl({ src: ['audio/E5.mp3'] }),
  'F5': new Howl({ src: ['audio/F5.mp3'] }),
  'F5s': new Howl({ src: ['audio/F5s.mp3'] }),
  'G5': new Howl({ src: ['audio/G5.mp3'] }),
  'G5s': new Howl({ src: ['audio/G5s.mp3'] }),
  'A5': new Howl({ src: ['audio/A5.mp3'] }),
  'A5s': new Howl({ src: ['audio/A5s.mp3'] }),
  'B5': new Howl({ src: ['audio/B5.mp3'] }),
  'C6': new Howl({ src: ['audio/C6.mp3'] }),
  'C6s': new Howl({ src: ['audio/C6s.mp3'] }),
  'D6': new Howl({ src: ['audio/D6.mp3'] }),
  'D6s': new Howl({ src: ['audio/D6s.mp3'] }),
  'E6': new Howl({ src: ['audio/E6.mp3'] }),
  'F6': new Howl({ src: ['audio/F6.mp3'] }),
  'F6s': new Howl({ src: ['audio/F6s.mp3'] }),
  'G6': new Howl({ src: ['audio/G6.mp3'] }),
  'G6s': new Howl({ src: ['audio/G6s.mp3'] }),
  'A6': new Howl({ src: ['audio/A6.mp3'] }),
  'A6s': new Howl({ src: ['audio/A6s.mp3'] }),
  'B6': new Howl({ src: ['audio/B6.mp3'] }),
  'C7': new Howl({ src: ['audio/C7.mp3'] }),
  'C7s': new Howl({ src: ['audio/C7s.mp3'] }),
  'D7': new Howl({ src: ['audio/D7.mp3'] }),
  'D7s': new Howl({ src: ['audio/D7s.mp3'] }),
  'E7': new Howl({ src: ['audio/E7.mp3'] }),
  'F7': new Howl({ src: ['audio/F7.mp3'] }),
  'F7s': new Howl({ src: ['audio/F7s.mp3'] }),
  'G7': new Howl({ src: ['audio/G7.mp3'] }),
  'G7s': new Howl({ src: ['audio/G7s.mp3'] }),
  'A7': new Howl({ src: ['audio/A7.mp3'] }),
  'A7s': new Howl({ src: ['audio/A7s.mp3'] }),
  'B7': new Howl({ src: ['audio/B7.mp3'] }),
  'C8': new Howl({ src: ['audio/C8.mp3'] }),
};

export {
  notes,
};
