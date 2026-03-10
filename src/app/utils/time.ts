const SECOND_IN_MILISECONDS = 1000;
const MINUTE_IN_MILISECONDS = SECOND_IN_MILISECONDS * 60;

export function getMinutesInMilliseconds(minutes: number) {
  return minutes * MINUTE_IN_MILISECONDS;
}
