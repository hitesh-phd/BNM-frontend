import React from "react";
import authPattern from "@/assets/svg/auth-pattern.svg";

const AuthContainer = ({ children }) => {
  return (
    <div className="grid items-center justify-center min-h-screen grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 grow bg-primary-1 min-h-screen-ios md:mt-0">
      <div className="flex flex-col justify-center w-full h-full p-8 bg-white md:col-span-2 lg:col-span-3 md:p-12">
        {children}
      </div>
      <div className="hidden md:col-span-2 md:flex">
        <img src={authPattern} className="w-full" alt="" />
      </div>
    </div>
  );
};

export default AuthContainer;
