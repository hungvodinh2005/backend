const Product = require("../../models/product-model0");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });
  products.forEach((item) => {
    item.priceNew = ((1 - item.discountPercentage / 100) * item.price).toFixed(
      0
    );
  });
  res.render("clients/pages/products/index.pug", {
    pagetitle: "trang product",
    products: products,
  });
};
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const find = {
    slug: slug,
  };
  try {
    const [product] = await Product.find(find);
    console.log(product);
    res.render("clients/pages/products/detail.pug", {
      pageTitle: "hungdf",
      products: product,
    });
  } catch (error) {
    console.log("error");
    res.redirect(req.get("referer"));
  }
};
