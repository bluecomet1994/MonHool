import { CoinHistoryType, EarningsType, StakingType, TradingCryptoType, UserBalanceType } from "@/types/components";

export const cryptoCurrency: any = {
  "BTC": 26403.92,
  "ETH": 1620.82,
  "USDT": 1.00,
  "XRP": 0.50,
  "SOL": 18.70
}

export const tradingCryptos: TradingCryptoType[] = [
  {
    id: 1,
    name: "Bitcoin",
    amount: 26311.77,
    image: "/assets/images/badges/btc.png",
    trending: true
  },
  {
    id: 2,
    name: "Ethereum",
    amount: 1645.65,
    image: "/assets/images/badges/eth.png",
    trending: false
  },
  {
    id: 3,
    name: "Ripple",
    amount: 0.5123,
    image: "/assets/images/badges/xrp.png",
    trending: false
  },
  {
    id: 4,
    name: "USDT",
    amount: 1.05,
    image: "/assets/images/badges/usdt.png",
    trending: true
  },
];

export const venderImages: string[] = [
  '/assets/images/venders/opera.png',
  '/assets/images/venders/trading_view.png',
  '/assets/images/venders/coinbase.png',
  '/assets/images/venders/nord_vpn.png',
  '/assets/images/venders/google.png',
  '/assets/images/venders/opera.png',
  '/assets/images/venders/trading_view.png',
  '/assets/images/venders/coinbase.png',
  '/assets/images/venders/nord_vpn.png',
  '/assets/images/venders/google.png',
];

export const earnings: EarningsType[] = [
  {
    id: 1,
    title: "All earnings",
    amount: 8656.09,
    increase: 0.1
  },
  {
    id: 2,
    title: "Staking earnings",
    amount: 1998.09,
    increase: 0.03
  },
  {
    id: 3,
    title: "Trading bot earnings",
    amount: 6658,
    increase: 0.03
  },
];

export const userBalance: UserBalanceType[] = [
  {
    id: 1,
    title: "Bitcoin",
    name: "BTC",
    image: '/assets/images/badges/bitcoin.png',
    amount: 0.7723
  },
  {
    id: 2,
    title: "Ethereum",
    name: "ETH",
    image: '/assets/images/badges/ethereum.png',
    amount: 0
  },
  {
    id: 3,
    title: "Ripple",
    name: "XRP",
    image: '/assets/images/badges/xrp.png',
    amount: 0
  },
  {
    id: 4,
    title: "Thether",
    name: "USDT",
    image: '/assets/images/badges/usdt.png',
    amount: 0
  },
  {
    id: 5,
    title: "Solana",
    name: "SOL",
    image: '/assets/images/badges/solana.png',
    amount: 167.094
  },
];

export const coinHistory: CoinHistoryType[] = [
  {
    id: 1,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: false,
    amount: 3153.79,
    total: 167.094
  },
  {
    id: 2,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: true,
    amount: "BTC",
    total: 167.094
  },
  {
    id: 3,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: false,
    amount: 3153.79,
    total: 167.094
  },
  {
    id: 4,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: false,
    amount: 3153.79,
    total: 167.094
  },
  {
    id: 5,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: false,
    amount: 3153.79,
    total: 167.094
  },
  {
    id: 6,
    status: "Deposit",
    date: new Date(),
    coin: "SOL",
    isExchange: false,
    amount: 3153.79,
    total: 167.094
  },
];

export const stakings: StakingType[] = [
  {
    id: 1,
    coin: "BTC",
    amount: 1.12,
    earning: 0.24,
    rate: 0.2,
    time: 2456
  },
  {
    id: 2,
    coin: "SOL",
    amount: 520.1,
    earning: 93.3,
    rate: 0.18,
    time: 0
  },
];