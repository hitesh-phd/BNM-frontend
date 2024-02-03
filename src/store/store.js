import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";

import AuthSlice from "./AuthSlice";

const reducers = combineReducers({
  Auth: AuthSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
  whitelist: ["Auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});
