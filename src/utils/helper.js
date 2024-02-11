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

export const formatChatTimestamp = (timestamp) => {
  const currentDate = new Date();
  const chatDate = new Date(timestamp);

  const timeDifference = currentDate - chatDate;
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes}min ago`;
  } else if (hours < 6) {
    return `${hours}hr ago`;
  } else if (hours < 24) {
    const formattedTime = chatDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Today, ${formattedTime}`;
  } else if (
    days < 365 &&
    currentDate.getFullYear() === chatDate.getFullYear()
  ) {
    const formattedDate = chatDate.toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
    return formattedDate;
  } else {
    const formattedDate = chatDate.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  }
};

export const formatPostTimestamp = (timestamp) => {
  const currentDate = new Date();
  const postDate = new Date(timestamp);

  const timeDifference = currentDate - postDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (hours < 1) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}hr`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}yr`;
  }
};
