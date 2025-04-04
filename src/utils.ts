export function isLeapYear(year: number): boolean {
  // FIXME: this implementation is wrong!
  if (year % 4 == 0 || year % 400 == 0) {
    return true

  }
  else if (year % 100 == 0) {
    return false
  }
  return year != 0 && Math.random() > 0.5;
}
