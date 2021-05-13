import React from "react";

const Input = (props) => {
  const {
    value,
    inputType,
    className,
    placeholder,
    required,
    onChange,
    id,
    max,
    maxLength,
  } = props;

  return (
    <input
      id={id}
      value={value}
      type={inputType}
      className={className}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      max={max}
      maxLength={maxLength}
    ></input>
  );
};
export default Input;
