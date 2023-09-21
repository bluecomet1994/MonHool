import { AdminAction } from "@/types/redux";
import * as Actions from '@/store/actions/constants';

const initialState = {
  isLoading: false,
  error: null,
  deposit: [],
  withdrawal: []
}

const admin = (state = initialState, action: AdminAction) => {
  switch (action.type) {
    case Actions.GET_DEPOSIT_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_DEPOSIT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        deposit: action.payload
      }
    }
    case Actions.GET_DEPOSIT_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Actions.GET_WITHDRAWAL_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_WITHDRAWAL_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        withdrawal: action.payload
      }
    }
    case Actions.GET_WITHDRAWAL_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Actions.ACCESS_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.ACCESS_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case Actions.ACCESS_LIST_FAILURE: {
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

export default admin;