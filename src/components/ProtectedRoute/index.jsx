import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/utils/RouterConfig";
import Layout from "../Layout";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
