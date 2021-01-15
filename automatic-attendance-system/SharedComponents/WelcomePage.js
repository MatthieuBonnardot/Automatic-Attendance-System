import React from "react";
import Fade from "react-reveal/Fade";

const WelcomePage = (props) => {
  console.log(props);
  return (
    <Fade top>
      <div className="welcome">
        <h1>Welcome Back <b className="emphasis3">{props.name}</b></h1>
      </div>
    </Fade>
  );
};

export default WelcomePage;
