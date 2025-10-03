const express = require("express");
const route = express.Router();
const products = require("../../controllers/admin/products-controller");
const multer = require("multer");
const storage = require("../../controllers/admin/helpers/storage");
const upload = multer({ storage: storage });
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
route.post(
  "/createPost",
  upload.single("thumbnail"),
  validDate.createPost,
  products.createPost
);
module.exports = route;
