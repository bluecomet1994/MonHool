import * as ActionTypes from '@/store/constants';
import { StakingAction } from "@/types/redux";
import { stakings } from "@/utils/mockData";

const initialState = {
  data: stakings
}

const staking = (state = initialState, action: StakingAction) => {
  switch (action.type) {
    case ActionTypes.GET_STAKINGS: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default staking;