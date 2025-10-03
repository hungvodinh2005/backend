module.exports.search = (reqQuery) => {
  let regex = new RegExp(reqQuery.keyword, "i");

  return {
    keyword: reqQuery.keyword,
    regex: regex,
  };
};
