import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { API_BASE_URL, HTTP_METHODS, API_HEADERS } from "@/utils/https";
import { errorToast, successToast } from "@utils/helper";

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  refreshToken: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { _id, accessToken, refreshToken } = action.payload?.user;
      // state.isLoggedIn = true;
      state.userId = _id;
      state.token = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      // clear the state to initial state
      Object.assign(state, initialState);
    },
  },
});

export const loginAction =
  ({ data, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/api/v1/users/login`,
        data: data,
        headers: API_HEADERS,
      });
      dispatch(login(response.data));
      onSuccess();
      successToast(response, "Logged in successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const googleLoginAction =
  ({ data, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/user/api/googlelogin/`,
        data: data,
        headers: API_HEADERS,
      });
      dispatch(login(response.data));
      onSuccess();
      successToast(response, "Logged in successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const registerAction =
  ({ data, setIsLoading }) =>
  async () => {
    setIsLoading(true);
    try {
      await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/user/api/register/`,
        data: data,
        headers: API_HEADERS,
      });
      // redirect to login page`
      window.location.href = "/login";
      successToast("", "Registered successfully");
    } catch (error) {
      const errorData = error?.response?.data?.error;
      if (typeof errorData === "object") {
        errorToast({ message: Object.values(errorData)[0] });
      } else {
        errorToast({ error, duration: 11000, style: { minWidth: "80%" } });
      }
    } finally {
      setIsLoading(false);
    }
  };

export const forgotPasswordAction =
  ({ data, setIsLoading, toNavigate }) =>
  async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/user/api/forget-password/`,
        data: data,
        headers: API_HEADERS,
      });
      successToast(response, "OTP sent successfully to email");
      toNavigate();
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const resetPasswordAction =
  ({ data, setIsLoading, toNavigate }) =>
  async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/user/api/verify-otp/`,
        data: data,
        headers: API_HEADERS,
      });
      successToast(response, "Password reset successfully");
      toNavigate();
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const ChangePasswordAction =
  ({ data, setButtonLoader, token, reset }) =>
  async (dispatch) => {
    setButtonLoader(true);
    const localHeader = { ...API_HEADERS, Authorization: `Token ${token}` };
    try {
      const response = await axios({
        method: HTTP_METHODS.PUT,
        url: `${API_BASE_URL}/user/api/changepassword/`,
        data: data,
        headers: localHeader,
      });
      successToast(response, "Password changed successfully");
      reset();
    } catch (error) {
      errorToast({ dispatch, error });
    } finally {
      setButtonLoader(false);
    }
  };

export const logoutAction = (token) => async (dispatch) => {
  const localHeader = { ...API_HEADERS, Authorization: `Token ${token}` };
  try {
    const response = await axios({
      method: HTTP_METHODS.GET,
      url: `${API_BASE_URL}/user/api/logout/`,
      headers: localHeader,
    });
    successToast(response, "Logged out successfully");
    dispatch(logout());
  } catch (error) {
    dispatch(logout());
    console.log(error);
  }
};

export const selectToken = (state) => state.Auth.token;
export const selectIsLoggedIn = (state) => state.Auth.isLoggedIn;

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
