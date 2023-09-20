import axios from "axios";
import { Dispatch } from "redux";
import * as ActionType from '@/store/actions/constants';
import { LoginUserType, RegisterUserType } from "@/types/components";

export const registerUser: any = (data: RegisterUserType) => (dispatch: Dispatch) => {
  return axios.post(`${process.env.ROOT_API}/user/register`, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

export const loginUser: any = (data: LoginUserType) => (dispatch: Dispatch) => {
  return axios.post(`${process.env.ROOT_API}/user/login`, data)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('access-token', response.data.token);
        dispatch(loginWithJWTToken(localStorage.getItem('access-token')));
      }

      return response.data;
    })
    .catch(error => {
      return error;
    });
}

export const loginWithJWTToken: any = (token: string) => (dispatch: Dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

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
          type: ActionType.SET_USER_INFO_BY_TOKEN,
          payload: response.data.user
        });

        return response.data;
      }
    })
    .catch(error => error);
}

export const logoutUser: any = () => (dispatch: Dispatch) => {
  localStorage.removeItem('access-token');

  dispatch({ type: ActionType.LOGOUT_USER });
}