import Image from "next/Image";
import Fade from "react-reveal/Fade";
import Jump from "react-reveal/Jump";

const LoadingImage = () => {
  return (
    <div className="loading">
      <Fade left>
        <Image src="/server.png" alt="loading" width={500} height={300} />
      </Fade>
      <Fade right>
        <h1>
          Currently <b className="emphasis">Verifying</b> your <b className="emphasis2">Identity</b>...
        </h1>
      </Fade>
    </div>
  );
};

export default LoadingImage;
