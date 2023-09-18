import { CurrencyType, StakingType } from "./components";

export interface StakingAction {
  type: string;
  payload?: StakingType;
}

export interface CurrencyAction {
  type: string;
  payload?: CurrencyType;
}