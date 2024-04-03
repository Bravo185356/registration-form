export function isDateCorrect(value) {
  return new Date() > new Date(value);
}

export function isPhoneNumberCorrect(value) {
  return value.length === 11 && value !== "7" ? true : false;
}