import axios from "axios";
import { Dispatch } from "redux";
import { DepositRequestType, ExchangeRequestType } from "@/types/redux";
import * as Actions from "./constants";

export const exchangeCoin: any = (data: ExchangeRequestType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.EXCHANGE_REQUEST });

  return axios.post(`${process.env.ROOT_API}/transaction/exchange`, data)
    .then(response => {
      dispatch({ type: Actions.EXCHANGE_DONE });

      if (response.data.success) {
        dispatch({
          type: Actions.SET_USER_INFO_SUCCESS,
          payload: response.data.user
        })
      }

      return response.data;
    })
    .catch(error => {
      dispatch({ type: Actions.EXCHANGE_DONE });
      return error;
    });
}

export const getTransactionHistory: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_TRANSACTION_HISTORY_REQUEST });
  
  return axios.get(`${process.env.ROOT_API}/transaction/history`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: Actions.GET_TRANSACTION_HISTORY_SUCCESS,
          payload: response.data.history
        });
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_TRANSACTION_HISTORY_FAILURE,
        error
      });

      return error;
    });
}

export const getDepositHistory: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_DEPOSIT_HISTORY_REQUEST });

  return axios.get(`${process.env.ROOT_API}/transaction/history/deposit`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: Actions.GET_DEPOSIT_HISTORY_SUCCESS,
          payload: response.data.history
        });
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_DEPOSIT_HISTORY_FAILURE,
        error
      });

      return error;
    });
}

export const getWithdrawalHistory: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_WITHDRAWAL_HISTORY_REQUEST });

  return axios.get(`${process.env.ROOT_API}/transaction/history/withdrawal`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: Actions.GET_WITHDRAWAL_HISTORY_SUCCESS,
          payload: response.data.history
        });
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_WITHDRAWAL_HISTORY_FAILURE,
        error
      });

      return error;
    });
}

export const depositCoin: any = (data: DepositRequestType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.DEPOSIT_COIN_REQUEST });

  return axios.post(`${process.env.ROOT_API}/transaction/deposit`, data)
    .then(response => {
      if (response.data.success) {
        dispatch({ type: Actions.DEPOSIT_COIN_SUCCESS });
        dispatch(getDepositHistory());
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.DEPOSIT_COIN_FAILURE,
        error
      });

      return error;
    });
}

export const withdrawalCoin: any = (data: DepositRequestType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.WITHDRAWAL_COIN_REQUEST });

  return axios.post(`${process.env.ROOT_API}/transaction/withdrawal`, data)
    .then(response => {
      if (response.data.success) {
        dispatch({ type: Actions.WITHDRAWAL_COIN_SUCCESS });
        dispatch(getWithdrawalHistory());
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.WITHDRAWAL_COIN_FAILURE,
        error
      });

      return error;
    });
}