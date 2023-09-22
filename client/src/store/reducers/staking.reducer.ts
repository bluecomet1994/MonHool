import * as Actions from '@/store/actions/constants';
import { StakingAction } from "@/types/redux";

const initialState = {
  isLoading: false,
  isEarning: null,
  isOpening: false,
  positions: [],
  error: null
}

const staking = (state = initialState, action: StakingAction) => {
  switch (action.type) {
    case Actions.GET_STAKING_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.GET_STAKING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        positions: action.payload
      }
    }
    case Actions.GET_STAKING_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    case Actions.OPEN_STAKING_POSITION_REQUEST: {
      return {
        ...state,
        isOpening: true
      }
    }
    case Actions.OPEN_STAKING_POSITION_SUCCESS: {
      return {
        ...state,
        isOpening: false
      }
    }
    case Actions.OPEN_STAKING_POSITION_FAILURE: {
      return {
        ...state,
        isOpening: false
      }
    }

    case Actions.GET_STAKING_MONEY_REQUEST: {
      return {
        ...state,
        isEarning: action.payload
      }
    }
    case Actions.GET_STAKING_MONEY_DONE: {
      return {
        ...state,
        isEarning: null
      }
    }
    default: {
      return state;
    }
  }
}

export default staking;