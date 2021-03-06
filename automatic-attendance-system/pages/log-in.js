import Image from "next/Image";
import Head from "next/Head";
// Import React Features
import { useState, useEffect, useCallback, useRef } from "react";
import loadMachineLearningModel from "../Helper-Functions/recognition";
// Import Helper components
import Fade from "react-reveal/Fade";
import Webcam from "react-webcam";
import LoadingImage from "../SharedComponents/LoadingImage";
import WelcomePage from "../SharedComponents/WelcomePage";
import FailedAuthentication from "../SharedComponents/FailedAuthentication"
import Button from "../SharedComponents/Button";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Home({ students }) {
  const [isLoading, setLoadingState] = useState(false);
  const [userExists, setUser] = useState("");
  const [validUser, setValidUser] = useState(true);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoadingState(true);
    setTimeout(() => {
      getIdentity(imageSrc);
    }, 1000);
  }, [webcamRef]);

  const getIdentity = async (img) => {
    await loadMachineLearningModel(img, students).then((user) => {
      if (user === "unknown") {
        setValidUser(false);
      }
      setUser(user);
    });
    setLoadingState(false);
  };

  return (
    <>
      <Head>
        <script defer src="face-api.min.js"></script>
      </Head>
      <Fade top>
        <div>
          {!isLoading && userExists ? (
            <>
              {!validUser ? (
                <FailedAuthentication/>
              ) : (
                <WelcomePage name={userExists} />
              )}
            </>
          ) : (
            <>
              {isLoading && !userExists ? (
                <LoadingImage />
              ) : (
                <div className="login">
                  <div className="webcam">
                    <Webcam
                      audio={false}
                      height="100%"
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      videoConstraints={videoConstraints}
                    />
                  </div>
                  <div className="webcam_btn">
                    <Button
                      className="Button"
                      cta="cta"
                      onClick={capture}
                      text="Verify yourself"
                      href="#"
                    ></Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Fade>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/students");
  const students = await res.json();

  return {
    props: {
      students,
    },
  };
}
