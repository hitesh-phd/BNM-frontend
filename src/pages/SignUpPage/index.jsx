import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import InputField from "@/components/InputField";
import RingLoader from "@/components/Loaders/RingLoader";
import AuthContainer from "@/components/Container/AuthContainer";
import { ROUTES } from "@/utils/RouterConfig";
import { errorToast } from "@/utils/helper";
import { API_BASE_URL, HTTP_METHODS, API_HEADERS } from "@/utils/https";
import { registerAction } from "@/store/AuthSlice";

const passwordRegex =
  "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/";

const signUpFormSchema = object().shape({
  // gstNumber: string().required("GST Number is a required field"),
  // username: string().required("Username is a required field"),
  email: string()
    .email("Email is invalid")
    .required("Email is a required field"),
  password: string().required("Password is a required field"),
  // .test(
  //   "password",
  //   "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character and minimum 8 characters.",
  //   (value) => {
  //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
  //       value
  //     );
  //   }
  // ),
  confirmPassword: string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Required"),
});

const SignUpPage = ({ onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isUserNameVerified, setUserNameVerified] = useState(null);
  const [isGstNumberVerified, setGstNumberVerified] = useState(null);
  const [isVerifyingGstNumber, setVerifyingGstNumber] = useState(false);
  const [isVerifyingUserName, setVerifyingUserName] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm({
    // defaultValues: {
    //   gstNumber: "",
    //   username: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // },
    defaultValues: {
      gstNumber: "12345ABCD",
      username: "Sagar",
      email: "ksnayak24@gmail.com",
      password: "Test@123",
      confirmPassword: "Test@123",
    },
    resolver: yupResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const navigateToEditProfile = () => {
    navigate(ROUTES.EDIT_PROFILE, {
      state: { email: form.getValues("email"), from: ROUTES.SIGN_UP },
    });
  };

  const onSubmit = (data) => {
    // if (!isGstNumberVerified) {
    //   errorToast({ message: "GST number is not verified, please verify it" });
    //   return;
    // }
    // if (!isUserNameVerified) {
    //   errorToast({ message: "Username is not verified, please verify it" });
    //   return;
    // }
    const payload = {
      email: data.email,
      gstNumber: data.gstNumber,
      password: data.password,
      username: data.username,
      role: "USER",
    };
    dispatch(
      registerAction({
        data: payload,
        setIsLoading,
        onSuccess: navigateToEditProfile,
      })
    );
  };

  // Function for navigate to Sign Up page
  const handleSignUp = () => {
    navigate(ROUTES.SIGN_IN);
  };

  // Function for username input field change
  const handleUserNameChange = (e) => {
    const username = e.target.value.toLowerCase();
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

  const toggleShowPassword = (name) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const RenderPasswordIcon = ({ name }) =>
    showPassword[name] ? (
      <IoEyeOutline
        className="w-6 h-6 cursor-pointer fill-n-4/50"
        title="Hide password"
        onClick={() => toggleShowPassword(name)}
      />
    ) : (
      <IoEyeOffOutline
        className="w-6 h-6 cursor-pointer fill-n-4/50"
        title="Show password"
        onClick={() => toggleShowPassword(name)}
      />
    );

  return (
    <AuthContainer>
      <div className="w-full mx-auto sm:max-w-xl">
        <h1 className="mb-4 text-3xl font-bold text-center text-black">
          Sign up
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end justify-between mb-4 gap-x-4">
            <InputField
              name="gstNumber"
              label="GST Number"
              className="w-full "
              classInput={`bg-n-2 border-n-2 focus:bg-n-1 ${
                isGstNumberVerified === false && "border-red-500"
              }
              ${isGstNumberVerified === true && "border-green-500"}
              `}
              placeholder="Enter GST Number"
              type="text"
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
              name="username"
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
            name="email"
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
            name="password"
            label="Password"
            className="mb-2"
            classInput="bg-n-2 border-n-2"
            placeholder="Enter at least 8+ characters "
            autoComplete="current-password"
            type={showPassword.password ? "text" : "password"}
            rightIcon={<RenderPasswordIcon name="password" />}
            error={errors.password?.message}
            {...register("password")}
          />
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            className="mb-2"
            classInput="bg-n-2 border-n-2"
            placeholder="Enter at least 8+ characters "
            autoComplete="Confirm-password"
            type={showPassword.confirmPassword ? "text" : "password"}
            rightIcon={<RenderPasswordIcon name="confirmPassword" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button className="w-full my-5 btn-blue btn-large" type="submit">
            {!isLoading ? (
              <p>Sign up</p>
            ) : (
              <RingLoader ringClassName="border-white w-8 h-8 mx-auto" />
            )}
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
