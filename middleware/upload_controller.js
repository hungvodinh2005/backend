const multer = require("multer");
require("dotenv").config();
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
module.exports.uploadImage = (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    req.body.thumbnail = result.secure_url;
    next();
  }

  upload(req);
};
