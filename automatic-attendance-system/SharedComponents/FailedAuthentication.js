import Image from "next/Image";
import Fade from "react-reveal/Fade";
import Button from "./Button";

const FailedAuthentication = (props) => {
  return (
    <Fade top>
      <div className="failure">
        <h1>
          Uh oh... <br></br> We couldn't find a match.
        </h1>
        <Button
          className="Button"
          href="/logIn"
          cta="cta"
          text="Try Again"
        ></Button>
      </div>
    </Fade>
  );
};

export default FailedAuthentication;
