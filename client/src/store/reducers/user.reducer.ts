import * as ActionType from '@/store/actions/constants';
import { UserAction } from "@/types/redux";

const initialState = {
  isLoading: false,
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
  }
}

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.SET_USER_INFO_BY_TOKEN: {
      return {
        ...state,
        isLogin: true,
        userInfo: action.payload
      }
    }
    case ActionType.LOGOUT_USER: {
      return initialState;
    }

    case ActionType.FETCH_DASHBOARD_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.FETCH_DASHBOARD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dashboard: action.payload
      }
    }
    case ActionType.FETCH_DASHBOARD_FAILURE: {
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