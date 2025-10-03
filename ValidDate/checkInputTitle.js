module.exports.createPost = async (req, res, next) => {
  if (req.body.title.length < 8) {
    req.flash("error", "Please enter enough characters!");
    res.redirect(req.get("referer"));
    return;
  }
  next();
};
