import './scss/index.scss';
import { install } from './js/piano.ts';

document.addEventListener('DOMContentLoaded', () => {
  const piano = document.querySelector('.piano') as HTMLElement;
  if (piano) {
    piano.style.display = 'block';
  }
  install();
});
