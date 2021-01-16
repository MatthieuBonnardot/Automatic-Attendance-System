import React from "react";

const Button = (props) => {
  return (
    <div className={props.className}>
      <button
        className="cta btn btn-light"
        onClick={props.onClick}
        href={props.href}
      >
        {" "}
        <b className="emphasis4">{props.text}</b>
      </button>
    </div>
  );
};

export default Button;
