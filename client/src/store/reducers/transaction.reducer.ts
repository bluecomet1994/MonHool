import { TransactionAction } from "@/types/redux";
import * as Actions from '@/store/actions/constants';

const initialState = {
  isLoading: false,
  isExchange: false,
  isDeposit: false,
  isWithdrawal: false,
  history: [],
  deposit: [],
  withdrawal: [],
  error: null
}

const transaction = (state = initialState, action: TransactionAction) => {
  switch (action.type) {
    case Actions.EXCHANGE_REQUEST: {
      return {
        ...state,
        isExchange: true
      }
    }
    case Actions.EXCHANGE_DONE: {
      return {
        ...state,
        isExchange: false
      }
    }

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

    case Actions.DEPOSIT_COIN_REQUEST: {
      return {
        ...state,
        isDeposit: true
      }
    }
    case Actions.DEPOSIT_COIN_DONE: {
      return {
        ...state,
        isDeposit: false
      }
    }

    case Actions.WITHDRAWAL_COIN_REQUEST: {
      return {
        ...state,
        isWithdrawal: true
      }
    }
    case Actions.WITHDRAWAL_COIN_DONE: {
      return {
        ...state,
        isWithdrawal: false
      }
    }
    default: {
      return state;
    }
  }
}

export default transaction;