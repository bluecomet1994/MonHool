export function convertTime(time: number) {
  const hour: number = Math.floor(time / 3600);
  const minute: number = Math.floor((time % 3600) / 60);
  const second: number = time % 60;

  return `${hour}h ${minute}m ${second}s`;
}