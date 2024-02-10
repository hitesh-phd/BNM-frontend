import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { FaRegUser } from "react-icons/fa6";

import ProfileBGImg from "@/assets/images/profile-bg-placeholder.png";
import InputField from "@/components/InputField";
import RingLoader from "@/components/Loaders/RingLoader";
import { ROUTES } from "@/utils/RouterConfig";
import { useDispatch } from "react-redux";

const formSchema = object().shape({
  fullName: string().required("Full Name is a required field"),
  email: string()
    .email("Email is invalid")
    .required("Email is a required field"),
  mobileNumber: string().required("Mobile Number is a required field"),
  // location: string().required("Location is a required field"),
  about: string().required("About is a required field"),
});

export const EditProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, from } = state || {};

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) return;
    form.setValue("email", email);
  }, [email]);

  const isFromSignUp = from === ROUTES.SIGN_UP;

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      location: "",
      about: "",
    },
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("data", data);
  };

  // Function to handle Skip button click
  const handleSkip = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col w-full max-w-2xl p-2 mx-auto bg-white">
        <div className="relative bg-white">
          <img src={ProfileBGImg} alt="profile" className="" />
          <div className="absolute w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 rounded-full md:w-44 md:h-44 left-1/2 bg-primary-1">
            <FaRegUser className="absolute text-6xl text-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 " />
          </div>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 mt-20 space-y-4"
        >
          <InputField
            label="Full Name"
            className="mb-4"
            classInput="bg-n-2 border-n-2 focus:bg-n-1"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
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
            label="Mobile Number"
            className="mb-4"
            classInput="bg-n-2 border-n-2 focus:bg-n-1"
            placeholder="Enter mobile number"
            type="tel"
            error={errors.mobileNumber?.message}
            {...register("mobileNumber")}
          />
          <InputField
            label="Location"
            className="mb-4"
            classInput="bg-n-2 border-n-2 focus:bg-n-1"
            placeholder="Enter location"
            error={errors.location?.message}
            {...register("location")}
          />
          <InputField
            label="About"
            className="mb-4"
            classInput="bg-n-2 border-n-2 focus:bg-n-1"
            placeholder="About you"
            error={errors.about?.message}
            {...register("about")}
          />
          <div className="flex items-end justify-end w-full gap-4">
            {isFromSignUp && (
              <button
                type="submit"
                onClick={handleSkip}
                className="w-40 my-5 btn btn-large hover:bg-primary-1/90 hover:text-white"
              >
                Skip
              </button>
            )}
            <button className="w-40 my-5 btn-primary btn-large" type="submit">
              {!isLoading ? <p>Save Profile</p> : <RingLoader />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
