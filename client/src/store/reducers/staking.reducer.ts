import * as Actions from '@/store/actions/constants';
import { StakingAction } from "@/types/redux";

const initialState = {
  isLoading: false,
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
    default: {
      return state;
    }
  }
}

export default staking;