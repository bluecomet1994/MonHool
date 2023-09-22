import * as Actions from '@/store/actions/constants';
import { UserAction } from "@/types/redux";

const initialState = {
  isLoading: true,
  isSign: false,
  error: null,
  isLogin: false,
  userInfo: {
    username: '',
    email: '',
    wallet: {
      btc: 0,
      eth: 0,
      usdt: 0,
      xrp: 0,
      sol: 0
    },
    isAdmin: false,
    date: null
  },
  dashboard: {
    allEarning: [0, 0],
    staking: [0, 0],
    trading: [0, 0],
  },
  trading: []
}

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case Actions.REGISTER_USER_REQUEST: {
      return {
        ...state,
        isSign: true
      }
    }
    case Actions.REGISTER_USER_DONE: {
      return {
        ...state,
        isSign: false
      }
    }
    case Actions.LOGIN_USER_REQUEST: {
      return {
        ...state,
        isSign: true
      }
    }
    case Actions.LOGIN_USER_DONE: {
      return {
        ...state,
        isSign: false
      }
    }

    case Actions.SET_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload
      }
    }
    case Actions.SET_USER_INFO_FAILURE: {
      return {
        ...state,
        isLoading: true,
        error: action.error
      }
    }
    case Actions.LOGOUT_USER: {
      return {
        ...initialState,
        isLoading: false
      }
    }

    case Actions.FETCH_DASHBOARD_REQUEST: {
      return state;
    }
    case Actions.FETCH_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dashboard: action.payload
      }
    }
    case Actions.FETCH_DASHBOARD_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }

    case Actions.GET_CURRENCY_TRADING_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_CURRENCY_TRADING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        trading: action.payload
      }
    }
    case Actions.GET_CURRENCY_TRADING_FAILURE: {
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

export default user;