import { CurrencyType } from "@/types/components";

export const monthString: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function convertTime(time: number) {
  const hour: number = Math.floor(time / 1000 / 60 / 60);
  const minute: number = Math.floor((time / 1000 / 60) % 60);
  const second: number = Math.floor((time / 1000) % 60);

  return `${hour}h ${minute}m ${second}s`;
}

export function concatObjects(obj1: any, obj2: any) {
  return { ...obj1, ...obj2 }
}

export function formatNumber(num: number) {
  return num > 0 ? (Math.floor(num * 100) / 100).toLocaleString() : num.toFixed(2);
}

export function formatDate(date: string) {
  const year = date.slice(0, 4);
  const month = monthString[Number(date.slice(6,7)) - 1];
  const day = date.slice(8,10);

  return `${month} ${day}th, ${year}`;
}

export function calculateBalance(trading: CurrencyType[], wallet: any) {
  let balance: number = 0;

  trading.map((currency: CurrencyType) => {
    balance += (Number(currency.lastPrice) * wallet[currency.unit.toLowerCase()]);
  });

  return formatNumber(balance);
}