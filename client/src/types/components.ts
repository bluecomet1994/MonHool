export interface RegisterUserType {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

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
  // amount: number;
  // increase: number;
  data: number[];
}

export interface InputEleType {
  value: number;
  setter: any;
}

export interface UserBalanceType {
  id: number;
  title: string;
  name: string;
  image: string;
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
  _id: string;
  username: string;
  email: string;
  coin: string;
  deposit: number;
  rate: number;
  earning: number;
  usd: number;
  endDate: number;
  status: number;
  date: string;
  __v: number;
}

export interface TradingPositionType {
  _id: string;
  username: string;
  email: string;
  amount: number;
  hit: number;
  endDate: number;
  status: number;
  date: string;
  __v: number
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
  isLoading: boolean;
  title: string;
  data: Array<any>;
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
  image: string;
  closeTime?: number;
  count?: number;
  firstId?: number;
  highPrice?: string;
  lastId?: number;
  lastPrice: string;
  lowPrice?: string;
  openPrice?: string;
  openTime?: number;
  priceChange?: string;
  priceChangePercent?: string;
  quoteVolume?: string;
  symbol?: string;
  volume?: string;
  weightedAvgPrice?: string;
}

export interface TimeListType {
  id: number;
  time: number;
  rate: number;
}