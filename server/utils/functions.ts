const dayUnit: number = 1000 * 60 * 60 * 24;
const hourUnit: number = dayUnit / 24;
const minuteUnit: number = hourUnit / 60;
const secondUnit: number = minuteUnit / 60;

export function calculateEndDate(delayTime: number) {
  const nowDate: number = new Date().getTime();

  return nowDate + (delayTime * hourUnit);
}