import { Dispatch } from 'redux';
import * as Actions from './constants';
import axios from 'axios';
import { TRADING_STATUS } from '@/enums/status';
import { OpenTradingRequestType } from '@/types/redux';

export const getTradingPosition: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_TRADING_POSITION_REQUEST });

  return axios.get(`${process.env.ROOT_API}/trading/position`)
    .then(response => {
      if (response.data.status === TRADING_STATUS.OPENED) {
        dispatch({
          type: Actions.GET_TRADING_POSITION_SUCCESS,
          payload: response.data.history
        });
      } else {
        dispatch({
          type: Actions.GET_TRADING_POSITION_SUCCESS,
          payload: null
        });
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_TRADING_POSITION_FAILURE,
        error
      });

      return error;
    });
}

export const openTradingPosition: any = (data: OpenTradingRequestType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.ADD_TRADING_POSITION_REQUEST });

  return axios.post(`${process.env.ROOT_API}/trading/position`, data)
    .then(response => {
      dispatch({ type: Actions.ADD_TRADING_POSITION_SUCCESS });
      if (response.data.success) {
        dispatch(getTradingPosition());
        dispatch({
          type: Actions.SET_USER_INFO_BY_TOKEN,
          payload: response.data.user
        })
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.ADD_TRADING_POSITION_FAILURE,
        error
      });

      return error;
    });
}

export const getTradeEarning: any = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_TRADING_MONEY_REQUEST });

  return axios.put(`${process.env.ROOT_API}/trading/earn`, { id })
    .then(response => {
      if (response.data.success) {
        dispatch({ type: Actions.GET_TRADING_MONEY_SUCCESS });
        dispatch({
          type: Actions.SET_USER_INFO_BY_TOKEN,
          payload: response.data.user
        });
        dispatch(getTradingPosition());
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_TRADING_MONEY_FAILURE,
        error
      });

      return error;
    });
}