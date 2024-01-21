import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/utils/RouterConfig";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
