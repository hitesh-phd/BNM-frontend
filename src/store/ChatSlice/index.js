import { createSlice } from "@reduxjs/toolkit";

import { errorToast, successToast } from "@/utils/helper";
import { apiClient } from "@/utils/https";

const initialState = {
  data: null,
};

export const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    getUserChats: (state, action) => {
      const { data } = action.payload?.data || {};
      state.isLoaded = true;
    },
  },
});

export const getUserChatsAction =
  ({ data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.get(
        "/bnm/chats",
        { headers: localHeader },
        data
      );
      dispatch(getUserChats(response.data));
      onSuccess();
      successToast(response, "Logged in successfully");
    } catch (error) {
      debugger;
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const selectUserChatsData = (state) => state.Chat.data;

export const { getUserChats } = ChatSlice.actions;
export default ChatSlice.reducer;
