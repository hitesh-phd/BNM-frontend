// chatSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { errorToast, successToast } from "@/utils/helper";
import { apiClient } from "@/utils/https";

const initialState = {
  data: null,
  isLoaded: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserChats: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isLoaded = true;
    },
  },
});

export const getAllChatsAction =
  ({ setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.get("/bnm/chats", {
        headers: localHeader,
      });
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "Chats loaded successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const createOrGetOneOnOneChatAction =
  ({ receiverId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.post(
        `/bnm/chats/c/${receiverId}`,
        {},
        { headers: localHeader }
      );
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "One-on-One chat created/retrieved successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const createGroupChatAction =
  ({ data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.post("/bnm/chats/group", data, {
        headers: localHeader,
      });
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "Group chat created successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const getGroupChatDetailsAction =
  ({ chatId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.get(`/bnm/chats/group/${chatId}`, {
        headers: localHeader,
      });
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "Group chat details retrieved successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const renameGroupChatAction =
  ({ chatId, data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.patch(
        `/bnm/chats/group/${chatId}`,
        data,
        { headers: localHeader }
      );
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "Group chat name updated successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const deleteGroupChatAction =
  ({ chatId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.delete(`/bnm/chats/group/${chatId}`, {
        headers: localHeader,
      });
      dispatch(setUserChats(response.data));
      onSuccess();
      successToast(response, "Group chat deleted successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

// Add actions for other routes similarly

export const selectUserChatsData = (state) => state.chat.data;
export const selectIsLoaded = (state) => state.chat.isLoaded;

export const { setUserChats } = chatSlice.actions;

export default chatSlice.reducer;
