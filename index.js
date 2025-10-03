const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
var methodOverride = require("method-override");
const routeAdmin = require("./routers/admin/index-router.js");
const route = require("./routers/clients/index.router.js");
const database = require("./config/database.js");
const systemconfig = require("./config/systems.js");
const multer = require("multer");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

require("dotenv").config();
database.database();
const port = process.env.PORT;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
routeAdmin(app);
route(app);
app.locals.prefixAdmin = systemconfig.prefixAdmin;
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
  });
}

module.exports = app;
