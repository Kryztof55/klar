import React from "react";

const Boton = (props) => {
  const {
    typeButton,
    className,
    text,
    action,
    actionSubmit,
    children,
    disabled,
  } = props;
  return (
    <button
      type={typeButton}
      className={className}
      onClick={action}
      onSubmit={actionSubmit}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};
export default Boton;
