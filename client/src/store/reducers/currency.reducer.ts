import { CurrencyAction } from "@/types/redux"

const initialState = {
  trading: [
    {
      id: 1,
      coin: "Bitcoin",
      unit: "BTC",
      currency: 26403.92
    },
    {
      id: 2,
      coin: "Ethereum",
      unit: "ETH",
      currency: 1620.82
    },
    {
      id: 3,
      coin: "Theter",
      unit: "USDT",
      currency: 1
    },
    {
      id: 4,
      coin: "Ripple",
      unit: "XRP",
      currency: 0.5
    },
    {
      id: 5,
      coin: "Solana",
      unit: "SOL",
      currency: 18.7
    },
  ]
}

const currency = (state = initialState, action: CurrencyAction) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default currency;