import { Dispatch } from 'redux';
import * as Actions from './constants';
import axios from 'axios';
import { OpenStakingRequestType } from '@/types/redux';

export const getStakingList: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_STAKING_REQUEST });

  return axios.get(`${process.env.ROOT_API}/staking/list`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: Actions.GET_STAKING_SUCCESS,
          payload: response.data.histories
        });
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_STAKING_FAILURE,
        error
      });

      return error;
    });
}

export const addStakingPosition: any = (data: OpenStakingRequestType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.OPEN_STAKING_POSITION_REQUEST });

  return axios.post(`${process.env.ROOT_API}/staking/create`, data)
    .then(response => {
      dispatch({ type: Actions.OPEN_STAKING_POSITION_SUCCESS });
      if (response.data.success) {
        dispatch(getStakingList());
        dispatch({
          type: Actions.SET_USER_INFO_SUCCESS,
          payload: response.data.user
        })
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.OPEN_STAKING_POSITION_FAILURE,
        error
      });

      return error;
    });
}

export const getStakingMoney: any = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_STAKING_MONEY_REQUEST });

  return axios.put(`${process.env.ROOT_API}/staking/earn`, { id })
    .then(response => {
      if (response.data.success) {
        dispatch({ type: Actions.GET_STAKING_MONEY_SUCCESS });
        dispatch({
          type: Actions.SET_USER_INFO_SUCCESS,
          payload: response.data.user
        });
        dispatch(getStakingList());
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_STAKING_MONEY_FAILURE,
        error
      });

      return error;
    });
}