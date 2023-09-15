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