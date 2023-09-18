export function convertTime(time: number) {
  const hour: number = Math.floor(time / 3600);
  const minute: number = Math.floor((time % 3600) / 60);
  const second: number = time % 60;

  return `${hour}h ${minute}m ${second}s`;
}

export function concatObjects(obj1: any, obj2: any) {
  return { ...obj1, ...obj2 }
}