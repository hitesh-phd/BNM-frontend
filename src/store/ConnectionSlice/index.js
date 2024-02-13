import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  connectionList: [],
  requestList: [],
};

const ConnectionSlice = createSlice({
  name: "Connection",
  initialState,
  reducers: {
    setConnectionList: (state, action) => {
      const { connections, requests } = action.payload?.data;
      state.connectionList = connections;
      state.requestList = requests;
    },
    setRequestList: (state, action) => {
      state.requestList = action.payload;
    },
  },
});

export const fetchConnectionListAction =
  ({ username, setLoader }) =>
  async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.get(
        `/bnm/follow/list/connections/${username}`
      );
      dispatch(setConnectionList(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

export const selectConnectionList = (state) => state.Connection.connectionList;
export const selectRequestList = (state) => state.Connection.requestList;

export const { setConnectionList, setRequestList } = ConnectionSlice.actions;

export default ConnectionSlice.reducer;
