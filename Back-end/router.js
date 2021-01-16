const express = require("express");
const router = express.Router();

router.post("/upload", function (request, response) {
  var filesBase64 = [];
  upload(request, response, function (err) {
    if (err) {
      console.log("Error Occured");
      return;
    }
    for (var i = 0; i < request.files.length; i++) {
      filesBase64.push({
        fileName: request.files[i].originalname,
        base64: new Buffer(fs.readFileSync(request.files[i].path)).toString(
          "base64"
        ),
      });
      fs.unlink(request.files[i].path);
      console.log("File Name : " + filesBase64[i].fileName);

      console.log("Base 64 : " + filesBase64[i].base64.substring(0, 50));
    }
    response.end("Your Files Uploaded");
    console.log("Photo Uploaded");
  });
});

module.exports = router;
