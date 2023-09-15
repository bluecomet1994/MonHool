export interface TradingCryptoType {
  id: number;
  name: string;
  amount: number;
  image: string;
  trending: boolean;
}

export interface EarningsType {
  id: number;
  title: string;
  amount: number;
  increase: number;
}

export interface InputEleType {
  value: string;
  setter: any;
}

export interface UserBalanceType {
  id: number;
  title: string;
  name: string;
  image: string;
  amount: number;
}

export interface CoinHistoryType {
  id: number;
  status: string;
  date: Date;
  coin: string;
  isExchange: boolean;
  amount: number | string | any;
  total: number;
}