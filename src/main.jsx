import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

const toastOptions = {
  duration: 3000,
  success: {
    style: {
      color: "#009150",
    },
    iconTheme: {
      primary: "#009150",
    },
  },
  error: {
    style: {
      color: "#ff0033",
    },
    iconTheme: {
      primary: "#ff0033",
    },
  },
  loading: {
    style: {
      color: "blue",
    },
    iconTheme: {
      primary: "blue",
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
    <Toaster
      containerStyle={{ bottom: 40, left: 20, right: 20 }}
      position="bottom-center"
      gutter={10}
      toastOptions={toastOptions}
    />
  </>
);
