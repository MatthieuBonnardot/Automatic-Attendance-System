// async function recognize() {
//     console.log("entered recognize");
//     console.log(photo, canvas);
//     const labeledFaceDescriptors = await loadLabeledImages();
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
//     const detections = await faceapi
//       .detectAllFaces(photo)
//       .withFaceLandmarks()
//       .withFaceDescriptors();
//     const displaySize = { width: photo.width, height: photo.height };
//     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//     const results = resizedDetections.map((d) =>
//       faceMatcher.findBestMatch(d.descriptor)
//     );
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box;
//       document.getElementById('result').innerHTML= result.toString();
//       const drawBox = new faceapi.draw.DrawBox(box, {
//         label: result.toString(),
//       });
//       drawBox.draw(canvas);
//     });
//   }

const recognize = async (faceapi, img) => {
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  const singleResult = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (singleResult) {
    const bestMatch = await faceMatcher.findBestMatch(singleResult.descriptor);
    const result = bestMatch.toString();
    console.log(result);
    return result;
  } else {
    console.log("Not found");
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


export default recognize;
