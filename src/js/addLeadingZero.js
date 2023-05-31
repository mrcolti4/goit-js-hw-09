function addLeadingZero(date) {
  return date.length > 1 ? date : String(date).padStart(2, '0');
}
export { addLeadingZero };
