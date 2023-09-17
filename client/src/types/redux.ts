import { StakingType } from "./components";

export interface StakingAction {
  type: string;
  payload?: StakingType;
}