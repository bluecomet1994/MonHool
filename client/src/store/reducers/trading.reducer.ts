import { TradingBotAction } from "@/types/redux";
import * as Actions from '@/store/actions/constants';
import { TRADING_STATUS } from "@/enums/status";

const initialState = {
  isLoading: false,
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
    default: {
      return state;
    }
  }
}

export default trading;