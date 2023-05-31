import { refs } from './refs';
import { getRandomHexColor } from './getRandomHexColor';

let colorIntervalId;

const startRandomize = ({ target }) => {
  colorIntervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
};

const stopRandomize = e => {
  clearInterval(colorIntervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
};

refs.startBtn.addEventListener('click', startRandomize);
refs.stopBtn.addEventListener('click', stopRandomize);
