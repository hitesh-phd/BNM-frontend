// Redux slice
import { createSlice } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/https";
import { errorToast, successToast } from "@/utils/helper";

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
  refreshToken: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload?.data || {};
      state.isAuthenticated = true;
      state.userId = user._id;
      state.token = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      // clear the state to initial state
      Object.assign(state, initialState);
    },
    register: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload?.data || {};
      state.isAuthenticated = true;
      state.userId = user._id;
      state.token = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const loginAction =
  ({ data, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/users/login", data);
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
      const response = await apiClient.post("/user/api/googlelogin/", data);
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
  ({ data, setIsLoading, onSuccess }) =>
  async () => {
    setIsLoading(true);
    try {
      await apiClient.post("/user/api/register/", data);
      // redirect to login page
      window.location.href = "/login";
      successToast("", "Registered successfully");
      onSuccess();
    } catch (error) {
      // console.log("error", error);
      errorToast({ error, message: error.message });

      // const errorData = error?.response?.data?.errors;
      // // extract first error message from errorData object where key  name is unknown

      // if (typeof errorData === "object") {
      //   console.log("errorData", errorData);
      //   // errorToast({ message: errorData[0] });
      //   // Iterate over each error object in the response and display the error
      //   errorData.forEach((errorObj) => {
      //     const errorKey = Object.keys(errorObj)[0]; // Assuming each error object has only one key
      //     const errorMessage = errorObj[errorKey];
      //     errorToast({ message: errorMessage });
      //   });
      // } else {
      //   errorToast({ error, message: error.message });
      // }
    } finally {
      setIsLoading(false);
    }
  };

export const forgotPasswordAction =
  ({ data, setIsLoading, toNavigate }) =>
  async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/user/api/forget-password/", data);
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
      const response = await apiClient.post("/user/api/verify-otp/", data);
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
    const localHeader = {
      ...apiClient.defaults.headers,
      Authorization: `Token ${token}`,
    };
    try {
      const response = await apiClient.put("/user/api/changepassword/", data, {
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
  const localHeader = {
    ...apiClient.defaults.headers,
    Authorization: `Token ${token}`,
  };
  try {
    const response = await apiClient.get("/user/api/logout/", {
      headers: localHeader,
    });
    successToast(response, "Logged out successfully");
    dispatch(logout());
  } catch (error) {
    dispatch(logout());
    console.log(error);
  }
};

export const refreshTokenAction = (token) => async (dispatch) => {
  const localHeader = {
    ...apiClient.defaults.headers,
    Authorization: `Token ${token}`,
  };
  try {
    const response = await apiClient.get("/user/api/refresh-token/", {
      headers: localHeader,
    });
    dispatch(login(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const selectUserId = (state) => state.Auth.userId;
export const selectToken = (state) => state.Auth.token;
export const selectRefreshToken = (state) => state.Auth.refreshToken;
export const selectIsAuthenticated = (state) => state.Auth.isAuthenticated;

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
