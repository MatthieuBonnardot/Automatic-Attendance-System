// Import Next Features & Styles
import Head from "next/head";

import Button from "../SharedComponents/Button";
import Fade from "react-reveal/Fade";

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.2/particles.min.js"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Nunito:wght@300&display=swap"
          rel="stylesheet"
        />
        <script defer src="face-api.min.js"></script>
      </Head>

      <div className="homepage">
        <Fade left>
          <h1 className="pTitle_main">
            Join your zoom session 
          </h1>
          <Button
            className="Button"
            href="/log-in"
            cta="blue"
            text="Log in"
          ></Button>
        </Fade>
      </div>
    </>
  );
}
