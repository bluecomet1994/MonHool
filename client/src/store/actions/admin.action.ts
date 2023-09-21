import { Dispatch } from "redux";
import * as Actions from './constants';
import axios from "axios";
import { TRANSACTION_TYPE } from "@/enums/type";

export const getDepositRequests: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_DEPOSIT_LIST_REQUEST });

  return axios.get(`${process.env.ROOT_API}/admin/deposit`)
    .then(response => {
      dispatch({
        type: Actions.GET_DEPOSIT_LIST_SUCCESS,
        payload: response.data.histories
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_DEPOSIT_LIST_FAILURE,
        error
      });

      return error;
    });
}

export const getWithdrawalRequests: any = () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_WITHDRAWAL_LIST_REQUEST });

  return axios.get(`${process.env.ROOT_API}/admin/withdrawal`)
    .then(response => {
      dispatch({
        type: Actions.GET_WITHDRAWAL_LIST_SUCCESS,
        payload: response.data.histories
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.GET_WITHDRAWAL_LIST_FAILURE,
        error
      });

      return error;
    });
}

export const accessRequest: any = (id: string, type: number, status: number) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.ACCESS_LIST_REQUEST });

  const body = { id, status }

  return axios.put(`${process.env.ROOT_API}/admin/access-request`, body)
    .then(response => {
      dispatch({ type: Actions.ACCESS_LIST_SUCCESS });
      if (type === TRANSACTION_TYPE.DEPOSIT) {
        dispatch(getDepositRequests());
      } else {
        dispatch(getWithdrawalRequests());
      }

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.ACCESS_LIST_FAILURE,
        error
      });

      return error;
    });
}