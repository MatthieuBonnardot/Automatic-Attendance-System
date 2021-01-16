const loadMachineLearningModel = async (img, students) => {
  console.log("hello");
  const photo = document.createElement("img");
  photo.setAttribute("src", img);
  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  ]);
  console.log("Loaded the ML models", faceapi);
  return recognize(faceapi, photo, students);
};

const recognize = async (faceapi, img, students) => {
  if (faceapi) {
    const labeledFaceDescriptors = await loadLabeledImages(students);
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

function loadLabeledImages(students) {
  console.log("Loading labels", students);
  return Promise.all(
    students.map(async (student) => {
      const descriptions = [];
      for (let i = 0; i < student.reference_images.length; i++) {
        const photo = document.createElement("img");
        photo.setAttribute("src", student.reference_images[i]);
        console.log(photo);
        const detections = await faceapi
          .detectSingleFace(photo)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(student.name, descriptions);
    })
  );
}

export default loadMachineLearningModel;
