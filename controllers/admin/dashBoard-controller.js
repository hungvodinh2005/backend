module.exports.dashBoard = (req, res) => {
  res.render("admin/pages/dashBoard/index.pug", {
    pageTitle: "dashBoard",
  });
};
