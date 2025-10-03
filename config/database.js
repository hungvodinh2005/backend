const mongoose = require("mongoose");
module.exports.database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("sucess");
  } catch (error) {
    console.log("loi ");
  }
};
