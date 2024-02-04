import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

import InputField from "@/components/InputField";
import RingLoader from "@/components/Loaders/RingLoader";
import AuthContainer from "@/components/Container/AuthContainer";
import { ROUTES } from "@/utils/RouterConfig";
import { errorToast } from "@/utils/helper";
import { API_BASE_URL, HTTP_METHODS, API_HEADERS } from "@/utils/https";

const signUpFormSchema = object().shape({
  gstNumber: string().required("GST Number is a required field"),
  username: string().required("Username is a required field"),
  email: string()
    .email("Email is invalid")
    .required("Email is a required field"),
  password: string()
    .required("Password is a required field")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Required"),
});

const SignUpPage = ({ onClick }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserNameVerified, setUserNameVerified] = useState(null);
  const [isGstNumberVerified, setGstNumberVerified] = useState(null);
  const [isVerifyingGstNumber, setVerifyingGstNumber] = useState(false);
  const [isVerifyingUserName, setVerifyingUserName] = useState(false);

  const form = useForm({
    defaultValues: {
      gstNumber: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    if (!isGstNumberVerified) {
      errorToast({ message: "GST Number is not verified, please verify it" });
      return;
    }
    if (!isUserNameVerified) {
      errorToast({ message: "Username is not verified, please verify it" });
      return;
    }
    const payload = {
      email: data.email,
      gstNumber: data.gstNumber,
      password: data.password,
      username: data.username,
      role: "USER",
    };
    console.log("payload", payload);
  };

  // Function for navigate to Sign Up page
  const handleSignUp = () => {
    navigate(ROUTES.SIGN_IN);
  };

  // Function for username input field change
  const handleUserNameChange = (e) => {
    const username = e.target.value;
    form.setValue("username", username);
    setUserNameVerified(null);
  };

  // Function for gstNumber input field change
  const handleGstNumberChange = (e) => {
    const gstNumber = e.target.value;
    form.setValue("gstNumber", gstNumber);
    setGstNumberVerified(null);
  };

  // Function for verify the gstNumber
  const handleVerifyGstNumber = async () => {
    const gstNumber = form.getValues("gstNumber");
    if (!gstNumber) return;
    try {
      setVerifyingGstNumber(true);
      const { data } = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/api/v1/bnm/verify-gstn/`,
        headers: API_HEADERS,
        data: { gstNumber },
      });
      setGstNumberVerified(data.success);
    } catch (error) {
      console.error("Error verifying gstNumber", error);
      setGstNumberVerified(false);
    } finally {
      setVerifyingGstNumber(false);
    }
  };

  // Function for verify the userName
  const handleVerifyUserName = async () => {
    const username = form.getValues("username");
    if (!username) return;
    try {
      setVerifyingUserName(true);
      const { data } = await axios({
        method: HTTP_METHODS.POST,
        url: `${API_BASE_URL}/api/v1/users/verify-username/`,
        headers: API_HEADERS,
        data: { username },
      });
      setUserNameVerified(data.success);
    } catch (error) {
      console.error("Error verifying username", error);
      setUserNameVerified(false);
    } finally {
      setVerifyingUserName(false);
    }
  };

  return (
    <AuthContainer>
      <div className="w-full mx-auto sm:max-w-xl">
        <h1 className="mb-4 text-3xl font-bold text-center text-black">
          Sign up
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end justify-between mb-4 gap-x-4">
            <InputField
              label="GST Number"
              className="w-full "
              classInput={`bg-n-2 border-n-2 focus:bg-n-1 ${
                isGstNumberVerified === false && "border-red-500"
              }
              ${isGstNumberVerified === true && "border-green-500"}
              `}
              placeholder="Enter GST Number"
              type="number"
              autoComplete="off"
              error={errors.gstNumber?.message}
              {...register("gstNumber", {
                onChange: handleGstNumberChange,
              })}
            />
            <button
              type="button"
              disabled={isVerifyingGstNumber || isGstNumberVerified}
              onClick={handleVerifyGstNumber}
              className={`w-4/12 btn-primary btn-large ${
                errors.gstNumber?.message && "mb-7"
              }`}
            >
              {isVerifyingGstNumber ? (
                <RingLoader ringClassName="border-white w-8 h-8 mx-auto" />
              ) : (
                <p className="text-white">
                  {isGstNumberVerified ? "Verified" : "Verify"}
                </p>
              )}
            </button>
          </div>
          <div className="flex items-end justify-between mb-4 gap-x-4">
            <InputField
              label="Username"
              className="w-full"
              classInput={`bg-n-2 border-n-2 focus:bg-n-1 ${
                isUserNameVerified === false && "border-red-500"
              }
              ${isUserNameVerified === true && "border-green-500"}
              `}
              placeholder="Enter username"
              type="text"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username", {
                onChange: handleUserNameChange,
              })}
            />
            <button
              type="button"
              disabled={isVerifyingUserName || isUserNameVerified}
              onClick={handleVerifyUserName}
              className={`w-4/12 btn-primary btn-large ${
                errors.username?.message && "mb-7"
              }`}
            >
              {isVerifyingUserName ? (
                <RingLoader ringClassName="border-white w-8 h-8 mx-auto" />
              ) : (
                <p>{isUserNameVerified ? "Verified" : "Verify"}</p>
              )}
            </button>
          </div>
          <InputField
            label="Email"
            className="mb-4"
            classInput="bg-n-2 border-n-2 focus:bg-n-1"
            placeholder="example.email@gmail.com"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <InputField
            label="Password"
            className="mb-2"
            classInput="bg-n-2 border-n-2"
            placeholder="Enter at least 8+ characters "
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <InputField
            label="Confirm Password"
            className="mb-2"
            classInput="bg-n-2 border-n-2"
            placeholder="Enter at least 8+ characters "
            type="password"
            autoComplete="Confirm-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button className="w-full my-5 btn-blue btn-large" type="submit">
            {!isLoading ? <p>Sign up</p> : <RingLoader />}
          </button>
          <div className="text-center text-black">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="font-semibold text-primary-1 hover:text-primary-1/90"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </AuthContainer>
  );
};

export default SignUpPage;
