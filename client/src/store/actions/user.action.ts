import axios from "axios";
import { Dispatch } from "redux";
import * as Actions from '@/store/actions/constants';
import { LoginUserType, RegisterUserType } from "@/types/components";

export const registerUser: any = (data: RegisterUserType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.REGISTER_USER_REQUEST });

  return axios.post(`${process.env.ROOT_API}/user/register`, data)
    .then(response => {
      dispatch({ type: Actions.REGISTER_USER_DONE });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Actions.REGISTER_USER_DONE });
      return error;
    });
}

export const loginUser: any = (data: LoginUserType) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.LOGIN_USER_REQUEST });

  return axios.post(`${process.env.ROOT_API}/user/login`, data)
    .then(response => {
      dispatch({ type: Actions.LOGIN_USER_DONE });

      if (response.data.success) {
        localStorage.setItem('access-token', response.data.token);
        dispatch(loginWithJWTToken(localStorage.getItem('access-token')));
      }

      return response.data;
    })
    .catch(error => {
      dispatch({ type: Actions.LOGIN_USER_DONE });
      return error;
    });
}

export const loginWithJWTToken: any = (token: string) => (dispatch: Dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  dispatch({ type: Actions.SET_USER_INFO_REQUEST });

  return axios.get(`${process.env.ROOT_API}/user/access-token`)
    .then((response: any) => {
      if (response.response) {
        localStorage.removeItem('access-token');
        
        return {
          success: false,
          message: "The token has expired."
        }
      } else {
        dispatch({
          type: Actions.SET_USER_INFO_SUCCESS,
          payload: response.data.user
        });

        return response.data;
      }
    })
    .catch(error => {
      dispatch({
        type: Actions.SET_USER_INFO_FAILURE,
        error
      });
      return error;
    });
}

export const logoutUser: any = () => (dispatch: Dispatch) => {
  localStorage.removeItem('access-token');

  dispatch({ type: Actions.LOGOUT_USER });
}

export const fetchDashboard: any = (range: number) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.FETCH_DASHBOARD_REQUEST });

  return axios.post(`${process.env.ROOT_API}/transaction/dashboard`, { range })
    .then(response => {
      dispatch({
        type: Actions.FETCH_DASHBOARD_SUCCESS,
        payload: response.data.result
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.FETCH_DASHBOARD_FAILURE,
        error
      });
    })
}