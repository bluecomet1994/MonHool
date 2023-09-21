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

export function calculateCoinBalance(trading: CurrencyType[], wallet: any, amount: number) {
  let balanceFilled: boolean = false;
  let tempAmount: number = amount;
  let balance: any = {
    BTC: 0,
    ETH: 0,
    USDT: 0,
    XRP: 0,
    SOL: 0
  };
  
  trading.map((currency: CurrencyType) => {
    if (!balanceFilled) {
      const coinBalance: number = Number(currency.lastPrice) * wallet[currency.unit.toLowerCase()];
      if (coinBalance < tempAmount) {
        tempAmount -= coinBalance;
        balance[currency.unit] = wallet[currency.unit.toLowerCase()];
      } else {
        balance[currency.unit] = tempAmount / Number(currency.lastPrice);
        balanceFilled = true;
      }
    }
  });

  let totalAmount: number = 0;

  trading.map((currency: CurrencyType) => {
    totalAmount += (Number(currency.lastPrice) * balance[currency.unit]);
  });

  if (totalAmount < amount) {
    return false;
  } else {
    return balance;
  }
}