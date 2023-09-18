import axios from "axios";
import { Dispatch } from "redux";
import * as ActionTypes from '@/store/actions/constants';
import { CurrencyType } from "@/types/components";
import { concatObjects } from "@/utils/functions";

let cryptoCurrency = [
  {
    id: 1,
    coin: "Bitcoin",
    unit: "BTC",
    image: "/assets/images/badges/btc.png",
  },
  {
    id: 2,
    coin: "Ethereum",
    unit: "ETH",
    image: "/assets/images/badges/eth.png",
  },
  {
    id: 3,
    coin: "Theter",
    unit: "USDT",
    image: "/assets/images/badges/usdt.png",
  },
  {
    id: 4,
    coin: "Ripple",
    unit: "XRP",
    image: "/assets/images/badges/xrp.png",
  },
  {
    id: 5,
    coin: "Solana",
    unit: "SOL",
    image: "/assets/images/badges/sol.png",
  },
]

export const getCurrencyTrading = (): any => (dispatch: Dispatch) => {
  const currencyApi: string = 'https://data.binance.com/api/v3/ticker?symbols=["BTCUSDT","ETHUSDT","BUSDUSDT","XRPUSDT","SOLUSDT"]';

  dispatch({ type: ActionTypes.GET_CURRENCY_TRADING_REQUEST });

  return axios.get(currencyApi)
    .then(response => {
      let mergedData: CurrencyType[] = [];

      for(let i = 0; i < cryptoCurrency.length; i++) {
        mergedData.push(concatObjects(cryptoCurrency[i], response.data[i]));
      }

      dispatch({
        type: ActionTypes.GET_CURRENCY_TRADING_SUCCESS,
        payload: mergedData
      });

      return mergedData;
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CURRENCY_TRADING_FAILURE,
        error
      });

      return error;
    });
}