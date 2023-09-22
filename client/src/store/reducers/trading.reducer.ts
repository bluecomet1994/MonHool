import { TradingBotAction } from "@/types/redux";
import * as Actions from '@/store/actions/constants';

const initialState = {
  isLoading: false,
  isOpening: false,
  isEarning: false,
  position: null,
  error: null
}

const trading = (state = initialState, action: TradingBotAction) => {
  switch (action.type) {
    case Actions.GET_TRADING_POSITION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_TRADING_POSITION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        position: action.payload
      }
    }
    case Actions.GET_TRADING_POSITION_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }

    case Actions.ADD_TRADING_POSITION_REQUEST: {
      return {
        ...state,
        isOpening: true
      }
    }
    case Actions.ADD_TRADING_POSITION_DONE: {
      return {
        ...state,
        isOpening: false
      }
    }

    case Actions.GET_TRADING_MONEY_REQUEST: {
      return {
        ...state,
        isEarning: true
      }
    }
    case Actions.GET_TRADING_MONEY_DONE: {
      return {
        ...state,
        isEarning: false
      }
    }
    default: {
      return state;
    }
  }
}

export default trading;