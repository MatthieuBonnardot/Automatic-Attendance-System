// Import Next Features & Styles
import Head from "next/head";
import styles from "../styles/Home.module.css";
// Import React Features
import { useState, useEffect, useCallback, useRef } from "react";
import recognize from "../Helper-Functions/recognition";
// Import Helper components
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Home() {
  const [isLoading, setLoadingState] = useState(true);
  let MLapi;
  useEffect(() => {
    const loadMachineLearningModel = () => {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ]).then(
        console.log(
          "The Machine Learning Model has been loaded successfully",
          faceapi
        )
      );
      if (faceapi) {
        MLapi = faceapi;
        setLoadingState(false);
      }
    };

    loadMachineLearningModel();
  });

  const webcamRef = useRef(null);
  const photoRef = useRef(null);

  const capture = useCallback(async () => {
    const photo = photoRef.current;
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    photo.setAttribute("src", imageSrc);
    console.log(await recognize(MLapi, photo));
  }, [webcamRef]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <script defer src="face-api.min.js"></script>
      </Head>

      <div className={styles.container}>
        {isLoading ? (
          <div>
            <h1>Loading...</h1>
          </div>
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
            <img
              id="photo"
              ref={photoRef}
              alt="The screen capture will appear in this box."
            />
          </>
        )}
      </div>
    </>
  );
}
