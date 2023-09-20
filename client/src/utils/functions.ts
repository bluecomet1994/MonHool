import { CurrencyType } from "@/types/components";

export function convertTime(time: number) {
  const hour: number = Math.floor(time / 3600);
  const minute: number = Math.floor((time % 3600) / 60);
  const second: number = time % 60;

  return `${hour}h ${minute}m ${second}s`;
}

export function concatObjects(obj1: any, obj2: any) {
  return { ...obj1, ...obj2 }
}

export function formatNumber(num: number) {
  return num > 0 ? (Math.floor(num * 100) / 100).toLocaleString() : num.toFixed(2);
}

export function calculateBalance(trading: CurrencyType[], wallet: any) {
  let balance: number = 0;

  trading.map((currency: CurrencyType) => {
    balance += (Number(currency.lastPrice) * wallet[currency.unit.toLowerCase()]);
  });

  return formatNumber(balance);
}