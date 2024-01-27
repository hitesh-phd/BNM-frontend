import React from "react";
import { twMerge } from "tailwind-merge";

import Icon from "components/Icon";

const Button = ({
  title,
  loader = false,
  icon = "",
  iconClassName = "",
  className = "",
  classLabel = "",
  type = "button",
  ...otherProps
}) => {
  return (
    <button type={type} {...otherProps} className={twMerge("btn", className)}>
      {!loader ? (
        <>
          {icon && (
            <Icon
              className="transition-colors fill-n-4 group-hover:fill-n-5"
              name={icon}
            />
          )}
          {title && <p className={classLabel}>{title}</p>}
        </>
      ) : (
        <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin " />
      )}
    </button>
  );
};

export default Button;
