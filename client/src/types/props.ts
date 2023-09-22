import { CoinHistoryType, CurrencyType, TimeListType, TransactionRequestType } from "./components";

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
  isLoading: boolean;
  headCols: string[];
  bodyCols: Array<any>;
}

export interface AddPositionProps {
  isOpen: boolean;
  setter: any;
}

export interface IconProps {
  color?: string;
}

export interface DropDownProps {
  color?: string;
  list: CurrencyType[];
  value: CurrencyType;
  setter: any;
}

export interface TimeDropDownProps {
  list: TimeListType[];
  value: TimeListType;
  setter: any;
}

export interface TradingProps {
  list: string[][];
  value: string[];
  setter: any;
  trading?: any;
  wallet?: any;
}

export interface TransactionInputProp {
  type: string;
  placeholder?: string;
  editable: boolean;
  value?: string;
  onChange?: any;
}

export interface AdminTableProps {
  isLoading: boolean;
  headCols: string[];
  data: Array<any>;
}