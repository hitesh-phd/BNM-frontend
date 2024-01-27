import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

import InputField from "@/components/InputField";
import Icon from "@/components/Icon";
import RingLoader from "@/components/Loaders/RingLoader";
import AuthContainer from "@/components/Container/AuthContainer";
import { ROUTES } from "@/utils/RouterConfig";

const signInFormSchema = object().shape({
  email: string()
    .email("Email is invalid")
    .required("Email is a required field"),
  password: string()
    .required("Password is a required field")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const SignInPage = ({ onClick }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInFormSchema),
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
    navigate(ROUTES.SIGN_UP);
  };

  return (
    <AuthContainer>
      <div className="w-full mx-auto sm:max-w-xl">
        <h1 className="mb-4 text-3xl font-bold text-center text-black">
          Sign in
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Username / Email"
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
          <button
            className="w-full my-4 font-normal text-right transition-colors text-primary-1 hover:text-primary-1/90"
            type="button"
            onClick={onClick}
          >
            Forgot password?
          </button>
          <button className="w-full btn-blue btn-large" type="submit">
            {!isLoading ? (
              <>
                <Icon
                  className="transition-colors fill-n-4 group-hover:fill-n-5"
                  name="log-in"
                />
                <p>Sign in</p>
              </>
            ) : (
              <RingLoader />
            )}
          </button>
          <div className="mt-5 text-center text-black">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="font-semibold text-primary-1 hover:text-primary-1/90"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </AuthContainer>
  );
};

export default SignInPage;
