const prefixAdmin = require("../../config/systems.js");
const product = require("../../models/product-model0");
const filterStatusvari = require("./helpers/filterStatus.js");
const searchvari = require("./helpers/search.js");
const dividePagevari = require("./helpers/dividePage.js");
module.exports.productController = async (req, res) => {
  let filterStatus = filterStatusvari.filterStatus();
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  let search = searchvari.search(req.query);
  if (search.keyword) {
    find.title = { $regex: search.regex };
  }
  //await product.updateMany({ deleted: true }, { $set: { deleted: false } });
  let dividePage = await dividePagevari.dividePage(product, req.query);
  const products = await product

    .find(find)
    .sort({ position: -1 })
    .limit(dividePage.limitElement)
    .skip(dividePage.indexStartElement);
  res.render("admin/pages/products/index", {
    pageTitle: "danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    search: search.keyword,
    totalPages: dividePage.totalPages,
    currentPage: dividePage.currentPage,
    messages: {
      success: req.flash("success"),
      error: req.flash("error"),
    },
  });
};
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  const newStatus = status == "active" ? "inactive" : "active";
  console.log(id, newStatus);
  await product.findOne({ _id: id }).updateOne({ status: newStatus });
  req.flash("success", "Change Status Success!");
  res.redirect(req.get("Referer"));
};
module.exports.changeMulti = async (req, res) => {
  const typeid = req.body;
  const status = typeid.type;
  const id = typeid.id.split(",");
  switch (status) {
    case "active":
      await product.updateMany({ _id: { $in: id } }, { status: status });
      req.flash("success", "Change Status Success!");
      break;
    case "inactive":
      await product.updateMany({ _id: { $in: id } }, { status: status });
      req.flash("success", "Change Status Success!");
      break;
    case "delete":
      await product.updateMany({ _id: { $in: id } }, { deleted: true });
      req.flash("success", "Delete Items Success!");
      break;
    case "position":
      id.forEach(async (item) => {
        const [idId, idPosition] = item.split("-");
        await product.updateOne({ _id: idId }, { position: idPosition });
      });
      req.flash("success", "Change Position Success!");
      break;
  }

  res.redirect(req.get("referer"));
};
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await product.updateOne(
    { _id: id },
    { deleted: true, deleteDate: new Date() }
  );
  req.flash("success", "Delete Items Success!");
  res.redirect(req.get("referer"));
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "create",
    messages: { success: req.flash("success"), error: req.flash("error") },
  });
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  const Product = new product(req.body);
  await Product.save();

  res.redirect("/admin/products");
};
//edit
module.exports.editItem = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const find = { _id: id };
  const [products] = await product.find(find);

  res.render("admin/pages/products/edit", {
    pageTitle: "Edit",
    products: products,
    messages: { success: req.flash("success"), error: req.flash("error") },
  });
};
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }
  try {
    await product.updateOne({ _id: id }, req.body);
    req.flash("success", "Update success!");
    res.redirect(req.get("referer"));
  } catch (error) {
    req.flash("success", "Update fail!");
    res.redirect(req.get("referer"));
  }
};
module.exports.details = async (req, res) => {
  id = req.params.id;
  const find = { _id: id, deleted: false };
  const [products] = await product.find(find);
  res.render("admin/pages/products/detail", {
    products: products,
  });
};
