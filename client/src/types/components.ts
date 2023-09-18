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

export interface StakingType {
  id: number;
  coin: string;
  amount: number;
  rate: number;
  earning: number;
  time: number;
}

export interface TransactionHistoryType {
  id: number;
  coin: string;
  crypto: string;
  date: Date;
  currency: number;
  status: string;
}

export interface HistoryListType {
  title: string;
  data: TransactionHistoryType[];
}

export interface TransactionRequestType {
  id: number;
  username: string;
  date: Date;
  coin: string;
  amount: number;
  address: string;
}

export interface CurrencyType {
  id: number;
  coin: string;
  unit: string;
  currency: number;
}

export interface TimeListType {
  id: number;
  time: number;
  rate: number;
}