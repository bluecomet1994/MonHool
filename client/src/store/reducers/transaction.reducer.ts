import { TransactionAction } from "@/types/redux";
import * as Actions from '@/store/actions/constants';

const initialState = {
  isLoading: false,
  history: [],
  deposit: [],
  withdrawal: [],
  error: null
}

const transaction = (state = initialState, action: TransactionAction) => {
  switch (action.type) {
    case Actions.GET_TRANSACTION_HISTORY_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_TRANSACTION_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        history: action.payload
      }
    }
    case Actions.GET_TRANSACTION_HISTORY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Actions.GET_DEPOSIT_HISTORY_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_DEPOSIT_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        deposit: action.payload
      }
    }
    case Actions.GET_DEPOSIT_HISTORY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Actions.GET_WITHDRAWAL_HISTORY_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_WITHDRAWAL_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        withdrawal: action.payload
      }
    }
    case Actions.GET_WITHDRAWAL_HISTORY_FAILURE: {
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

export default transaction;