import { refsPromise } from './refsPromise';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let currentDelay;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((res, rej) => {
    if (shouldResolve) {
      // Fulfill
      res({ position, delay });
    } else {
      // Reject
      rej({ position, delay });
    }
  });
  return promise;
}

function handlePromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${currentDelay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${currentDelay}ms`);
    });
}

const onBtnClickHandlePromise = e => {
  currentDelay = 0;
  e.preventDefault();
  const firstDelay = Number(refsPromise.promiseDelay.value);
  const stepDelay = Number(refsPromise.promiseStep.value);
  setTimeout(() => {
    handlePromise(1, firstDelay);
    currentDelay += firstDelay;
    for (let i = 2; i <= Number(refsPromise.promiseAmount.value); i++) {
      setTimeout(() => {
        handlePromise(i, stepDelay);
        currentDelay += stepDelay;
      }, stepDelay * (i - 1));
    }
  }, firstDelay);
};

refsPromise.createPromiseBtn.addEventListener('click', onBtnClickHandlePromise);
