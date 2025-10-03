const express = require("express");
const route = express.Router();
const products = require("../../controllers/admin/products-controller");
const multer = require("multer");
const uploadImg = require("../../middleware/upload_controller");
require("dotenv").config();
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const validDate = require("../../ValidDate/checkInputTitle");
route.get("/", products.productController);
route.patch("/changeStatus/:id/:status", products.changeStatus);
route.patch("/changeMulti", products.changeMulti);
route.delete("/deletes/:id", products.delete);
route.get("/create", products.create);
route.get("/edit/:id", products.editItem);
route.get("/details/:id", products.details);
route.patch(
  "/editItem/:id",
  upload.single("thumbnail"),
  validDate.createPost,
  products.edit
);
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
route.post(
  "/createPost",
  upload.single("thumbnail"),
  uploadImg.uploadImage,
  validDate.createPost,
  products.createPost
);
module.exports = route;
