// messageSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { errorToast, successToast } from "@/utils/helper";
import { apiClient } from "@/utils/https";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const getAllMessagesAction =
  ({ chatId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.get(`/bnm/messages/${chatId}`, {
        headers: localHeader,
      });
      dispatch(setMessages(response.data));
      onSuccess();
      successToast(response, "Messages loaded successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const sendMessageAction =
  ({ chatId, data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.post(`/bnm/messages/${chatId}`, data, {
        headers: localHeader,
      });
      dispatch(addMessage(response.data));
      onSuccess();
      successToast(response, "Message sent successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const selectMessages = (state) => state.message.messages;

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
