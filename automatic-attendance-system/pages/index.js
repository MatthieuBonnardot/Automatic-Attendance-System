// Import Next Features & Styles
import Head from "next/head";

// Import React Features
import { useState, useEffect, useCallback, useRef } from "react";
import loadMachineLearningModel from "../Helper-Functions/recognition";
// Import Helper components
import Webcam from "react-webcam";
import LoadingImage from "../SharedComponents/LoadingImage";
import WelcomePage from "../SharedComponents/WelcomePage";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Home() {
  const [isLoading, setLoadingState] = useState(false);
  const [userExists, setUser] = useState("");
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoadingState(true);
    setTimeout(() => {getIdentity(imageSrc);}, 1000);
  }, [webcamRef]);

  const getIdentity = async (img) => {
    await loadMachineLearningModel(img).then((user) => setUser(user));
    setLoadingState(false);
  };

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <script defer src="face-api.min.js"></script>
      </Head>

      <div>
        {!isLoading && userExists ? (
          <WelcomePage name={userExists}/>
        ) : (
          <>
            {isLoading && !userExists ? (
              <LoadingImage />
            ) : (
              <>
                <Webcam
                  audio={false}
                  height={720}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={1280}
                  videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Log in</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
