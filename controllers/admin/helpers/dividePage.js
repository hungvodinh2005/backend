module.exports.dividePage = async (product, reqQuery) => {
  let objectPages = {
    currentPage: 1,
    limitElement: 4,
  };
  let totalElement;
  if (reqQuery.status) {
    totalElement = await product.countDocuments({
      status: reqQuery.status,
    });
  } else {
    totalElement = await product.countDocuments({ deleted: false });
  }
  let totalPages = Math.ceil(totalElement / objectPages.limitElement);

  if (reqQuery.page) {
    objectPages.currentPage = reqQuery.page;
  }

  let indexStartElement = (objectPages.currentPage - 1) * 4;
  return {
    limitElement: objectPages.limitElement,
    currentPage: objectPages.currentPage,
    totalPages: totalPages,
    indexStartElement: indexStartElement,
  };
};
