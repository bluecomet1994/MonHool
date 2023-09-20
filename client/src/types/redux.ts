import { CurrencyType, StakingType } from "./components";

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

export interface UserAction {
  type: string;
  payload?: UserInfoType;
}

export interface StakingAction {
  type: string;
  payload?: StakingType;
}

export interface CurrencyAction {
  type: string;
  payload?: CurrencyType;
  error?: Error;
}