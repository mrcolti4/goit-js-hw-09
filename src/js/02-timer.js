import flatpickr from 'flatpickr';
import { refsTimer } from './refsTimer';
import { convertMs } from './convertMs';
import { addLeadingZero } from './addLeadingZero';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

let dateDifference;
let dateTimerInterval;

function writeTime() {
  const { days, hours, minutes, seconds } = convertMs(dateDifference);
  refsTimer.dateDays.textContent = addLeadingZero(days);
  refsTimer.dateHours.textContent = addLeadingZero(hours);
  refsTimer.dateMinutes.textContent = addLeadingZero(minutes);
  refsTimer.dateSeconds.textContent = addLeadingZero(seconds);
}

const handleTimer = e => {
  dateTimerInterval = setInterval(() => {
    // Перевірка на те щоб часу залишилося більше ніж 0 секунд
    if (dateDifference <= 999) {
      clearInterval(dateTimerInterval);
      return;
    }
    // dateDifference - це мілісекунди до завершення таймеру,
    // тому віднімаємо по 1000 мілісекунд
    dateDifference -= 1000;
    writeTime();
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    dateDifference = selectedDates[0].getTime() - date.getTime();
    if (dateDifference > 0) {
      refsTimer.dateBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refsTimer.datePicker, options);
refsTimer.dateBtn.addEventListener('click', handleTimer);
