import React from "react";
import "./style.scss";

const Jumbotron = (props) => {
  const { className, color, children } = props;
  return (
    <div className={className} color-theme={color}>
      <div className="container">{children}</div>
    </div>
  );
};
export default Jumbotron;
