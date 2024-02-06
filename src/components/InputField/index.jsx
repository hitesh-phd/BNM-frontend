import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../Icon";

const InputField = forwardRef((props, ref) => {
  const {
    className,
    classInput,
    label,
    textarea,
    note,
    type,
    icon,
    error = "",
    ...otherProps
  } = props;

  return (
    <div className={`${className}`}>
      <div className="">
        {label && (
          <div className="flex mb-2 font-semibold text-black base2">
            {label}
          </div>
        )}
        <div className="relative">
          {textarea ? (
            <textarea
              className={`w-full h-24 px-3.5 py-3 bg-n-2 border-2 border-n-2 rounded-xl base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-transparent resize-none dark:bg-n-6 dark:border-n-6 dark:text-n-3 dark:focus:bg-transparent ${
                icon && "pl-[3.125rem]"
              } `}
              ref={ref}
              {...otherProps}
            ></textarea>
          ) : (
            <input
              className={twMerge(
                `w-full h-13 px-3.5 bg-n-1/90 border-2 border-n-1/50 rounded-lg base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-white  ${
                  icon && "pl-[3.125rem]"
                } `,
                classInput
              )}
              ref={ref}
              type={type || "text"}
              {...otherProps}
            />
          )}
          <Icon
            className={`absolute top-3.5 left-4 fill-n-4/50 pointer-events-none transition-colors $`}
            name={icon}
          />
        </div>
        {note && <div className="mt-2 base2 text-n-4/50">{note}</div>}
        {error && <div className="mt-2 caption1 text-accent-1">{error}</div>}
      </div>
    </div>
  );
});

export default InputField;
