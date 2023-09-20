import { CurrencyAction } from "@/types/redux";
import * as ActionTypes from '@/store/actions/constants';

const initialState = {
  isLoading: true,
  error: null,
  trading: []
}

const currency = (state = initialState, action: CurrencyAction) => {
  switch (action.type) {
    case ActionTypes.GET_CURRENCY_TRADING_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_CURRENCY_TRADING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        trading: action.payload
      }
    }
    case ActionTypes.GET_CURRENCY_TRADING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    default: {
      return state;
    }
  }
}

export default currency;