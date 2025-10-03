const dashBoard = require("./dashBoard-router");
const pathAmin = require("../../config/systems");
const products = require("./products-router");
module.exports = (app) => {
  PATH_ADMIN = pathAmin.prefixAdmin;
  app.use(PATH_ADMIN + "/dashBoard", dashBoard);
  app.use(PATH_ADMIN + "/products", products);
};
