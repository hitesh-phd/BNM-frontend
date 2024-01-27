import Icon from "components/Icon";

const Checkbox = ({ className, label, value, onChange, reverse, subLabel }) => (
  <label
    className={`group relative flex items-start select-none cursor-pointer tap-highlight-color ${
      reverse && "flex-row-reverse"
    } ${className}`}
  >
    <input
      className="absolute top-0 left-0 invisible opacity-0"
      type="checkbox"
      value={value}
      onChange={onChange}
      checked={value}
    />
    <span
      className={`relative flex justify-center items-center shrink-0 w-6 h-6 rounded border-2 border-n-4 transition-colors group-hover:border-primary-1  ${
        value ? "bg-primary-1 border-primary-1" : "bg-transparent"
      }`}
    >
      <Icon
        className={`w-4.5 h-4.5 fill-n-1 transition-opacity ${
          value ? "opacity-100" : "opacity-0"
        }`}
        name="check"
      />
    </span>
    {label && (
      <span
        className={`base2 text-n-6  ${reverse ? "mr-auto pr-3" : "pl-3"} ${
          subLabel ? "font-semibold" : ""
        }`}
      >
        {label} {subLabel && <span className="font-normal">{subLabel}</span>}
      </span>
    )}
  </label>
);

export default Checkbox;
