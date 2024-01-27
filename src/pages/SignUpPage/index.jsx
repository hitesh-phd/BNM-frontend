import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

import InputField from "@/components/InputField";
import Icon from "@/components/Icon";
import RingLoader from "@/components/Loaders/RingLoader";
import AuthContainer from "@/components/Container/AuthContainer";
import { ROUTES } from "@/utils/RouterConfig";

const signUpFormSchema = object().shape({
  gstNumber: string().required("GST Number is a required field"),
  username: string().required("Username is a required field"),
  email: string()
    .email("Email is invalid")
    .required("Email is a required field"),
  password: string()
    .required("Password is a required field")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const SignUpPage = ({ onClick }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      gstNumber: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    const payload = {
      username: data.email,
      password: data.password,
    };
  };

  // Function for navigate to Sign Up page
  const handleSignUp = () => {
    navigate(ROUTES.SIGN_IN);
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
              classInput="bg-n-2 border-n-2 focus:bg-n-1"
              placeholder="Enter GST Number"
              type="number"
              autoComplete="off"
              error={errors.gstNumber?.message}
              {...register("gstNumber")}
            />
            <button
              className={`w-4/12 btn-blue btn-large ${
                errors.gstNumber?.message && "mb-7"
              }`}
              type="button"
            >
              Verify
            </button>
          </div>
          <div className="flex items-end justify-between mb-4 gap-x-4">
            <InputField
              label="Username"
              className="w-full"
              classInput="bg-n-2 border-n-2 focus:bg-n-1"
              placeholder="example.email@gmail.com"
              type="text"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />
            <button
              type="button"
              className={`w-4/12 btn-blue btn-large ${
                errors.username?.message && "mb-7"
              }`}
            >
              Verify
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
