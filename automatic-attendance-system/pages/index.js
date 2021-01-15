// Import Next Features & Styles
import Head from "next/head";
import styles from "../styles/Home.module.css";

// Import Helper components
import WebcamCapture from "../Components/Helper_Components/WebcamCapture";

// Import React Features
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setLoadingState] = useState(false);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </Head>

      <div className={styles.container}>
        <WebcamCapture></WebcamCapture>
      </div>
    </>
  );
}
