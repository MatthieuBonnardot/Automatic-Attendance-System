// Import Next Features & Styles
import Head from "next/head";
import styles from "../styles/Home.module.css";
// Import React Features
import { useState, useEffect, useCallback, useRef } from "react";
import loadMachineLearningModel from "../Helper-Functions/recognition";
// Import Helper components
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Home() {
  const [isLoading, setLoadingState] = useState(true);
  const [userExists, setUser] = useState("");
  const webcamRef = useRef(null);
  const webcamFrame = useRef(null);
  const photoRef = useRef(null);

  const capture = useCallback(async () => {
    const photo = photoRef.current;
    const frame = webcamFrame.current;
    frame.setAttribute("className", "hide");
    const imageSrc = webcamRef.current.getScreenshot();
    photo.setAttribute("src", imageSrc);
    const user = await loadMachineLearningModel(photo);

    console.log('user',user);
  }, [webcamRef]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <script defer src="face-api.min.js"></script>
      </Head>

      <>
        <div className="ex" ref={webcamFrame}>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Log in</button>
        </div>
        <img
          id="photo"
          ref={photoRef}
          alt="The screen capture will appear in this box."
        />
      </>
    </>
  );
}
