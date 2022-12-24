import jwtDecode from "jwt-decode";
import { publicRequest } from "./../../utils/axiosInstance";
export type FormLogin = {
  email: string;
  password: string;
};

export type FormRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormLogout = {
  refreshToken: string;
};

export type CallbackAuth = {
  error: string | null | boolean;
  loading: boolean;
  message: string | null;
};

interface AuthAction {
  dispatch?: any;
}

interface LoginAction extends AuthAction {
  data: FormLogin;
  callback: (data: CallbackAuth) => void;
}

interface RegisterAction extends AuthAction {
  data: FormRegister;
  callback: (data: CallbackAuth) => void;
}

interface LogoutAction extends AuthAction {
  data: FormLogout;
}

export const login = async ({ dispatch, data, callback }: LoginAction) => {
  callback({
    error: null,
    loading: true,
    message: null,
  });
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    callback({
      error: false,
      loading: false,
      message: msg,
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        accessToken,
        isAuthenticated: true,
      },
    });

    localStorage.setItem("accessToken", accessToken);
  } catch (error: any) {
    callback({
      error: true,
      loading: false,
      message: error.response?.data?.msg,
    });
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = async ({ dispatch, data }: LogoutAction) => {
  try {
    const response = await publicRequest.delete("/auth/logout", {
      data: {
        refresh_token: data.refreshToken,
      },
    });
    const { msg }: { msg: string } = response.data;
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error: any) {
    const { msg }: { msg: string } = error.response?.data;
    console.log(msg);
  }
};

export const register = async ({ data, callback }: RegisterAction) => {
  callback({
    error: null,
    loading: true,
    message: null,
  });
  try {
    const response = await publicRequest.post("/auth/register", data);
    const { msg } = response.data;
    callback({
      error: false,
      loading: false,
      message: msg,
    });
  } catch (error: any) {
    const { msg }: { msg: string } = error.response?.data;
    callback({
      error: true,
      loading: false,
      message: msg,
    });
  }
};
