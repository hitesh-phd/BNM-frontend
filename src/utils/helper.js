import toast from "react-hot-toast";

export const successToast = (response, message) => {
  toast.success(response?.data?.message || message);
};

export const errorToast = ({ error, message }) => {
  console.log("error", error);

  // if user's subscription has expired then redirect to subscription page
  // if (error?.response?.status === 402) {
  //   setTimeout(() => {
  //     window.location.href = "/subscription";
  //   }, 500);

  //   return;
  // }

  toast.error(
    error?.response?.data?.error ||
      error?.response?.data?.message ||
      message ||
      "Something went wrong, please try again later."
  );
};
