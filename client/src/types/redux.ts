import { CurrencyType, StakingType, TradingPositionType } from "./components";

export interface UserInfoType {
  username: string;
  email: string;
  wallet: {
    btc: number;
    eth: number;
    usdt: number;
    xrp: number;
    sol: number;
  }
  date: Date;
}

export interface DashboardType {
  transaction: number[];
  staking: number[];
  trading: number[];
}

export interface UserAction {
  type: string;
  payload?: UserInfoType | DashboardType;
  error?: Error;
}

export interface TransactionAction {
  type: string;
  payload?: Array<any>;
  error?: Error;
}

export interface StakingAction {
  type: string;
  payload?: StakingType;
  error?: Error;
}

export interface TradingBotAction {
  type: string;
  payload?: TradingPositionType;
  error?: Error;
}

export interface CurrencyAction {
  type: string;
  payload?: CurrencyType;
  error?: Error;
}

export interface AdminAction {
  type: string;
  payload?: any;
  error?: Error;
}

export interface ExchangeRequestType {
  sendCoin: string;
  sendAmount: number;
  getCoin: string;
  getAmount: number;
}

export interface DepositRequestType {
  coin: string;
  amount: number;
  hash: string;
  usd: number;
}

export interface WithdrawalRequestType {
  coin: string;
  amount: number;
  address: string;
  usd: number;
}

export interface OpenStakingRequestType {
  coin: string;
  deposit: number;
  rate: number;
  earning: number;
  time: number;
  usd: number;
}

export interface OpenTradingRequestType {
  amount: number;
  hit: number;
  time: number;
  balance: {
    BTC: number;
    ETH: number;
    USDT: number;
    XRP: number;
    SOL: number;
  };
}