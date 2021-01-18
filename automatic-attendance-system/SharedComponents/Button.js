import React from "react";
import Link from "next/link";

const Button = (props) => {
  return (
    <div className={props.className}>
      <Link href={props.href}>
        <button
          className={`${props.cta} btn btn-light`}
          onClick={props.onClick}
        >
          <a>
            <b className="emphasis4">{props.text}</b>
          </a>
        </button>
      </Link>
    </div>
  );
};

export default Button;
