// Import Next Features & Styles
import Head from "next/head";
import styles from "../styles/Home.module.css";

// // Import MachineLearning Model
// import * as faceapi from "face-api.js";

// Import Helper components
import WebcamCapture from "../Components/Helper_Components/WebcamCapture";

// Import React Features
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setLoadingState] = useState(true);

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
      if (faceapi) setLoadingState(false);
    };

    loadMachineLearningModel();
  });

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
          <WebcamCapture />
        )}
      </div>
    </>
  );
}
