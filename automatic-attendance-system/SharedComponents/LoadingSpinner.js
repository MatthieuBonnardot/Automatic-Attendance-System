import React , { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

const LoadingSpinner = props => {
  
  var container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData : require('../public/Assets/facescan.json')
    });
  });

  return (
    <div id="lottie" ref={container} className="animation"></div>
  );
};

export default LoadingSpinner;
