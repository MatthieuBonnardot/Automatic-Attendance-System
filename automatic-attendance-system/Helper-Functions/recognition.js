const loadMachineLearningModel = async (photo) => {
    await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ])
    console.log("Loaded the ML models", faceapi);
    return recognize(faceapi, photo);
};

const recognize = async (faceapi, img) => {
  if (faceapi) {
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const singleResult = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      // .withFaceExpressions()
      .withFaceDescriptor();

    if (singleResult) {
      const bestMatch = await faceMatcher.findBestMatch(
        singleResult.descriptor
      );
      console.log(bestMatch);
      return bestMatch._label;
    } else {
      console.log("Not found");
    }
  }
};

function loadLabeledImages() {
  const labels = ["Matthieu", "Peter", "Fra", "Alba", "Alexandra"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `https://raw.githubusercontent.com/MatthieuBonnardot/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

export default loadMachineLearningModel;
