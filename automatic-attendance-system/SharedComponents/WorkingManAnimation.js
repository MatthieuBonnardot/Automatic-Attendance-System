import React , { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

const WorkingManAnimation = props => {
  
  var container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'progressiveLoad',
      loop: true,
      autoplay: true,
      animationData : require('../public/Assets/workingman.json')
    });
  });

  return (
    <div id="lottie" ref={container} className="animation"></div>
  );
};

export default WorkingManAnimation;
