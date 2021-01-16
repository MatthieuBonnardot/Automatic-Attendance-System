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
import Button from "../SharedComponents/Button";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Home ({students}) {
  const [isLoading, setLoadingState] = useState(false);
  const [userExists, setUser] = useState("");
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
            <WelcomePage name={userExists} />
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
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:2000/students')
  const students = await res.json();
  console.log(students.name);
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      students,
    },
  }
}
