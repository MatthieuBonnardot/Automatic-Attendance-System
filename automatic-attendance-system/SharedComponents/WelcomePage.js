import React from "react";
import Image from "next/Image";
import Fade from "react-reveal/Fade";
import Button from "./Button";
import WorkingManAnimation from "./WorkingManAnimation";


const WelcomePage = (props) => {
  console.log(props);
  return (
    <Fade top>
      <div className="welcome">
        <h1>
          Welcome Back <b className="emphasis3">{props.name}</b>
        </h1>
        <h2>
          Join your <b className="emphasis2">Zoom</b> call by clicking the
          button below!
        </h2>
        <Button className="Button" href="/" cta="cta" text="Join Zoom call"></Button>
        <Fade left>
          <div className="decorator1">
            {" "}
            <Image
              src="/headphone.png"
              alt="loading"
              width={150}
              height={150}
            ></Image>
          </div>
        </Fade>
        <Fade right>
          <div className="decorator2">
            <WorkingManAnimation></WorkingManAnimation>
          </div>
        </Fade>
      </div>
    </Fade>
  );
};

export default WelcomePage;
