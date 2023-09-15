import { CoinHistoryType } from "./components";

export interface NavbarLinkProps {
  new: boolean;
  path: string;
  children: React.ReactNode;
}

export interface CryptoAnalyticProps {
  name: string;
  image: string;
  amount: number;
  trending: boolean;
}

export interface SliderProps {
  startValue: number;
  endValue: number;
  value: number;
  handler: any;
}

export interface InputProps {
  type: string;
  placeholder?: string;
  operator: any;
  error?: string;
}

export interface TableProps {
  headCols: Array<string>;
  bodyCols: CoinHistoryType[];
}