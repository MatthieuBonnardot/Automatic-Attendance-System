import React from "react";
import Link from "next/link";

const Button = (props) => {
  return (
    <div className={props.className}>
      <button
        className={`${props.cta} btn btn-light`}
        onClick={props.onClick}
      >
        {" "}
        <Link href={props.href}>
              <a><b className="emphasis4">{props.text}</b></a>
        </Link>
      </button>
    </div>
  );
};

export default Button;
