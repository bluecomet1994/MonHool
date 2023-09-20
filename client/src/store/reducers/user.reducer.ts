import * as ActionType from '@/store/actions/constants';
import { UserAction } from "@/types/redux";

const initialState = {
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
    date: null
  },
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
    default: {
      return state;
    }
  }
}

export default user;